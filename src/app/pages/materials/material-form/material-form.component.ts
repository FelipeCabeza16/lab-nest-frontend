// material-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialService } from '../../../services/material';
import { UnitService } from '../../../services/unit';
import { Unit } from '../../../services/unit';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './material-form.component.html',
})
export class MaterialFormComponent implements OnInit {
  materialForm: FormGroup;
  isEditMode = false;
  id?: string;
  units: Unit[] = [];
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialService,
    private unitService: UnitService
  ) {
    this.materialForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      unitId: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadUnits();

    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.id) {
      this.isEditMode = true;
      this.materialService.getOne(this.id).subscribe(material => {
        this.materialForm.patchValue(material);
      });
    }
  }

  loadUnits(): void {
    this.unitService.getAll().subscribe(units => {
      this.units = units;
    });
  }

  save(): void {
    if (this.materialForm.invalid) return;

    const save$ = this.isEditMode
      ? this.materialService.update(this.id!, this.materialForm.value)
      : this.materialService.create(this.materialForm.value);

    save$.subscribe({
      next: () => this.router.navigate(['/materials']),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err?.error?.message || 'Ocurrió un error inesperado';
      }
    });
  }
}

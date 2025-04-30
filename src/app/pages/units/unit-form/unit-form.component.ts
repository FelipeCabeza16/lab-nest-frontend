import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UnitService } from '../../../services/unit';

@Component({
  selector: 'app-unit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss']
})

export class UnitFormComponent implements OnInit {
  unitForm: FormGroup;
  isEditMode = false;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private unitService: UnitService
  ) {
    this.unitForm = this.fb.group({
      name: ['', Validators.required],
      symbol: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEditMode = true;
      this.unitService.getOne(this.id).subscribe(unit => {
        this.unitForm.patchValue(unit);
      });
    }
  }

  save() {
    if (this.unitForm.invalid) return;

    const save$ = this.isEditMode
      ? this.unitService.update(this.id!, this.unitForm.value)
      : this.unitService.create(this.unitForm.value);

    save$.subscribe(() => this.router.navigate(['/units']));
  }
}

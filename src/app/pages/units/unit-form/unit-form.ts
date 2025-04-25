import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  form: FormGroup;
  id?: number;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private unitService: UnitService
  ) {
    // ✅ Aquí ya se ha inyectado fb
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.unitService.getOne(this.id).subscribe(unit => {
        this.form.patchValue(unit);
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    const obs = this.isEdit
      ? this.unitService.update(this.id!, { name: this.form.value.name! })
      : this.unitService.create({ name: this.form.value.name! });
    obs.subscribe(() => this.router.navigate(['/units']));
  }
}

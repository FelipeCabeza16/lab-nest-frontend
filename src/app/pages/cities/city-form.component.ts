import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CityService } from '../../services/city';

@Component({
  selector: 'app-city-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})
export class CityFormComponent implements OnInit {
  cityForm: FormGroup;
  isEditMode = false;
  id?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cityService: CityService
  ) {
    this.cityForm = this.fb.group({
      name: ['', Validators.required],
      stateId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.id) {
      this.isEditMode = true;
      this.cityService.getOne(this.id).subscribe(city => {
        this.cityForm.patchValue(city);
      });
    }
  }

  save(): void {
    if (this.cityForm.invalid) return;

    const city = this.cityForm.value;

    const save$ = this.isEditMode
      ? this.cityService.update(this.id!, city)
      : this.cityService.create(city);

    save$.subscribe(() => this.router.navigate(['/cities']));
  }
}

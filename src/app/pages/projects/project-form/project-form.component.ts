import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../services/project';
import { City, CityService } from '../../../services/city';
import { MaterialService, Material } from '../../../services/material';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './project-form.component.html',
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  isEditMode = false;
  id?: string;
  cities: City[] = [];
  materials: Material[] = [];
  selectedMaterialId = '';
  materialQuantity = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private cityService: CityService,
    private materialService: MaterialService
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      cityId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadCities();
    this.loadMaterials();

    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.id) {
      this.isEditMode = true;
      this.projectService.getOne(this.id).subscribe(project => {
        this.projectForm.patchValue({
          name: project.name,
          description: project.description,
          cityId: project.city?.id
        });
      });
    }
  }

  loadCities(): void {
    this.cityService.getAll().subscribe(cities => {
      this.cities = cities;
    });
  }

  loadMaterials(): void {
    this.materialService.getAll().subscribe(materials => {
      this.materials = materials;
    });
  }

  save(): void {
    if (this.projectForm.invalid) return;

    const projectData = this.projectForm.value;

    const save$ = this.isEditMode
      ? this.projectService.update(this.id!, projectData)
      : this.projectService.create(projectData);

    save$.subscribe(project => {
      if (!this.isEditMode && this.selectedMaterialId && this.materialQuantity > 0) {
        this.projectService.addMaterialToProject(project.id, {
          materialId: this.selectedMaterialId,
          quantity: this.materialQuantity
        }).subscribe(() => this.router.navigate(['/projects']));
      } else {
        this.router.navigate(['/projects']);
      }
    });
  }
}

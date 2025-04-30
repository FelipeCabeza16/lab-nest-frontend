import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Material, MaterialService } from '../../../services/material';
import { ProjectService } from '../../../services/project';

@Component({
  selector: 'app-add-material',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent implements OnInit {
  materials: Material[] = [];
  selectedMaterialId = '';
  quantity = 0;
  projectId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.materialService.getAll().subscribe({
      next: (materials) => this.materials = materials,
      error: (error) => console.error('Error loading materials:', error)
    });
  }

  save(): void {
    if (!this.selectedMaterialId || this.quantity <= 0) return;

    this.projectService.addMaterialToProject(this.projectId, {
      materialId: this.selectedMaterialId,
      quantity: this.quantity
    }).subscribe(() => this.router.navigate(['/projects']));
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Material, MaterialService } from '../../../services/material';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {
  materials: Material[] = [];

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.materialService.getAll().subscribe(data => this.materials = data);
  }

  deleteMaterial(id: string): void {
    if (confirm('¿Está seguro de eliminar este material?')) {
      this.materialService.delete(id).subscribe(() => {
        this.materials = this.materials.filter(m => m.id !== id);
      });
    }
  }
}

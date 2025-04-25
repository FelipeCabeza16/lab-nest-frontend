import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Unit, UnitService } from '../../../services/unit';

@Component({
  selector: 'app-unit-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './unit-list.component.html',
  styleUrls: []
})

export class UnitListComponent implements OnInit {
  units: Unit[] = [];

  constructor(private unitService: UnitService) {}

  ngOnInit(): void {
    this.unitService.getAll().subscribe(data => this.units = data);
  }

  deleteUnit(id: number) {
    if (confirm('¿Eliminar unidad?')) {
      this.unitService.delete(id).subscribe(() => {
        this.units = this.units.filter(u => u.id !== id);
      });
    }
  }
}

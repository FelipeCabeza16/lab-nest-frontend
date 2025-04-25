import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Unit, UnitService } from '../../../services/unit';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-unit-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './unit-list.component.html',
  styleUrls: []
})
export class UnitListComponent implements OnInit {
  units: Unit[] = [];

  constructor(private unitService: UnitService) {}

  ngOnInit(): void {
    this.unitService.getAll().subscribe(units => this.units = units);
  }

  deleteUnit(id: number) {
    if (confirm('¿Eliminar unidad?')) {
      this.unitService.delete(id).subscribe(() => {
        this.units = this.units.filter(u => u.id !== id);
      });
    }
  }
}

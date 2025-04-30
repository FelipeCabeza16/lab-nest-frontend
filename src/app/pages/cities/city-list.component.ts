// city-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CityService, City } from '../../services/city';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  cities: City[] = [];

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.cityService.getAll().subscribe(data => this.cities = data);
  }

  deleteCity(id: string): void {
    if (confirm('¿Está seguro de eliminar esta ciudad?')) {
      this.cityService.delete(id).subscribe(() => {
        this.cities = this.cities.filter(c => c.id !== id);
      });
    }
  }
}

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UnitListComponent } from './pages/units/unit-list/unit-list.component';
import { UnitFormComponent } from './pages/units/unit-form/unit-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // ✅ Landing por defecto
  { path: 'units', component: UnitListComponent },
  { path: 'units/new', component: UnitFormComponent },
  { path: 'units/edit/:id', component: UnitFormComponent },
];

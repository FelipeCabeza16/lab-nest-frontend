import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UnitListComponent } from './pages/units/unit-list/unit-list.component';
import { UnitFormComponent } from './pages/units/unit-form/unit-form.component';
import { MaterialListComponent } from './pages/materials/material-list/material-list.component';
import { MaterialFormComponent } from './pages/materials/material-form/material-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // ✅ Landing por defecto
  { path: 'units', component: UnitListComponent },
  { path: 'units/new', component: UnitFormComponent },
  { path: 'units/edit/:id', component: UnitFormComponent },
  { path: 'materials', component: MaterialListComponent },
  { path: 'materials/new', component: MaterialFormComponent },
  { path: 'materials/edit/:id', component: MaterialFormComponent },
];

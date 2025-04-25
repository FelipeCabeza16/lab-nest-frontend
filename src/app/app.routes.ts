import { Routes } from '@angular/router';
import { UnitListComponent } from './pages/units/unit-list/unit-list.component';
import { UnitFormComponent } from './pages/units/unit-form/unit-form.component';

export const routes: Routes = [
  { path: 'units', component: UnitListComponent },
  { path: 'units/new', component: UnitFormComponent },
  { path: 'units/edit/:id', component: UnitFormComponent },
];

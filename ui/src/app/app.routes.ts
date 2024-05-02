import { Routes } from '@angular/router';
import path from 'node:path';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { PatientsComponent } from './components/patients/patients.component';


export const routes: Routes = [
{path:"",component:DashboardComponent},
{path:'appointments',component:AppointmentsComponent},
{path:'patients',component:PatientsComponent}
];

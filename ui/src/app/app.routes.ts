import { Routes } from '@angular/router';
import path from 'node:path';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { PatientComponent } from './components/patients/patient/patient.component';


export const routes: Routes = [
{path:"",component:DashboardComponent},
{path:'appointments',component:AppointmentsComponent},
{path:'patients',component:PatientComponent}
];

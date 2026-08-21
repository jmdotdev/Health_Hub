import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'patients', loadComponent: () => import('./components/patients/patients.component').then(m => m.PatientsComponent) },
  {
    path: 'patients/register',
    loadComponent: () => import('./components/patients/patient-register/patient-register.component').then(m => m.PatientRegisterComponent),
  },
  { path: 'patients/:id', loadComponent: () => import('./components/patients/patient/patient.component').then(m => m.PatientComponent) },
  { path: 'appointments', loadComponent: () => import('./components/appointments/appointments.component').then(m => m.AppointmentsComponent) },
  { path: 'queue', loadComponent: () => import('./components/queue/queue.component').then(m => m.QueueComponent) },
  { path: 'queue/walk-in', loadComponent: () => import('./components/queue/add-walkin/add-walkin.component').then(m => m.AddWalkinComponent) },
  { path: 'consultation', loadComponent: () => import('./components/consultation/consultation.component').then(m => m.ConsultationComponent) },
  { path: 'billing', loadComponent: () => import('./components/billing/billing.component').then(m => m.BillingComponent) },
  { path: 'prescriptions', loadComponent: () => import('./components/prescriptions/prescriptions.component').then(m => m.PrescriptionsComponent) },
  { path: 'records', loadComponent: () => import('./components/records/records.component').then(m => m.RecordsComponent) },
  { path: 'reports', loadComponent: () => import('./components/reports/reports.component').then(m => m.ReportsComponent) },
  { path: 'staff', loadComponent: () => import('./components/staff/staff.component').then(m => m.StaffComponent) },
  { path: 'inventory', loadComponent: () => import('./components/inventory/inventory.component').then(m => m.InventoryComponent) },
  { path: 'settings', loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent) },
];

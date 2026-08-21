import { Component, signal } from '@angular/core';
import { FormFieldComponent, FIELD_CONTROL_CLASS } from '@/shared/ui/form-field/form-field.component';

const NAV_ITEMS = [
  'Clinic information',
  'Departments',
  'Services & pricing',
  'Appointments',
  'Billing',
  'Payment methods',
  'Staff & permissions',
  'Notifications',
  'Security',
  'Audit log',
];

const AUDIT_LOG = [
  { time: '19 Aug 09:41', text: 'Sarah Mumbi recorded payment on INV-2051' },
  { time: '19 Aug 09:34', text: 'Dr. Kamau opened record PT-10482' },
  { time: '19 Aug 08:12', text: 'Admin changed permissions for Nurse Wambui' },
];

@Component({
  selector: 'app-settings',
  imports: [FormFieldComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  protected readonly fieldClass = FIELD_CONTROL_CLASS;
  protected readonly navItems = NAV_ITEMS;
  protected readonly auditLog = AUDIT_LOG;
  protected readonly activeNav = signal(NAV_ITEMS[0]);
}

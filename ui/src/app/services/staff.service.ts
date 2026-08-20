import { Injectable, signal } from '@angular/core';
import type { StatusTone } from '@/shared/ui/status-badge/status-badge.component';

export type DutyStatus = 'On duty' | 'Break' | 'Off duty';

export const DUTY_STATUS_TONE: Record<DutyStatus, StatusTone> = {
  'On duty': 'success',
  Break: 'warning',
  'Off duty': 'neutral',
};

export interface StaffRow {
  name: string;
  role: string;
  dept: string;
  contact: string;
  status: DutyStatus;
  active: string;
  initials: string;
}

const RAW: [string, string, string, string, DutyStatus, string][] = [
  ['Dr. Peter Kamau', 'Doctor', 'General outpatient', 'p.kamau@riverside.co.ke', 'On duty', 'In consultation'],
  ['Dr. Alice Otieno', 'Doctor', 'Internal medicine', 'a.otieno@riverside.co.ke', 'On duty', '4 min ago'],
  ['Dr. Susan Njoroge', 'Doctor', 'Paediatrics', 's.njoroge@riverside.co.ke', 'On duty', '2 min ago'],
  ['Esther Wambui', 'Nurse', 'Triage', 'e.wambui@riverside.co.ke', 'On duty', '1 min ago'],
  ['Sarah Mumbi', 'Receptionist', 'Front desk', 's.mumbi@riverside.co.ke', 'On duty', 'Now'],
  ['Kevin Ochieng', 'Pharmacist', 'Pharmacy', 'k.ochieng@riverside.co.ke', 'Break', '22 min ago'],
  ['Grace Muthoni', 'Administrator', 'Management', 'g.muthoni@riverside.co.ke', 'Off duty', 'Yesterday 17:40'],
];

const SEED: StaffRow[] = RAW.map(([name, role, dept, contact, status, active]) => ({
  name,
  role,
  dept,
  contact,
  status,
  active,
  initials: name
    .replace('Dr. ', '')
    .split(' ')
    .map(w => w[0])
    .join(''),
}));

@Injectable({ providedIn: 'root' })
export class StaffService {
  private readonly rows = signal<StaffRow[]>(SEED);
  readonly list = this.rows.asReadonly();
  readonly onDutyCount = () => this.rows().filter(r => r.status === 'On duty').length;
}

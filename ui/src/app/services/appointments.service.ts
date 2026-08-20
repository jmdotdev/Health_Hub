import { Injectable, signal } from '@angular/core';
import type { StatusTone } from '@/shared/ui/status-badge/status-badge.component';

export type AppointmentStatusCode = 'conf' | 'busy' | 'done' | 'miss' | 'wait';

export const APPOINTMENT_STATUS: Record<AppointmentStatusCode, { label: string; tone: StatusTone }> = {
  conf: { label: 'Confirmed', tone: 'info' },
  busy: { label: 'In consultation', tone: 'primary' },
  done: { label: 'Completed', tone: 'success' },
  miss: { label: 'No-show', tone: 'danger' },
  wait: { label: 'Waiting', tone: 'warning' },
};

export interface AppointmentRow {
  time: string;
  patient: string;
  doctor: string;
  type: string;
  status: AppointmentStatusCode;
  note: string;
  primaryAction: string;
}

export interface DaySlotEntry {
  patient: string;
  type: string;
  status: AppointmentStatusCode;
}

export interface DaySlot {
  time: string;
  columns: (DaySlotEntry | null)[];
}

export const CLINIC_DOCTORS = [
  { name: 'Dr. Kamau', specialty: 'General' },
  { name: 'Dr. Otieno', specialty: 'Internal med' },
  { name: 'Dr. Njoroge', specialty: 'Paediatrics' },
];

const SEED_ROWS: AppointmentRow[] = [
  { time: '09:00', patient: 'Jane Njeri', doctor: 'Dr. Kamau', type: 'Follow-up', status: 'busy', note: 'Diabetes education handout', primaryAction: 'Open' },
  { time: '09:20', patient: 'Mary Wanjiku', doctor: 'Dr. Kamau', type: 'Diabetes review', status: 'wait', note: 'Bring fasting glucose log', primaryAction: 'Start' },
  { time: '09:40', patient: 'James Kariuki', doctor: 'Dr. Otieno', type: 'Hypertension', status: 'conf', note: '—', primaryAction: 'Check in' },
  { time: '10:00', patient: 'Grace Achieng', doctor: 'Dr. Njoroge', type: 'Paediatric', status: 'done', note: 'Mother present', primaryAction: 'Summary' },
  { time: '10:20', patient: 'Peter Mwangi', doctor: 'Dr. Otieno', type: 'Consultation', status: 'miss', note: 'Called twice, no answer', primaryAction: 'Rebook' },
  { time: '10:40', patient: 'Alice Wairimu', doctor: 'Dr. Kamau', type: 'Results review', status: 'conf', note: 'Lab results pending', primaryAction: 'Confirm' },
];

const SEED_SLOTS: DaySlot[] = [
  { time: '08:40', columns: [{ patient: 'Peter Kirui', type: 'Follow-up', status: 'done' }, null, { patient: 'Grace Achieng', type: 'Paediatric', status: 'done' }] },
  { time: '09:00', columns: [{ patient: 'Jane Njeri', type: 'Follow-up', status: 'busy' }, { patient: 'Samuel Ndungu', type: 'Refill', status: 'done' }, null] },
  { time: '09:20', columns: [{ patient: 'Mary Wanjiku', type: 'Diabetes review', status: 'conf' }, null, { patient: 'Aisha Hassan', type: 'Antenatal', status: 'busy' }] },
  { time: '09:40', columns: [null, { patient: 'James Kariuki', type: 'Hypertension', status: 'conf' }, null] },
  { time: '10:00', columns: [{ patient: 'Faith Cherono', type: 'New patient', status: 'conf' }, null, { patient: 'Kevin Muli', type: 'Immunisation', status: 'conf' }] },
  { time: '10:20', columns: [null, { patient: 'Peter Mwangi', type: 'Consultation', status: 'miss' }, null] },
  { time: '10:40', columns: [{ patient: 'Alice Wairimu', type: 'Results review', status: 'conf' }, { patient: 'Joseph Odhiambo', type: 'Follow-up', status: 'conf' }, null] },
  { time: '11:00', columns: [null, null, { patient: 'Tabitha Nduta', type: 'Paediatric', status: 'conf' }] },
];

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  private readonly rows = signal<AppointmentRow[]>(SEED_ROWS);
  private readonly slots = signal<DaySlot[]>(SEED_SLOTS);

  readonly list = this.rows.asReadonly();
  readonly day = this.slots.asReadonly();
  readonly doctors = CLINIC_DOCTORS;
}

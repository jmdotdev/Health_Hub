import { Injectable, signal } from '@angular/core';
import type { StatusTone } from '@/shared/ui/status-badge/status-badge.component';

export type RxStatus = 'Dispensed' | 'Awaiting pharmacy' | 'Out of stock';

export const RX_STATUS_TONE: Record<RxStatus, StatusTone> = {
  Dispensed: 'success',
  'Awaiting pharmacy': 'warning',
  'Out of stock': 'danger',
};

export interface PrescriptionRow {
  time: string;
  patient: string;
  drug: string;
  detail: string;
  prescriber: string;
  status: RxStatus;
}

const SEED: PrescriptionRow[] = [
  { time: '09:41', patient: 'Mary Wanjiku', drug: 'Metformin', detail: '500 mg · twice daily · oral · 90 days', prescriber: 'Dr. Kamau', status: 'Dispensed' },
  { time: '09:28', patient: 'Aisha Hassan', drug: 'Folic acid', detail: '5 mg · once daily · oral · 30 days', prescriber: 'Dr. Njoroge', status: 'Awaiting pharmacy' },
  { time: '09:06', patient: 'Grace Achieng', drug: 'Paracetamol syrup', detail: '250 mg/5 ml · 3 times daily · 5 days', prescriber: 'Dr. Njoroge', status: 'Dispensed' },
  { time: '08:52', patient: 'Samuel Ndungu', drug: 'Amlodipine', detail: '5 mg · once daily · oral · 30 days', prescriber: 'Dr. Otieno', status: 'Awaiting pharmacy' },
  { time: '08:40', patient: 'Peter Kirui', drug: 'Amoxicillin', detail: '500 mg · 3 times daily · 7 days', prescriber: 'Dr. Kamau', status: 'Dispensed' },
  { time: '08:18', patient: 'Joseph Odhiambo', drug: 'Salbutamol inhaler', detail: '100 mcg · as needed · inhaled', prescriber: 'Dr. Otieno', status: 'Out of stock' },
];

@Injectable({ providedIn: 'root' })
export class PrescriptionsService {
  private readonly rows = signal<PrescriptionRow[]>(SEED);
  readonly list = this.rows.asReadonly();
}

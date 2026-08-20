import { Injectable, signal } from '@angular/core';
import type { StatusTone } from '@/shared/ui/status-badge/status-badge.component';

export interface ClinicNotification {
  tone: StatusTone;
  title: string;
  body: string;
  time: string;
}

const SEED: ClinicNotification[] = [
  { tone: 'danger', title: 'Brian Otieno has waited 42 minutes', body: 'Triage queue · above the 30 minute target', time: '2m' },
  { tone: 'primary', title: 'Lab result ready — Mary Wanjiku', body: 'HbA1c, ordered by Dr. Kamau', time: '18m' },
  { tone: 'warning', title: 'Amoxicillin 500mg below reorder level', body: '40 capsules left · reorder at 100', time: '1h' },
  { tone: 'warning', title: 'Invoice INV-2038 overdue', body: 'Peter Mwangi · KSh 4,200 · 12 days', time: '3h' },
];

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private readonly items = signal<ClinicNotification[]>(SEED);
  readonly list = this.items.asReadonly();
}

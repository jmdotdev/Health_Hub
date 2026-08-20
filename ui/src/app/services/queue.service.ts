import { computed, Injectable, signal } from '@angular/core';
import type { StatusTone } from '@/shared/ui/status-badge/status-badge.component';

export type QueuePriority = 'Urgent' | 'Normal' | 'Child' | 'Low';

export interface WaitingPatient {
  name: string;
  reason: string;
  arrived: string;
  waitMinutes: number;
  doctor: string;
  priority: QueuePriority;
}

export interface CalledPatient {
  name: string;
  reason: string;
  room: string;
  doctor: string;
  waitMinutes: number;
}

export interface InConsultationPatient {
  name: string;
  reason: string;
  location: string;
  by: string;
  minutes: number;
}

export interface CompletedPatient {
  name: string;
  paymentLabel: string;
  paymentTone: StatusTone;
  seenAt: string;
  waitedMinutes: number;
}

const PRIORITY_TONE: Record<QueuePriority, StatusTone> = {
  Urgent: 'danger',
  Normal: 'neutral',
  Child: 'primary',
  Low: 'neutral',
};

const PRIORITY_ACCENT: Record<QueuePriority, string> = {
  Urgent: 'border-l-danger',
  Normal: 'border-l-border',
  Child: 'border-l-primary',
  Low: 'border-l-border',
};

/** Wait-time text turns amber past 10 minutes and red past 30 — matches the artifact's per-row hex values. */
export function waitTextClass(minutes: number): string {
  if (minutes >= 30) return 'text-danger';
  if (minutes >= 10) return 'text-warning';
  return 'text-muted-foreground';
}

export function priorityTone(priority: QueuePriority): StatusTone {
  return PRIORITY_TONE[priority];
}

export function priorityAccentClass(priority: QueuePriority): string {
  return PRIORITY_ACCENT[priority];
}

const SEED_WAITING: WaitingPatient[] = [
  { name: 'Brian Otieno', reason: 'Chest pain, shortness of breath', arrived: '08:41', waitMinutes: 42, doctor: 'Any available', priority: 'Urgent' },
  { name: 'James Kariuki', reason: 'Blood pressure check', arrived: '08:57', waitMinutes: 26, doctor: 'Dr. Otieno', priority: 'Normal' },
  { name: 'Mary Wanjiku', reason: 'Diabetes review (appointment 09:20)', arrived: '09:09', waitMinutes: 14, doctor: 'Dr. Kamau', priority: 'Normal' },
  { name: 'Grace Achieng', reason: 'Fever, 3 days', arrived: '09:14', waitMinutes: 9, doctor: 'Dr. Njoroge', priority: 'Child' },
  { name: 'Samuel Ndungu', reason: 'Prescription refill', arrived: '09:18', waitMinutes: 5, doctor: 'Any available', priority: 'Low' },
];

const SEED_CALLED: CalledPatient[] = [
  { name: 'Aisha Hassan', reason: 'Antenatal check', room: 'Room 3', doctor: 'Dr. Njoroge', waitMinutes: 2 },
];

const SEED_IN_CONSULTATION: InConsultationPatient[] = [
  { name: 'Jane Njeri', reason: 'Follow-up', location: 'Room 1', by: 'Dr. Kamau', minutes: 8 },
  { name: 'Daniel Kimani', reason: 'Wound dressing', location: 'Treatment room', by: 'Nurse Wambui', minutes: 17 },
];

const SEED_COMPLETED: CompletedPatient[] = [
  { name: 'Grace Achieng', paymentLabel: 'Paid', paymentTone: 'success', seenAt: '08:58', waitedMinutes: 12 },
  { name: 'Samuel Ndungu', paymentLabel: 'Payment due', paymentTone: 'warning', seenAt: '08:34', waitedMinutes: 6 },
];

@Injectable({ providedIn: 'root' })
export class QueueService {
  private readonly waitingList = signal<WaitingPatient[]>(SEED_WAITING);
  private readonly calledList = signal<CalledPatient[]>(SEED_CALLED);
  private readonly inConsultationList = signal<InConsultationPatient[]>(SEED_IN_CONSULTATION);
  private readonly completedList = signal<CompletedPatient[]>(SEED_COMPLETED);
  readonly completedTotal = signal(11);

  readonly waiting = this.waitingList.asReadonly();
  readonly called = this.calledList.asReadonly();
  readonly inConsultation = this.inConsultationList.asReadonly();
  readonly completed = this.completedList.asReadonly();
  readonly waitingCount = computed(() => this.waitingList().length);

  addWalkin(entry: { name: string; reason: string; doctor: string; priority: QueuePriority }): void {
    this.waitingList.update(list => [...list, { ...entry, arrived: 'just now', waitMinutes: 0 }]);
  }

  callPatient(name: string): void {
    this.waitingList.update(list => list.filter(p => p.name !== name));
  }
}

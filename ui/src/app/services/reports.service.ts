import { Injectable, signal } from '@angular/core';

export interface VisitBar {
  day: number;
  heightPct: number;
  peak: boolean;
}

export interface RevenueRow {
  label: string;
  amount: string;
  pct: string;
}

export interface DoctorActivityRow {
  name: string;
  consultations: string;
  avgDuration: string;
  noShows: string;
  avgWait: string;
  waitFlagged?: boolean;
  revenue: string;
}

const RAW_VISITS = [34, 41, 38, 29, 12, 44, 39, 47, 51, 36, 18, 42, 58, 46, 33, 15, 49, 44, 41];
const PEAK = 58;

const SEED_BARS: VisitBar[] = RAW_VISITS.map((v, i) => ({
  day: i + 1,
  heightPct: Math.round((v / PEAK) * 100),
  peak: v > 48,
}));

const SEED_REVENUE: RevenueRow[] = [
  { label: 'Consultations', amount: 'KSh 341,000', pct: '100%' },
  { label: 'Pharmacy', amount: 'KSh 224,600', pct: '66%' },
  { label: 'Laboratory', amount: 'KSh 158,900', pct: '47%' },
  { label: 'Procedures', amount: 'KSh 62,400', pct: '18%' },
  { label: 'Other services', amount: 'KSh 25,500', pct: '7%' },
];

const SEED_DOCTORS: DoctorActivityRow[] = [
  { name: 'Dr. Kamau', consultations: '186', avgDuration: '17 min', noShows: '9', avgWait: '24 min', waitFlagged: true, revenue: 'KSh 302,000' },
  { name: 'Dr. Otieno', consultations: '154', avgDuration: '21 min', noShows: '6', avgWait: '18 min', revenue: 'KSh 268,400' },
  { name: 'Dr. Njoroge', consultations: '141', avgDuration: '19 min', noShows: '4', avgWait: '14 min', revenue: 'KSh 197,600' },
  { name: 'Nurse Wambui', consultations: '88', avgDuration: '9 min', noShows: '—', avgWait: '7 min', revenue: 'KSh 44,400' },
];

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private readonly barsSignal = signal<VisitBar[]>(SEED_BARS);
  private readonly revenueSignal = signal<RevenueRow[]>(SEED_REVENUE);
  private readonly doctorsSignal = signal<DoctorActivityRow[]>(SEED_DOCTORS);

  readonly visitBars = this.barsSignal.asReadonly();
  readonly revenue = this.revenueSignal.asReadonly();
  readonly doctorActivity = this.doctorsSignal.asReadonly();
  readonly totalCollected = 'KSh 812,400';
}

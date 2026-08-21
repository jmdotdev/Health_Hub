import { Injectable, computed, signal } from '@angular/core';

export type PatientStatus = 'active' | 'review' | 'inactive';

export interface Patient {
  id: string;
  name: string;
  sex: 'Male' | 'Female';
  age: number;
  phone: string;
  dob: string;
  last: string;
  doctor: string;
  status: PatientStatus;
}

export interface PatientVital {
  label: string;
  value: string;
  prev: string;
  flagged?: boolean;
}

export interface TimelineEvent {
  date: string;
  dot: 'primary' | 'success' | 'neutral';
  title: string;
  body: string;
}

export interface LabResult {
  test: string;
  date: string;
  value: string;
  range: string;
  status: 'High' | 'Normal' | 'Low';
  by: string;
}

export interface Prescription {
  drug: string;
  detail: string;
  status: 'Ongoing' | 'Completed';
  note: string;
}

/** One fully-detailed demo record (Mary Wanjiku, PT-10482) backing the patient-detail screen. */
export interface PatientDetail {
  dob: string;
  nationalId: string;
  address: string;
  email: string;
  emergency: string;
  insurance: string;
  conditions: string;
  medications: string;
  allergy?: string;
  vitals: PatientVital[];
  vitalsDate: string;
  lastVisit: { date: string; doctor: string; reason: string; diagnosis: string; treatment: string; followUp: string };
  timeline: TimelineEvent[];
  labs: LabResult[];
  activePrescriptions: Prescription[];
  pastPrescriptions: Prescription[];
  diagnoses: { title: string; meta: string }[];
  familySocial: { family: string; smoking: string; alcohol: string; occupation: string; updated: string };
}

const SEED_PATIENTS: Patient[] = [
  { id: 'PT-10482', name: 'Mary Wanjiku', sex: 'Female', age: 34, phone: '+254 712 445 908', dob: '14 Mar 1992', last: '12 Aug 2026', doctor: 'Dr. Kamau', status: 'active' },
  { id: 'PT-10477', name: 'James Kariuki', sex: 'Male', age: 51, phone: '+254 733 209 114', dob: '02 Jan 1975', last: '19 Aug 2026', doctor: 'Dr. Otieno', status: 'active' },
  { id: 'PT-10465', name: 'Brian Otieno', sex: 'Male', age: 27, phone: '+254 720 887 341', dob: '30 Sep 1998', last: '19 Aug 2026', doctor: 'Dr. Kamau', status: 'active' },
  { id: 'PT-10450', name: 'Jane Njeri', sex: 'Female', age: 41, phone: '+254 701 553 620', dob: '11 Jun 1985', last: '19 Aug 2026', doctor: 'Dr. Kamau', status: 'active' },
  { id: 'PT-10431', name: 'Grace Achieng', sex: 'Female', age: 8, phone: '+254 728 331 907', dob: '05 Feb 2018', last: '02 Aug 2026', doctor: 'Dr. Njoroge', status: 'active' },
  { id: 'PT-10402', name: 'Peter Mwangi', sex: 'Male', age: 63, phone: '+254 711 040 288', dob: '19 Nov 1962', last: '28 Jul 2026', doctor: 'Dr. Otieno', status: 'review' },
  { id: 'PT-10388', name: 'Aisha Hassan', sex: 'Female', age: 29, phone: '+254 799 612 405', dob: '23 Apr 1997', last: '14 Jul 2026', doctor: 'Dr. Njoroge', status: 'active' },
  { id: 'PT-10360', name: 'Daniel Kimani', sex: 'Male', age: 45, phone: '+254 726 118 733', dob: '08 Aug 1981', last: '21 May 2026', doctor: 'Dr. Kamau', status: 'inactive' },
];

const DEMO_DETAIL: PatientDetail = {
  dob: '14 Mar 1992 (34)',
  nationalId: '29184756',
  address: 'Apt 4B, Kileleshwa, Nairobi',
  email: 'm.wanjiku@example.co.ke',
  emergency: 'Paul Wanjiku (husband) · +254 720 118 004',
  insurance: 'NHIF · Member 8841-2290',
  conditions: 'Type 2 diabetes (2021) · Mild asthma (2015)',
  medications: 'Metformin 500 mg · twice daily\nSalbutamol inhaler · as needed',
  allergy: 'Penicillin (anaphylaxis, 2019)',
  vitalsDate: '12 Aug 2026',
  vitals: [
    { label: 'BP', value: '138/88', prev: 'was 132/84', flagged: true },
    { label: 'Pulse', value: '78', prev: 'bpm' },
    { label: 'Temp', value: '36.8', prev: '°C' },
    { label: 'SpO2', value: '98', prev: '%' },
    { label: 'Weight', value: '72.4', prev: 'kg · +1.2' },
    { label: 'BMI', value: '26.1', prev: 'overweight', flagged: true },
  ],
  lastVisit: {
    date: '12 Aug 2026',
    doctor: 'Dr. Kamau',
    reason: 'Routine diabetes review, occasional dizziness',
    diagnosis: 'Type 2 diabetes — suboptimal control. Elevated BP.',
    treatment: 'Continue Metformin. Reduce salt intake. Home BP log.',
    followUp: 'Review in 6 weeks with fasting glucose',
  },
  timeline: [
    { date: '19 Aug 2026', dot: 'primary', title: 'Lab results uploaded', body: 'HbA1c 8.4% — above target. Flagged for review.' },
    { date: '12 Aug 2026', dot: 'primary', title: 'Consultation with Dr. Kamau', body: 'Diabetes review · BP 138/88 · Metformin continued' },
    { date: '12 Aug 2026', dot: 'success', title: 'Prescription issued', body: 'Metformin 500 mg · twice daily · 90 days' },
    { date: '04 Jul 2026', dot: 'primary', title: 'Lab results uploaded', body: 'Full blood count — within normal limits' },
    { date: '18 Mar 2026', dot: 'success', title: 'Payment received', body: 'Invoice INV-1904 · KSh 2,600 · M-Pesa' },
    { date: '18 Jun 2024', dot: 'neutral', title: 'Patient registered', body: 'Registered at front desk by Sarah Mumbi' },
  ],
  labs: [
    { test: 'HbA1c', date: '19 Aug 2026', value: '8.4 %', range: '4.0 – 5.6', status: 'High', by: 'Dr. Kamau' },
    { test: 'Fasting glucose', date: '19 Aug 2026', value: '9.1 mmol/L', range: '3.9 – 5.5', status: 'High', by: 'Dr. Kamau' },
    { test: 'Creatinine', date: '19 Aug 2026', value: '74 µmol/L', range: '45 – 90', status: 'Normal', by: 'Dr. Kamau' },
    { test: 'Full blood count', date: '04 Jul 2026', value: 'See report', range: '—', status: 'Normal', by: 'Dr. Otieno' },
  ],
  activePrescriptions: [
    { drug: 'Metformin', detail: '500 mg · twice daily · oral · long-term', status: 'Ongoing', note: 'Take with food. Dr. Kamau · 12 Aug 2026' },
    { drug: 'Salbutamol inhaler', detail: '100 mcg · 2 puffs as needed · inhaled', status: 'Ongoing', note: 'For breathlessness. Dr. Kamau · 04 Feb 2026' },
  ],
  pastPrescriptions: [
    { drug: 'Amoxicillin', detail: '500 mg · 3 times daily · 7 days · completed 18 Mar 2026', status: 'Completed', note: '' },
    { drug: 'Paracetamol', detail: '1 g · as needed · 5 days · completed 18 Mar 2026', status: 'Completed', note: '' },
  ],
  diagnoses: [
    { title: 'Type 2 diabetes mellitus', meta: 'Diagnosed Mar 2021 · active · Dr. Kamau' },
    { title: 'Mild persistent asthma', meta: 'Diagnosed Aug 2015 · active' },
    { title: 'Appendectomy', meta: 'Surgery, Nairobi West Hospital · Nov 2013 · resolved' },
  ],
  familySocial: {
    family: 'Mother — type 2 diabetes. Father — hypertension.',
    smoking: 'Never',
    alcohol: 'Occasional',
    occupation: 'Teacher',
    updated: '12 Aug 2026 by Dr. Kamau',
  },
};

@Injectable({ providedIn: 'root' })
export class PatientsService {
  private readonly patients = signal<Patient[]>(SEED_PATIENTS);
  private nextSeq = 10496;

  readonly all = this.patients.asReadonly();
  readonly count = computed(() => this.patients().length);

  byId(id: string): Patient | undefined {
    return this.patients().find(p => p.id === id);
  }

  /** Only the first seeded record has a full demo chart — every other row falls back to this shape. */
  detailFor(id: string): PatientDetail {
    return DEMO_DETAIL;
  }

  search(term: string): Patient[] {
    const q = term.trim().toLowerCase();
    if (!q) return this.patients().slice(0, 4);
    return this.patients().filter(p => (p.name + p.id + p.phone).toLowerCase().includes(q));
  }

  register(data: { firstName: string; lastName: string }): Patient {
    const id = `PT-${this.nextSeq++}`;
    const patient: Patient = {
      id,
      name: `${data.firstName} ${data.lastName}`.trim(),
      sex: 'Female',
      age: 0,
      phone: '',
      dob: '',
      last: '—',
      doctor: '—',
      status: 'active',
    };
    this.patients.update(list => [patient, ...list]);
    return patient;
  }
}

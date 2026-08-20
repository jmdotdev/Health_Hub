import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PatientsService } from '@/services/patients.service';
import { ToastService } from '@/shared/services/toast.service';
import { FormFieldComponent, FIELD_CONTROL_CLASS } from '@/shared/ui/form-field/form-field.component';

interface VitalRow {
  label: string;
  value: string;
  prev: string;
  flagged?: boolean;
}

const VITALS: VitalRow[] = [
  { label: 'Blood pressure', value: '142/90', prev: '138/88', flagged: true },
  { label: 'Temperature', value: '36.7 °C', prev: '36.8 °C' },
  { label: 'Pulse', value: '82 bpm', prev: '78 bpm' },
  { label: 'Respiratory rate', value: '16 /min', prev: '16 /min' },
  { label: 'Oxygen saturation', value: '98 %', prev: '98 %' },
  { label: 'Weight', value: '72.9 kg', prev: '72.4 kg' },
  { label: 'Height', value: '166 cm', prev: '166 cm' },
  { label: 'BMI', value: '26.5', prev: '26.1', flagged: true },
];

const SYMPTOMS = ['Dizziness', 'Fatigue', 'Headache', 'Nausea', 'Blurred vision'];

@Component({
  selector: 'app-consultation',
  imports: [RouterLink, FormFieldComponent],
  templateUrl: './consultation.component.html',
})
export class ConsultationComponent {
  private readonly patients = inject(PatientsService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly fieldClass = FIELD_CONTROL_CLASS;
  protected readonly patient = this.patients.byId('PT-10482')!;
  protected readonly vitals = VITALS;
  protected readonly symptoms = SYMPTOMS;
  protected readonly selectedSymptoms = signal(new Set(['Dizziness', 'Fatigue']));

  protected toggleSymptom(symptom: string): void {
    this.selectedSymptoms.update(set => {
      const next = new Set(set);
      next.has(symptom) ? next.delete(symptom) : next.add(symptom);
      return next;
    });
  }

  protected saveDraft(): void {
    this.toast.notify('Draft saved · 09:34');
  }

  protected completeVisit(): void {
    this.toast.success('Visit completed · invoice INV-2051 created');
    this.router.navigate(['/billing']);
  }
}

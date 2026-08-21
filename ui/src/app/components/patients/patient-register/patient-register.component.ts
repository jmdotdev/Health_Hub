import { Component, inject, viewChild, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PatientsService } from '@/services/patients.service';
import { ToastService } from '@/shared/services/toast.service';
import { FormFieldComponent, FIELD_CONTROL_CLASS } from '@/shared/ui/form-field/form-field.component';

@Component({
  selector: 'app-patient-register',
  imports: [RouterLink, FormFieldComponent],
  templateUrl: './patient-register.component.html',
})
export class PatientRegisterComponent {
  private readonly patients = inject(PatientsService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly fieldClass = FIELD_CONTROL_CLASS;

  private readonly firstNameInput = viewChild.required<ElementRef<HTMLInputElement>>('firstName');
  private readonly lastNameInput = viewChild.required<ElementRef<HTMLInputElement>>('lastName');

  protected save(andQueue: boolean): void {
    const firstName = this.firstNameInput().nativeElement.value.trim() || 'Faith';
    const lastName = this.lastNameInput().nativeElement.value.trim() || 'Cherono';
    const patient = this.patients.register({ firstName, lastName });

    this.toast.success(`Patient saved · ${patient.id} created`);
    this.router.navigate([andQueue ? '/queue' : '/patients']);
  }
}

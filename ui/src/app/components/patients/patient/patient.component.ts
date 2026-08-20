import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataTableComponent } from '@/shared/ui/data-table/data-table.component';
import { DataTableCellDirective } from '@/shared/ui/data-table/data-table-cell.directive';
import { StatusBadgeComponent } from '@/shared/ui/status-badge/status-badge.component';
import { EmptyStateComponent } from '@/shared/ui/empty-state/empty-state.component';
import { PatientsService } from '@/services/patients.service';

const TABS = [
  'Overview',
  'Medical History',
  'Visits',
  'Consultations',
  'Prescriptions',
  'Lab Results',
  'Documents',
  'Billing',
  'Appointments',
] as const;
type Tab = (typeof TABS)[number];

const EMPTY_COPY: Partial<Record<Tab, { title: string; body: string; action: string }>> = {
  Visits: { title: 'No visits recorded yet', body: 'Visits appear here once the patient is checked in at reception.', action: 'Check in patient' },
  Consultations: { title: 'No consultation notes yet', body: 'Notes written by clinicians during a consultation will be listed here.', action: 'Start consultation' },
  Documents: { title: 'No documents attached', body: 'Upload referral letters, scans, consent forms or discharge summaries.', action: 'Upload document' },
  Billing: { title: 'No invoices for this patient', body: 'Invoices generated from consultations, labs and pharmacy will appear here.', action: 'Create invoice' },
  Appointments: { title: 'No upcoming appointments', body: 'Past appointments are archived under Visits.', action: 'Book appointment' },
};

const LAB_STATUS_TONE = { High: 'danger', Low: 'danger', Normal: 'success' } as const;

@Component({
  selector: 'app-patient',
  imports: [RouterLink, DataTableComponent, DataTableCellDirective, StatusBadgeComponent, EmptyStateComponent],
  templateUrl: './patient.component.html',
})
export class PatientComponent {
  private readonly patientsService = inject(PatientsService);

  readonly id = input('PT-10482');

  protected readonly patient = computed(() => this.patientsService.byId(this.id()) ?? this.patientsService.all()[0]);
  protected readonly detail = computed(() => this.patientsService.detailFor(this.id()));
  protected readonly initials = computed(() =>
    this.patient()
      .name.split(' ')
      .map(w => w[0])
      .join(''),
  );

  protected readonly tabs = TABS;
  protected readonly activeTab = signal<Tab>('Overview');

  protected readonly labColumns = [
    { key: 'test', header: 'Test', width: '1.3fr', cellClass: 'font-medium' },
    { key: 'date', header: 'Date', width: '100px', cellClass: 'text-secondary-foreground' },
    { key: 'value', header: 'Result', width: '120px', mono: true, cellClass: 'font-semibold' },
    { key: 'range', header: 'Reference range', width: '150px', mono: true, cellClass: 'text-muted-foreground text-[12px]' },
    { key: 'status', header: 'Status', width: '150px' },
    { key: 'by', header: 'Ordered by', width: '1fr', cellClass: 'text-secondary-foreground' },
  ];

  protected readonly labTone = LAB_STATUS_TONE;

  protected emptyCopy(tab: Tab) {
    return EMPTY_COPY[tab]!;
  }
}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataTableComponent } from '@/shared/ui/data-table/data-table.component';
import { DataTableCellDirective } from '@/shared/ui/data-table/data-table-cell.directive';
import { StatusBadgeComponent, StatusTone } from '@/shared/ui/status-badge/status-badge.component';
import { PatientsService, PatientStatus } from '@/services/patients.service';

const STATUS_META: Record<PatientStatus, { label: string; tone: StatusTone }> = {
  active: { label: 'Active', tone: 'success' },
  review: { label: 'Needs review', tone: 'warning' },
  inactive: { label: 'Inactive', tone: 'neutral' },
};

@Component({
  selector: 'app-patients',
  imports: [RouterLink, DataTableComponent, DataTableCellDirective, StatusBadgeComponent],
  templateUrl: './patients.component.html',
})
export class PatientsComponent {
  protected readonly patients = inject(PatientsService);
  protected readonly statusMeta = STATUS_META;

  protected readonly columns = [
    { key: 'id', header: 'Patient ID', width: '104px', mono: true, cellClass: 'text-muted-foreground text-[12px]' },
    { key: 'name', header: 'Name', width: '1.5fr' },
    { key: 'sex', header: 'Gender', width: '76px', cellClass: 'text-secondary-foreground' },
    { key: 'age', header: 'Age', width: '56px', cellClass: 'text-secondary-foreground' },
    { key: 'phone', header: 'Phone', width: '150px', cellClass: 'text-secondary-foreground' },
    { key: 'last', header: 'Last visit', width: '104px', cellClass: 'text-secondary-foreground' },
    { key: 'doctor', header: 'Doctor', width: '1fr', cellClass: 'text-secondary-foreground' },
    { key: 'status', header: 'Status', width: '110px' },
    { key: 'open', header: '', width: '74px' },
  ];
}

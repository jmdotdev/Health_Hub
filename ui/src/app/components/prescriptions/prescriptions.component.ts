import { Component, inject } from '@angular/core';
import { DataTableComponent } from '@/shared/ui/data-table/data-table.component';
import { DataTableCellDirective } from '@/shared/ui/data-table/data-table-cell.directive';
import { StatusBadgeComponent } from '@/shared/ui/status-badge/status-badge.component';
import { PrescriptionsService, RX_STATUS_TONE } from '@/services/prescriptions.service';

@Component({
  selector: 'app-prescriptions',
  imports: [DataTableComponent, DataTableCellDirective, StatusBadgeComponent],
  templateUrl: './prescriptions.component.html',
})
export class PrescriptionsComponent {
  protected readonly prescriptions = inject(PrescriptionsService);
  protected readonly statusTone = RX_STATUS_TONE;

  protected readonly columns = [
    { key: 'time', header: 'Issued', width: '110px', mono: true, cellClass: 'text-muted-foreground text-[12px]' },
    { key: 'patient', header: 'Patient', width: '1.2fr', cellClass: 'font-medium' },
    { key: 'drug', header: 'Medication', width: '1.8fr' },
    { key: 'prescriber', header: 'Prescriber', width: '1fr', cellClass: 'text-secondary-foreground' },
    { key: 'status', header: 'Status', width: '150px' },
    { key: 'actions', header: 'Actions', width: '130px' },
  ];
}

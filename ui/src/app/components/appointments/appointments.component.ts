import { Component, inject, signal } from '@angular/core';
import { DataTableComponent } from '@/shared/ui/data-table/data-table.component';
import { DataTableCellDirective } from '@/shared/ui/data-table/data-table-cell.directive';
import { StatusBadgeComponent } from '@/shared/ui/status-badge/status-badge.component';
import { AppointmentsService, APPOINTMENT_STATUS } from '@/services/appointments.service';

@Component({
  selector: 'app-appointments',
  imports: [DataTableComponent, DataTableCellDirective, StatusBadgeComponent],
  templateUrl: './appointments.component.html',
})
export class AppointmentsComponent {
  protected readonly appointments = inject(AppointmentsService);
  protected readonly appointmentStatus = APPOINTMENT_STATUS;

  protected readonly view = signal<'day' | 'list'>('day');

  protected readonly listColumns = [
    { key: 'time', header: 'Time', width: '80px', mono: true, cellClass: 'text-secondary-foreground' },
    { key: 'patient', header: 'Patient', width: '1.4fr', cellClass: 'font-medium' },
    { key: 'doctor', header: 'Doctor', width: '1fr', cellClass: 'text-secondary-foreground' },
    { key: 'type', header: 'Type', width: '1.1fr', cellClass: 'text-secondary-foreground' },
    { key: 'status', header: 'Status', width: '130px' },
    { key: 'note', header: 'Notes', width: '1fr', cellClass: 'text-muted-foreground text-[12.5px]' },
    { key: 'actions', header: 'Actions', width: '150px' },
  ];
}

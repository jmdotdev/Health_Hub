import { Component, inject } from '@angular/core';
import { DataTableComponent } from '@/shared/ui/data-table/data-table.component';
import { DataTableCellDirective } from '@/shared/ui/data-table/data-table-cell.directive';
import { StatusBadgeComponent } from '@/shared/ui/status-badge/status-badge.component';
import { StaffService, DUTY_STATUS_TONE } from '@/services/staff.service';

@Component({
  selector: 'app-staff',
  imports: [DataTableComponent, DataTableCellDirective, StatusBadgeComponent],
  templateUrl: './staff.component.html',
})
export class StaffComponent {
  protected readonly staff = inject(StaffService);
  protected readonly statusTone = DUTY_STATUS_TONE;

  protected readonly columns = [
    { key: 'name', header: 'Name', width: '1.3fr' },
    { key: 'role', header: 'Role', width: '1fr', cellClass: 'text-secondary-foreground' },
    { key: 'dept', header: 'Department', width: '1.1fr', cellClass: 'text-secondary-foreground' },
    { key: 'contact', header: 'Contact', width: '1.2fr', cellClass: 'text-secondary-foreground text-[12.5px]' },
    { key: 'status', header: 'Status', width: '120px' },
    { key: 'active', header: 'Last active', width: '130px', cellClass: 'text-muted-foreground text-[12.5px]' },
  ];
}

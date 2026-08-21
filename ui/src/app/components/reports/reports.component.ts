import { Component, inject } from '@angular/core';
import { DataTableComponent } from '@/shared/ui/data-table/data-table.component';
import { DataTableCellDirective } from '@/shared/ui/data-table/data-table-cell.directive';
import { ReportsService } from '@/services/reports.service';

@Component({
  selector: 'app-reports',
  imports: [DataTableComponent, DataTableCellDirective],
  templateUrl: './reports.component.html',
})
export class ReportsComponent {
  protected readonly reports = inject(ReportsService);

  protected readonly doctorColumns = [
    { key: 'name', header: 'Doctor', width: '1.2fr', cellClass: 'font-medium' },
    { key: 'consultations', header: 'Consultations', width: '1fr', mono: true, align: 'right' as const },
    { key: 'avgDuration', header: 'Avg duration', width: '1fr', mono: true, align: 'right' as const, cellClass: 'text-secondary-foreground' },
    { key: 'noShows', header: 'No-shows', width: '1fr', mono: true, align: 'right' as const, cellClass: 'text-secondary-foreground' },
    { key: 'avgWait', header: 'Avg wait', width: '1fr', mono: true, align: 'right' as const },
    { key: 'revenue', header: 'Revenue', width: '1fr', mono: true, align: 'right' as const },
  ];
}

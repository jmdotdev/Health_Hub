import { Component, inject } from '@angular/core';
import { DataTableComponent } from '@/shared/ui/data-table/data-table.component';
import { DataTableCellDirective } from '@/shared/ui/data-table/data-table-cell.directive';
import { StatusBadgeComponent } from '@/shared/ui/status-badge/status-badge.component';
import { BillingService, INVOICE_STATUS_TONE } from '@/services/billing.service';
import { ToastService } from '@/shared/services/toast.service';

@Component({
  selector: 'app-billing',
  imports: [DataTableComponent, DataTableCellDirective, StatusBadgeComponent],
  templateUrl: './billing.component.html',
})
export class BillingComponent {
  protected readonly billing = inject(BillingService);
  private readonly toast = inject(ToastService);
  protected readonly statusTone = INVOICE_STATUS_TONE;

  protected readonly columns = [
    { key: 'no', header: 'Invoice', width: '96px', mono: true, cellClass: 'text-primary text-[12px]' },
    { key: 'patient', header: 'Patient', width: '1.3fr', cellClass: 'font-medium' },
    { key: 'date', header: 'Date', width: '96px', cellClass: 'text-muted-foreground text-[12.5px]' },
    { key: 'total', header: 'Total', width: '110px', mono: true, align: 'right' as const },
    { key: 'balance', header: 'Balance', width: '110px' },
    { key: 'status', header: 'Status', width: '130px' },
  ];

  protected recordPayment(): void {
    this.billing.recordPayment('KSh 2,200');
    this.toast.success('Payment of KSh 2,200 recorded · invoice settled');
  }
}

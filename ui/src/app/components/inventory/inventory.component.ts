import { Component, inject } from '@angular/core';
import { DataTableComponent } from '@/shared/ui/data-table/data-table.component';
import { DataTableCellDirective } from '@/shared/ui/data-table/data-table-cell.directive';
import { StatusBadgeComponent } from '@/shared/ui/status-badge/status-badge.component';
import { InventoryService, STOCK_STATUS_TONE } from '@/services/inventory.service';

@Component({
  selector: 'app-inventory',
  imports: [DataTableComponent, DataTableCellDirective, StatusBadgeComponent],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent {
  protected readonly inventory = inject(InventoryService);
  protected readonly statusTone = STOCK_STATUS_TONE;

  protected readonly columns = [
    { key: 'item', header: 'Item', width: '1.5fr', cellClass: 'font-medium' },
    { key: 'category', header: 'Category', width: '1fr', cellClass: 'text-secondary-foreground' },
    { key: 'qty', header: 'Qty', width: '90px', mono: true, align: 'right' as const },
    { key: 'reorderAt', header: 'Reorder at', width: '110px', mono: true, align: 'right' as const, cellClass: 'text-text-subtle' },
    { key: 'expiry', header: 'Expiry', width: '120px' },
    { key: 'supplier', header: 'Supplier', width: '1.1fr', cellClass: 'text-secondary-foreground text-[12.5px]' },
    { key: 'status', header: 'Status', width: '140px' },
  ];
}

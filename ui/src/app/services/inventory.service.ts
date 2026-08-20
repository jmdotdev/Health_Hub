import { Injectable, signal } from '@angular/core';
import type { StatusTone } from '@/shared/ui/status-badge/status-badge.component';

export type StockStatus = 'Low stock' | 'Out of stock' | 'In stock' | 'Expiring soon';

export const STOCK_STATUS_TONE: Record<StockStatus, StatusTone> = {
  'Low stock': 'warning',
  'Out of stock': 'danger',
  'In stock': 'success',
  'Expiring soon': 'warning',
};

export interface StockRow {
  item: string;
  category: string;
  qty: string;
  reorderAt: string;
  expiry: string;
  supplier: string;
  status: StockStatus;
  /** true when qty/expiry text should render in the warning/danger colour, matching the artifact's per-row emphasis. */
  qtyFlagged?: boolean;
  expiryFlagged?: boolean;
}

const SEED: StockRow[] = [
  { item: 'Amoxicillin 500 mg caps', category: 'Antibiotics', qty: '40', reorderAt: '100', expiry: 'Mar 2027', supplier: 'Kenya Pharma Ltd', status: 'Low stock', qtyFlagged: true },
  { item: 'Salbutamol inhaler', category: 'Respiratory', qty: '0', reorderAt: '15', expiry: 'Aug 2027', supplier: 'Medisupply EA', status: 'Out of stock', qtyFlagged: true },
  { item: 'Metformin 500 mg tabs', category: 'Diabetes', qty: '860', reorderAt: '300', expiry: 'Jan 2028', supplier: 'Kenya Pharma Ltd', status: 'In stock' },
  { item: 'Paracetamol syrup', category: 'Analgesics', qty: '62', reorderAt: '60', expiry: 'Oct 2026', supplier: 'Medisupply EA', status: 'Expiring soon', expiryFlagged: true },
  { item: 'Disposable gloves (M)', category: 'Consumables', qty: '1,240', reorderAt: '500', expiry: '—', supplier: 'Clinicare Supplies', status: 'In stock' },
  { item: 'Glucose test strips', category: 'Diagnostics', qty: '74', reorderAt: '120', expiry: 'Sep 2026', supplier: 'Diagnostix', status: 'Low stock', qtyFlagged: true, expiryFlagged: true },
  { item: 'Lignocaine 2%', category: 'Anaesthetics', qty: '28', reorderAt: '20', expiry: 'Jun 2027', supplier: 'Kenya Pharma Ltd', status: 'In stock' },
];

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly rows = signal<StockRow[]>(SEED);
  readonly list = this.rows.asReadonly();
}

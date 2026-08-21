import { Injectable, signal } from '@angular/core';
import type { StatusTone } from '@/shared/ui/status-badge/status-badge.component';

export type InvoiceStatus = 'Partially paid' | 'Paid' | 'Pending' | 'Overdue' | 'Refunded';

export const INVOICE_STATUS_TONE: Record<InvoiceStatus, StatusTone> = {
  'Partially paid': 'warning',
  Paid: 'success',
  Pending: 'neutral',
  Overdue: 'danger',
  Refunded: 'info',
};

export interface Invoice {
  no: string;
  patient: string;
  date: string;
  total: string;
  balance: string;
  status: InvoiceStatus;
}

export interface InvoiceLine {
  name: string;
  category: string;
  qty: string;
  amount: string;
}

const SEED_INVOICES: Invoice[] = [
  { no: 'INV-2051', patient: 'Mary Wanjiku', date: '19 Aug', total: 'KSh 5,200', balance: 'KSh 2,200', status: 'Partially paid' },
  { no: 'INV-2050', patient: 'Grace Achieng', date: '19 Aug', total: 'KSh 1,800', balance: 'KSh 0', status: 'Paid' },
  { no: 'INV-2049', patient: 'Samuel Ndungu', date: '19 Aug', total: 'KSh 900', balance: 'KSh 900', status: 'Pending' },
  { no: 'INV-2044', patient: 'Daniel Kimani', date: '18 Aug', total: 'KSh 3,400', balance: 'KSh 0', status: 'Paid' },
  { no: 'INV-2038', patient: 'Peter Mwangi', date: '07 Aug', total: 'KSh 4,200', balance: 'KSh 4,200', status: 'Overdue' },
  { no: 'INV-2031', patient: 'Aisha Hassan', date: '04 Aug', total: 'KSh 2,600', balance: 'KSh 0', status: 'Refunded' },
];

const SEED_LINES: InvoiceLine[] = [
  { name: 'General consultation', category: 'Dr. Kamau · 20 min', qty: '1', amount: 'KSh 2,000' },
  { name: 'HbA1c', category: 'Laboratory', qty: '1', amount: 'KSh 2,400' },
  { name: 'Metformin 500 mg', category: 'Pharmacy · 180 tablets', qty: '1', amount: 'KSh 1,600' },
  { name: 'Blood pressure check', category: 'Nursing', qty: '1', amount: 'KSh 400' },
];

@Injectable({ providedIn: 'root' })
export class BillingService {
  private readonly invoiceList = signal<Invoice[]>(SEED_INVOICES);
  readonly invoices = this.invoiceList.asReadonly();
  readonly selectedLines = signal<InvoiceLine[]>(SEED_LINES);
  readonly selectedInvoiceNo = signal('INV-2051');

  recordPayment(amountLabel: string): void {
    this.invoiceList.update(list =>
      list.map(inv => (inv.no === this.selectedInvoiceNo() ? { ...inv, balance: 'KSh 0', status: 'Paid' as const } : inv)),
    );
  }
}

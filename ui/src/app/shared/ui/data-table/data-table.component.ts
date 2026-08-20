import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChildren, input } from '@angular/core';

import { DataTableCellDirective } from './data-table-cell.directive';

export interface DataTableColumn {
  key: string;
  header: string;
  /** CSS grid track for this column, e.g. '104px' or '1.5fr'. */
  width: string;
  align?: 'left' | 'right';
  /** Render the default cell value in the tabular numeral / mono font (ids, times, currency). */
  mono?: boolean;
  /** Extra classes applied to the default (non-templated) cell value, e.g. text colour. */
  cellClass?: string;
}

/**
 * Generic column-config table used by every list screen (Patients, Appointments list,
 * Prescriptions, Staff, Inventory, Billing invoices, Reports/doctor activity). Mirrors the
 * artifact's own layout technique — a CSS-grid header/row rather than a native `<table>` — so
 * columns can mix fixed widths and `fr` tracks exactly like the design spec. Wrapped in its own
 * `overflow-x-auto`, so every table gets safe horizontal scrolling on narrow screens for free.
 */
@Component({
  selector: 'app-data-table',
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="overflow-x-auto" [class]="bordered() ? 'rounded-[9px] border border-border bg-card' : ''">
      <div [style.min-width]="minWidth()">
        <div
          class="grid gap-3 border-b border-border-soft bg-[#fbfbfc] px-3.5 py-2.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase"
          [style.grid-template-columns]="gridTemplate()"
        >
          @for (col of columns(); track col.key) {
            <div [class.text-right]="col.align === 'right'">{{ col.header }}</div>
          }
        </div>

        @for (row of rows(); track $index) {
          <div
            class="grid items-center gap-3 border-b border-border-soft px-3.5 py-2.75 text-[13px] last:border-b-0 hover:bg-[#fbfcfd]"
            [style.grid-template-columns]="gridTemplate()"
          >
            @for (col of columns(); track col.key) {
              <div [class.text-right]="col.align === 'right'" [class.font-mono]="col.mono" [class]="col.cellClass">
                @if (templateFor(col.key); as tpl) {
                  <ng-container *ngTemplateOutlet="tpl; context: { $implicit: row }" />
                } @else {
                  {{ cellValue(row, col.key) }}
                }
              </div>
            }
          </div>
        } @empty {
          <div class="px-3.5 py-8 text-center text-[13px] text-muted-foreground">No records to show.</div>
        }
      </div>
    </section>
  `,
})
export class DataTableComponent {
  readonly columns = input.required<DataTableColumn[]>();
  readonly rows = input.required<unknown[]>();
  readonly minWidth = input('720px');
  /** Set false when already nested inside another card, to avoid a double border/radius. */
  readonly bordered = input(true);

  private readonly cellTemplates = contentChildren(DataTableCellDirective);

  protected readonly gridTemplate = computed(() => this.columns().map(c => c.width).join(' '));

  protected templateFor(key: string) {
    return this.cellTemplates().find(t => t.appCell() === key)?.templateRef;
  }

  protected cellValue(row: unknown, key: string): unknown {
    return (row as Record<string, unknown>)[key];
  }
}

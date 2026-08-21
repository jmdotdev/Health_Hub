import { Directive, inject, input, TemplateRef } from '@angular/core';

/**
 * Marks an `<ng-template>` as the custom cell renderer for one column of
 * `<app-data-table>`, e.g. `<ng-template appCell="name" let-row>...</ng-template>`.
 */
@Directive({
  selector: '[appCell]',
})
export class DataTableCellDirective {
  readonly appCell = input.required<string>({ alias: 'appCell' });
  readonly templateRef = inject<TemplateRef<{ $implicit: unknown }>>(TemplateRef);
}

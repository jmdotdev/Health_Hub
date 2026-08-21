import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** One cell in a stat strip (dashboard, reports). Divider lines are handled by the parent grid via `divide-x`. */
@Component({
  selector: 'app-stat-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="px-4 py-3.5">
      <div class="mb-1.5 text-[11.5px] text-muted-foreground">{{ label() }}</div>
      <div class="font-mono text-[22px] font-semibold" [class]="valueClass()">{{ value() }}</div>
    </div>
  `,
})
export class StatCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly valueClass = input<string>('');
}

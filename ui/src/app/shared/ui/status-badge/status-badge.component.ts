import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type StatusTone = 'success' | 'warning' | 'info' | 'danger' | 'neutral' | 'primary';

const TONE_CLASSES: Record<StatusTone, string> = {
  success: 'bg-success-bg text-success border-success-border',
  warning: 'bg-warning-bg text-warning border-warning-border',
  info: 'bg-info-bg text-info border-info-border',
  danger: 'bg-danger-bg text-danger border-danger-border',
  neutral: 'bg-neutral-bg text-neutral border-neutral-border',
  /** "In consultation" — the artifact's primary-tint pill, distinct from `info`. */
  primary: 'bg-accent text-accent-foreground border-[#cfe6ee]',
};

/**
 * Status pill used across every list/table/detail screen (appointments,
 * patients, invoices, prescriptions, staff, inventory...). One
 * implementation keeps the five status colors from the design spec
 * consistent everywhere instead of repeating bg/fg/border classes per call site.
 */
@Component({
  selector: 'app-status-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="classes()"><ng-content /></span>`,
})
export class StatusBadgeComponent {
  readonly tone = input<StatusTone>('neutral');

  protected readonly classes = computed(
    () =>
      `inline-flex items-center rounded border px-2 py-0.5 text-[11.5px] font-medium leading-none whitespace-nowrap ${TONE_CLASSES[this.tone()]}`,
  );
}

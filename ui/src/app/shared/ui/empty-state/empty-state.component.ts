import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendarX,
  lucideFileText,
  lucideInbox,
  lucidePill,
  lucideReceipt,
  lucideSearch,
} from '@ng-icons/lucide';
import { ZardButtonComponent } from '@/shared/components/button';

export type EmptyStateIcon = 'search' | 'folder' | 'calendar' | 'pill' | 'receipt' | 'inbox';

const ICON_NAMES: Record<EmptyStateIcon, string> = {
  search: 'lucideSearch',
  folder: 'lucideFileText',
  calendar: 'lucideCalendarX',
  pill: 'lucidePill',
  receipt: 'lucideReceipt',
  inbox: 'lucideInbox',
};

/**
 * Centered empty-state block: icon tile, title, description, optional primary action.
 * Used by the Medical Records landing screen and every empty patient-detail tab.
 */
@Component({
  selector: 'app-empty-state',
  imports: [NgIcon, ZardButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({ lucideSearch, lucideFileText, lucideCalendarX, lucidePill, lucideReceipt, lucideInbox }),
  ],
  template: `
    <section class="rounded-[9px] border border-border bg-card px-5 text-center" [class]="paddingClass()">
      <div class="mx-auto mb-3.5 flex size-10 items-center justify-center rounded-[9px] bg-secondary">
        <ng-icon [name]="iconName()" class="size-[18px] text-text-subtle" />
      </div>
      <div class="mb-1.5 text-[14px] font-semibold">{{ title() }}</div>
      <div class="mx-auto mb-4 max-w-[400px] text-[13px] text-muted-foreground">{{ description() }}</div>
      @if (actionLabel()) {
        <button
          z-button
          zType="default"
          class="h-auto rounded-[7px] bg-primary px-3.5 py-2 text-[13px] font-medium hover:bg-primary-hover"
          (click)="action.emit()"
        >
          {{ actionLabel() }}
        </button>
      }
    </section>
  `,
})
export class EmptyStateComponent {
  readonly icon = input<EmptyStateIcon>('inbox');
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly actionLabel = input<string>();
  readonly compact = input(false);

  readonly action = output<void>();

  protected readonly iconName = () => ICON_NAMES[this.icon()];
  protected readonly paddingClass = () => (this.compact() ? 'py-14' : 'py-16');
}

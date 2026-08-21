import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Shared Tailwind classes for a text input / select / textarea across every form in the app. */
export const FIELD_CONTROL_CLASS =
  'h-9 w-full rounded-md border border-input bg-card px-2.5 text-[13.5px] outline-none focus:border-primary focus:ring-3 focus:ring-primary/10';

/** Label + optional required-asterisk + optional hint, wrapping a projected input/select/textarea. */
@Component({
  selector: 'app-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="block" [class]="span2() ? 'sm:col-span-2' : ''">
      <span class="mb-1.5 block text-[12.5px] text-secondary-foreground">
        {{ label() }}
        @if (required()) {
          <span class="text-destructive">*</span>
        }
        @if (hint()) {
          <span class="font-normal text-text-subtle">{{ hint() }}</span>
        }
      </span>
      <ng-content />
    </label>
  `,
})
export class FormFieldComponent {
  readonly label = input.required<string>();
  readonly required = input(false);
  readonly hint = input<string>();
  readonly span2 = input(false);
}

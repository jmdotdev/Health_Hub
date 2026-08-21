import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { QueueService } from '@/services/queue.service';
import { ToastService } from '@/shared/services/toast.service';
import { FormFieldComponent, FIELD_CONTROL_CLASS } from '@/shared/ui/form-field/form-field.component';

@Component({
  selector: 'app-add-walkin',
  imports: [RouterLink, FormFieldComponent],
  templateUrl: './add-walkin.component.html',
})
export class AddWalkinComponent {
  private readonly queue = inject(QueueService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly fieldClass = FIELD_CONTROL_CLASS;
  private readonly reasonInput = viewChild.required<ElementRef<HTMLInputElement>>('reason');

  protected addToQueue(): void {
    const reason = this.reasonInput().nativeElement.value.trim() || 'Chest pain, shortness of breath';
    this.queue.addWalkin({ name: 'Brian Otieno', reason, doctor: 'Any available', priority: 'Urgent' });
    this.toast.success('Brian Otieno added to the queue');
    this.router.navigate(['/queue']);
  }
}

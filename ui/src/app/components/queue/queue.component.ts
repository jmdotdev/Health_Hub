import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QueueService, priorityAccentClass, priorityTone, waitTextClass } from '@/services/queue.service';
import { StatusBadgeComponent } from '@/shared/ui/status-badge/status-badge.component';
import { ToastService } from '@/shared/services/toast.service';

@Component({
  selector: 'app-queue',
  imports: [RouterLink, StatusBadgeComponent],
  templateUrl: './queue.component.html',
})
export class QueueComponent {
  protected readonly queue = inject(QueueService);
  private readonly toast = inject(ToastService);

  protected readonly waitTextClass = waitTextClass;
  protected readonly priorityTone = priorityTone;
  protected readonly priorityAccentClass = priorityAccentClass;

  protected call(name: string): void {
    this.queue.callPatient(name);
    this.toast.notify(`${name} called to reception`);
  }
}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatCardComponent } from '@/shared/ui/stat-card/stat-card.component';
import { StatusBadgeComponent } from '@/shared/ui/status-badge/status-badge.component';
import { DataTableComponent } from '@/shared/ui/data-table/data-table.component';
import { DataTableCellDirective } from '@/shared/ui/data-table/data-table-cell.directive';
import { AppointmentsService, APPOINTMENT_STATUS } from '@/services/appointments.service';
import { QueueService, waitTextClass } from '@/services/queue.service';

interface ActivityItem {
  time: string;
  text: string;
  emphasis?: string;
}

const RECENT_ACTIVITY: ActivityItem[] = [
  { time: '09:12', text: 'Payment received · Grace Achieng · KSh 1,800', emphasis: 'Grace Achieng' },
  { time: '09:06', text: 'Prescription issued by Dr. Njoroge' },
  { time: '08:58', text: 'Consultation completed · Grace Achieng', emphasis: 'Grace Achieng' },
  { time: '08:41', text: 'Walk-in added · Brian Otieno', emphasis: 'Brian Otieno' },
  { time: '08:30', text: 'Patient registered · Aisha Hassan', emphasis: 'Aisha Hassan' },
];

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, StatCardComponent, StatusBadgeComponent, DataTableComponent, DataTableCellDirective],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  protected readonly appointments = inject(AppointmentsService);
  protected readonly queue = inject(QueueService);

  protected readonly appointmentStatus = APPOINTMENT_STATUS;
  protected readonly waitTextClass = waitTextClass;
  protected readonly recentActivity = RECENT_ACTIVITY;

  protected readonly todaysAppointments = this.appointments.list().slice(0, 5);
  protected readonly topWaiting = this.queue.waiting().slice(0, 3);
  protected readonly firstInConsultation = this.queue.inConsultation()[0];

  protected primaryLabel(status: keyof typeof APPOINTMENT_STATUS): string {
    return { conf: 'Check in', busy: 'Open', wait: 'Start', done: 'Summary', miss: 'Rebook' }[status];
  }

  protected primaryRoute(status: keyof typeof APPOINTMENT_STATUS): string {
    return status === 'busy' || status === 'wait' ? '/consultation' : '/appointments';
  }
}

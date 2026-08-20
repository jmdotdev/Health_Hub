import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { QueueService } from '@/services/queue.service';

interface NavItem {
  label: string;
  route: string;
  icon: string;
  badge?: () => number;
}

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {
  private readonly queue = inject(QueueService);

  readonly collapsed = input(false);
  readonly mobileOpen = input(false);
  readonly mobileOpenChange = output<boolean>();
  readonly collapsedChange = output<boolean>();

  protected readonly navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'grid' },
    { label: 'Patients', route: '/patients', icon: 'patients' },
    { label: 'Appointments', route: '/appointments', icon: 'calendar' },
    { label: 'Queue / Walk-ins', route: '/queue', icon: 'queue', badge: () => this.queue.waitingCount() },
    { label: 'Consultations', route: '/consultation', icon: 'consultation' },
    { label: 'Medical Records', route: '/records', icon: 'records' },
    { label: 'Prescriptions', route: '/prescriptions', icon: 'prescription' },
    { label: 'Billing & Payments', route: '/billing', icon: 'billing' },
    { label: 'Reports', route: '/reports', icon: 'reports' },
    { label: 'Staff', route: '/staff', icon: 'staff' },
    { label: 'Inventory', route: '/inventory', icon: 'inventory' },
    { label: 'Settings', route: '/settings', icon: 'settings' },
  ];

  protected readonly widthClass = computed(() => (this.collapsed() ? 'w-[68px]' : 'w-[244px]'));

  protected toggleCollapse(): void {
    this.collapsedChange.emit(!this.collapsed());
  }

  protected closeMobile(): void {
    this.mobileOpenChange.emit(false);
  }
}

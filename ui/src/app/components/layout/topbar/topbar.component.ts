import { Component, computed, inject, output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PatientsService } from '@/services/patients.service';
import { NotificationsService } from '@/services/notifications.service';

const DOT_CLASS: Record<string, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  info: 'bg-info',
  danger: 'bg-danger',
  neutral: 'bg-neutral',
  primary: 'bg-primary',
};

@Component({
  selector: 'app-topbar',
  imports: [RouterLink],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  private readonly router = inject(Router);
  private readonly patients = inject(PatientsService);
  protected readonly notifications = inject(NotificationsService);

  readonly openMobileNav = output<void>();

  protected readonly query = signal('');
  protected readonly searchOpen = signal(false);
  protected readonly notifOpen = signal(false);

  protected readonly results = computed(() => this.patients.search(this.query()));
  protected readonly hasQuery = computed(() => this.query().trim().length > 0);
  protected readonly noResults = computed(() => this.hasQuery() && this.results().length === 0);
  protected readonly panelOpen = computed(() => this.searchOpen() || this.notifOpen());

  protected dotClass(tone: string): string {
    return DOT_CLASS[tone] ?? 'bg-neutral';
  }

  protected onSearchInput(value: string): void {
    this.query.set(value);
    this.searchOpen.set(true);
    this.notifOpen.set(false);
  }

  protected openSearch(): void {
    this.searchOpen.set(true);
    this.notifOpen.set(false);
  }

  protected toggleNotifications(): void {
    this.notifOpen.set(!this.notifOpen());
    this.searchOpen.set(false);
  }

  protected closePanels(): void {
    this.searchOpen.set(false);
    this.notifOpen.set(false);
  }

  protected openPatient(id: string): void {
    this.closePanels();
    this.query.set('');
    this.router.navigate(['/patients', id]);
  }

  protected registerPatient(): void {
    this.closePanels();
    this.router.navigate(['/patients/register']);
  }
}

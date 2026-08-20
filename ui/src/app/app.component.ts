import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TopbarComponent } from './components/layout/topbar/topbar.component';
import { ZardSonnerComponent } from '@/shared/components/sonner';

const AUTH_ROUTES = ['/', '/register'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidenavComponent, TopbarComponent, ZardSonnerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly router = inject(Router);

  protected readonly sidebarCollapsed = signal(false);
  protected readonly mobileNavOpen = signal(false);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly showShell = computed(() => !AUTH_ROUTES.includes(this.currentUrl()));
}

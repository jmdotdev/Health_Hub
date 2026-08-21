import { inject, Injectable } from '@angular/core';
import { ZardSonnerService } from '@/shared/components/sonner';

/**
 * Thin app-facing wrapper over Zard's sonner service, matching the artifact's
 * simple `notify(message)` pattern (used after saving a patient, recording a
 * payment, adding a walk-in, etc.) without coupling call sites to ngx-sonner.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly sonner = inject(ZardSonnerService);

  notify(message: string): void {
    this.sonner.message(message);
  }

  success(message: string): void {
    this.sonner.success(message);
  }

  error(message: string): void {
    this.sonner.error(message);
  }
}

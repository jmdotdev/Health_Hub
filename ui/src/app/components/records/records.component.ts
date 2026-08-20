import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EmptyStateComponent } from '@/shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-records',
  imports: [EmptyStateComponent],
  templateUrl: './records.component.html',
})
export class RecordsComponent {
  private readonly router = inject(Router);

  protected browsePatients(): void {
    this.router.navigate(['/patients']);
  }
}

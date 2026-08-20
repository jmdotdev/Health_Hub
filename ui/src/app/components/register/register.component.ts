import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormFieldComponent, FIELD_CONTROL_CLASS } from '@/shared/ui/form-field/form-field.component';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormFieldComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly router = inject(Router);
  protected readonly fieldClass = FIELD_CONTROL_CLASS;

  protected createAccount(): void {
    this.router.navigate(['/dashboard']);
  }
}

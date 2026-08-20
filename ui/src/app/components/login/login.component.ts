import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormFieldComponent, FIELD_CONTROL_CLASS } from '@/shared/ui/form-field/form-field.component';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormFieldComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly router = inject(Router);
  protected readonly fieldClass = FIELD_CONTROL_CLASS;

  protected signIn(): void {
    this.router.navigate(['/dashboard']);
  }
}

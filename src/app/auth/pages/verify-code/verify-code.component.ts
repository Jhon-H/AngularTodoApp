import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth-service.service';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './verify-code.component.html',
})
export default class VerifyCodeComponent {
  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);

  public isInvalid = false;

  public verifyForm = this.fb.group({
    username: ['', [Validators.required]],
    code: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  });

  verifyCode(): void {
    if (this.verifyForm.invalid) return;

    const username = this.verifyForm.controls.username.value!;
    const confirmationCode = this.verifyForm.controls.code.value!;

    this.authService
      .confirmSignUp({
        username,
        confirmationCode,
      })
      .then(() => {
        this.isInvalid = false;
        this.router.navigate(['/auth/login']);
      })
      .catch(() => {
        this.isInvalid = true;
      });
  }

  resendVerifyCode(): void {
    if (this.verifyForm.controls.username.invalid) return;

    const username = this.verifyForm.controls.username.value!;

    this.authService
      .resendSignUpCode({
        username,
      })
      .then(() => {
        this.verifyForm.reset();
      });
  }
}

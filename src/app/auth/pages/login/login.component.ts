import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  private authService = inject(AuthService);

  private router = inject(Router);

  private fb = inject(FormBuilder);

  public isError = false;

  public loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public signIn(): void {
    if (!this.loginForm.valid) return;

    const username = this.loginForm.controls.email.value!;
    const password = this.loginForm.controls.password.value!;

    this.authService
      .signInUser({ username, password })
      .then(() => {
        this.isError = false;
        this.router.navigate(['/summary']);
      })
      .catch(() => {
        this.isError = true;
      });
  }

  public signInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth-service.service';
import { ValidatorsService } from '@shared/services/validators.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
})
export default class RegisterComponent {
  private authService = inject(AuthService);

  private router = inject(Router);

  private fb = inject(FormBuilder);

  private validatorsService = inject(ValidatorsService);

  public isError = false;

  public registerForm = this.fb.group(
    {
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo(
          'password',
          'confirmPassword',
        ),
      ],
    },
  );

  public signUp(): void {
    if (!this.registerForm.valid) return;

    const username = this.registerForm.controls.username.value!;
    const email = this.registerForm.controls.email.value!;
    const password = this.registerForm.controls.password.value!;

    this.authService
      .signUpUser({
        username,
        password,
        options: {
          userAttributes: {
            name: username,
            email,
          },
        },
      })
      .then(() => {
        this.isError = false;
        this.router.navigate(['/auth/login']);
      })
      .catch(() => {
        this.isError = true;
      });
  }
}

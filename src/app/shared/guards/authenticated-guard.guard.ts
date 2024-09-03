import { inject } from '@angular/core';
import {
  CanActivateFn,
  CanMatchFn,
  GuardResult,
  MaybeAsync,
  Router,
} from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '@auth/services/auth-service.service';

const checkAuthStatus = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    tap((isAuth) => {
      if (!isAuth) {
        router.navigate(['/auth/login']);
      }
    }),
  );
};

export const authCanActivateGuard: CanActivateFn =
  (): MaybeAsync<GuardResult> => checkAuthStatus();

export const authCanMathGuard: CanMatchFn = (): MaybeAsync<GuardResult> =>
  checkAuthStatus();

import { inject } from '@angular/core';
import {
  CanActivateFn,
  CanMatchFn,
  GuardResult,
  MaybeAsync,
  Router,
} from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from '@auth/services/auth-service.service';

const checkAuthStatus = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // authService.validateCurrentSession();

  return authService.isLoggedIn$.pipe(
    tap((isAuth) => {
      if (isAuth) router.navigate(['/']);
    }),
    map((isAuth) => !isAuth),
  );
};

export const publicCanActivateGuard: CanActivateFn =
  (): MaybeAsync<GuardResult> => checkAuthStatus();

export const publicCanMathGuard: CanMatchFn = (): MaybeAsync<GuardResult> =>
  checkAuthStatus();

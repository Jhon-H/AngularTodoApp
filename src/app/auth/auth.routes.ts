import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component'),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component'),
      },
      {
        path: 'verify',
        loadComponent: () => import('./pages/verify-code/verify-code.component'),
      },
      {
        path: '**',
        redirectTo: '/auth/login',
      },
    ],
  },
];

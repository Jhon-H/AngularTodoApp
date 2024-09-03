import { Routes } from '@angular/router';
import {
  authCanActivateGuard,
  authCanMathGuard,
} from '@shared/guards/authenticated-guard.guard';
import {
  publicCanActivateGuard,
  publicCanMathGuard,
} from '@shared/guards/public-guard.guard';

export const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () =>
      import('./tasks/tasks.routes').then((m) => m.TASKS_ROUTES),
  },
  {
    path: 'auth',
    canActivate: [publicCanActivateGuard],
    canMatch: [publicCanMathGuard],
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'summary',
    canActivate: [authCanActivateGuard],
    canMatch: [authCanMathGuard],
    loadChildren: () =>
      import('./summary/summary.routes').then((m) => m.SUMMARY_ROUTES),
  },
  {
    path: '404',
    loadComponent: () => import('./shared/pages/error404/error404.component'),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/tasks',
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

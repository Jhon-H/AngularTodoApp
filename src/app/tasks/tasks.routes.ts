import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@tasks/layouts/main-layout/main-layout.component';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: ':list-id',
        loadComponent: () => import('./pages/list-page/list-page.component'),
      },
      {
        path: ':list-id/:task-id',
        loadComponent: () =>
          import('./pages/edit-task-page/edit-task-page.component'),
      },
      {
        path: '**',
        redirectTo: '/404',
      },
    ],
  },
];

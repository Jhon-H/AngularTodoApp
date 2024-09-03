import { Routes } from '@angular/router';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';

export const SUMMARY_ROUTES: Routes = [
  {
    path: '',
    component: SummaryPageComponent,
  },
  {
    path: '**',
    redirectTo: '/summary',
  },
];

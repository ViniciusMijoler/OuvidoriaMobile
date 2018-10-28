import { Routes } from '@angular/router';

import { FullComponent } from './shared/layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', loadChildren: './pages/pages.module#PagesModule' },
      // { path: '', loadChildren: './material-component/material.module#MaterialComponentsModule' },
      { path: '**', redirectTo: '/manifestations', pathMatch: 'full' },
    ]
  }
];


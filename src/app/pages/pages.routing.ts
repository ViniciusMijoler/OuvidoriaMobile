import { Routes } from '@angular/router';

import { ManifestationsComponent } from './manifestations/manifestations.component';
import { ManifestationComponent } from './manifestation/manifestation.component';

export const PagesRoutes: Routes = [
  { path: '', redirectTo: '/manifestations', pathMatch: 'full' },
  { path: 'manifestations', component: ManifestationsComponent },
  { path: 'manifestation', component: ManifestationComponent }
];

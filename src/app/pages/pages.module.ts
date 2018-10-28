import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesRoutes } from './pages.routing';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SlideshowModule } from 'ng-simple-slideshow';

import { ManifestationsComponent } from './manifestations/manifestations.component';
import { ManifestationComponent } from './manifestation/manifestation.component';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    SlideshowModule,
    RouterModule.forChild(PagesRoutes)
  ],
  declarations: [
    ManifestationsComponent,
    ManifestationComponent
  ]
})

export class PagesModule { }

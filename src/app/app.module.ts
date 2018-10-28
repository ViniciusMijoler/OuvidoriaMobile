import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MAT_DATE_LOCALE } from '@angular/material/core';
import localePt from '@angular/common/locales/pt';
import { SlideshowModule } from 'ng-simple-slideshow';

import { AppRoutes } from './app.routing';

// Modules
import { DemoMaterialModule } from './demo-material-module';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './pipes/pipes.module';

// Components
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { FullComponent } from './shared/layouts/full/full.component';
import { AppHeaderComponent } from './shared/layouts/full/header/header.component';
import { AppSidebarComponent } from './shared/layouts/full/sidebar/sidebar.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';

// Services

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    SlideshowModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    PipesModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

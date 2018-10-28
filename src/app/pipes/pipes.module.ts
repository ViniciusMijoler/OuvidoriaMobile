import { NgModule } from '@angular/core';
import { PercentagePipe } from './percentage/percentage.pipe';

@NgModule({
  declarations: [
    PercentagePipe
  ],
  exports: [
    PercentagePipe
  ]
})
export class PipesModule {
}

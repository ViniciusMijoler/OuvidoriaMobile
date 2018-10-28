import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { TableComponent } from './components/table/table.component';
import { DemoMaterialModule } from '../demo-material-module';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    TableComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    DemoMaterialModule
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    TableComponent,
    CardComponent
  ],
  providers: [MenuItems]
})
export class SharedModule { }

import { DemoFormlyComponent } from './demo-formly/demo-formly.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { AgFormlyModule } from '@shared/components/ag-formly/ag-formly.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [DemoFormlyComponent],
  imports: [IonicModule, CommonModule, DemoRoutingModule, AgFormlyModule],
})
export class DemoModule {}

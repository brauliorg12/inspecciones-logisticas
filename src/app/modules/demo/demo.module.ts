import { DemoFormlyComponent } from './demo-formly/demo-formly.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { AgFormlyModule } from '@shared/components/ag-formly/ag-formly.module';

@NgModule({
  declarations: [DemoFormlyComponent],
  imports: [CommonModule, DemoRoutingModule, AgFormlyModule],
})
export class DemoModule {}

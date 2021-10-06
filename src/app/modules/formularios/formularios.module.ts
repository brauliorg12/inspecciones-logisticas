import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgFormlyModule } from '@shared/components/ag-formly/ag-formly.module';
import { MotoFormlyComponent } from './moto/moto-formly.component';
import { FormulariosRoutingModule } from './formularios-routing.module';


@NgModule({
  declarations: [MotoFormlyComponent],
  imports: [IonicModule, CommonModule, FormulariosRoutingModule, AgFormlyModule],
})
export class FormulariosModule {}

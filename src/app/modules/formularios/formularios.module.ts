import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgFormlyModule } from '@shared/components/ag-formly/ag-formly.module';
import { MotoFormlyComponent } from './moto/moto-formly.component';
import { FormulariosRoutingModule } from './formularios-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '../../shared/components/button/button.module';

@NgModule({
  declarations: [MotoFormlyComponent],
  imports: [
    IonicModule,
    CommonModule,
    ButtonModule,
    FormulariosRoutingModule,
    AgFormlyModule,
    MatExpansionModule,
    MatIconModule
  ],
})
export class FormulariosModule {}

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgFormlyModule } from '@shared/components/ag-formly/ag-formly.module';
import { ListadoComponent } from './listado.component';
import { FormulariosListadoRoutingModule } from './listado-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '@shared/components/button/button.module';

@NgModule({
  declarations: [ListadoComponent],
  imports: [
    IonicModule,
    CommonModule,
    ButtonModule,
    FormulariosListadoRoutingModule,
    AgFormlyModule,
    MatExpansionModule,
    MatIconModule,
  ],
})
export class FormulariosListadoModule {}

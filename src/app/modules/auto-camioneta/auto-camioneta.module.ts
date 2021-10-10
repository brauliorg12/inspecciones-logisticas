import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgFormlyModule } from '@shared/components/ag-formly/ag-formly.module';
import { FormulariosAutoCamionetaRoutingModule } from './auto-camioneta-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '@shared/components/button/button.module';
import { AutoCamionetaFormlyComponent } from './auto-camioneta.component';

@NgModule({
  declarations: [AutoCamionetaFormlyComponent],
  imports: [
    IonicModule,
    CommonModule,
    ButtonModule,
    FormulariosAutoCamionetaRoutingModule,
    AgFormlyModule,
    MatExpansionModule,
    MatIconModule
  ],
})
export class FormulariosAutoCamionetaModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoCamionetaFormlyComponent } from './auto-camioneta.component';

const routes: Routes = [
  { path: '', redirectTo: 'auto-camioneta', pathMatch: 'full' },
  {
    path: 'auto-camioneta',
    children: [{ path: '', component: AutoCamionetaFormlyComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulariosAutoCamionetaRoutingModule {}

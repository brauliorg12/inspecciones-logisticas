import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotoFormlyComponent } from './moto.component';

const routes: Routes = [
  { path: '', redirectTo: 'moto', pathMatch: 'full' },
  {
    path: 'moto',
    children: [{ path: '', component: MotoFormlyComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulariosMotoRoutingModule {}

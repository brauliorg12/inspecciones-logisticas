import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotoFormlyComponent } from './moto/moto-formly.component';

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
export class FormulariosRoutingModule {}

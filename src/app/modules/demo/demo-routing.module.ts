import { DemoFormlyComponent } from './demo-formly/demo-formly.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'formly', pathMatch: 'full' },
  {
    path: 'formly',
    children: [{ path: '', component: DemoFormlyComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}

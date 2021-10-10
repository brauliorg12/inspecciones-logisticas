import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoComponent } from './listado.component';

const routes: Routes = [
  { path: '', redirectTo: 'listadoPlanillas', pathMatch: 'full' },
  {
    path: 'listado',
    children: [{ path: '', component: ListadoComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulariosListadoRoutingModule {}

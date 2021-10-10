import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'listadoPlanillas',
        loadChildren: () =>
          import('../modules/listado/listado.module').then((m) => m.FormulariosListadoModule),
      },
      {
        path: 'formularioMoto',
        loadChildren: () =>
          import('../modules/moto/moto.module').then((m) => m.FormulariosMotoModule),
      },
      {
        path: 'formularioAutoCamioneta',
        loadChildren: () =>
          import('../modules/auto-camioneta/auto-camioneta.module').then((m) => m.FormulariosAutoCamionetaModule),
      },
      {
        path: '',
        redirectTo: '/tabs/listadoPlanillas/listado',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/listadoPlanillas/listado',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

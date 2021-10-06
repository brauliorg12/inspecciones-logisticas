import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'formulario',
        loadChildren: () =>
          import('../modules/formularios/formularios.module').then((m) => m.FormulariosModule),
      },
      {
        path: 'demo',
        loadChildren: () =>
          import('../modules/demo/demo.module').then((m) => m.DemoModule),
      },
      {
        path: '',
        redirectTo: '/tabs/formulario',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/formulario',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

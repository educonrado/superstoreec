import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@core/services/guards/admin.guard';
import { LayoutComponent } from '@layout/layout.component';
import { PagenotfoundComponent } from '@shared/components/pagenotfound/pagenotfound.component';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
      },
      {
        path: '',
        component: SkeletonComponent,
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/modules.module').then((m) => m.ModulesModule),
      },
    ],
  },
  {
    path: 'panel',
    canActivate: [AdminGuard],
    loadChildren: () => import('./modules/panel/panel.module').then((m) => m.PanelModule)
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

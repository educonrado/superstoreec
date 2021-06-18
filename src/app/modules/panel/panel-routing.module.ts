import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'create-product',
        component: ProductFormComponent
      },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './components/notification/notification.component';
import { AboutComponent } from './components/about/about.component';
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
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'notification',
        component: NotificationComponent
      },
      {
        path: 'products/create-product/:uid',
        component: ProductFormComponent
      },
      {
        path: 'products/edit-product/:id/:uid',
        component: ProductFormComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '', redirectTo: '/', pathMatch: 'full'
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@modules/material/material.module';
import { PanelRoutingModule } from './panel-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SharedModule } from '@shared/shared.module';
import { AsistentComponent } from './components/asistent/asistent.component';



@NgModule({
  declarations: [
    NavigationComponent, 
    DashboardComponent, 
    ProductsComponent, 
    ProfileComponent, ProductFormComponent, AsistentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    PanelRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PanelModule { }

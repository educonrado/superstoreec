import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@modules/material/material.module';
import { PanelRoutingModule } from './panel-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavigationComponent, 
    DashboardComponent, 
    ProductsComponent, 
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    PanelRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class PanelModule { }

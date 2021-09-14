import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@modules/material/material.module';
import { SkeletonStoreComponent } from './components/skeleton-store/skeleton-store.component';
import { HeaderStoreComponent } from './components/header-store/header-store.component';
import { FooterStoreComponent } from './components/footer-store/footer-store.component';
import { CartStoreComponent } from './components/cart-store/cart-store.component';
import { StoreComponent } from './components/store/store.component';
import { UndefinedStoreComponent } from './components/undefined-store/undefined-store.component';
import { PoliticaPrivacidadComponent } from './components/politica-privacidad/politica-privacidad.component';
import { TerminosServicioComponent } from './components/terminos-servicio/terminos-servicio.component';


@NgModule({
  declarations: [
    StoreComponent,
    SkeletonStoreComponent,
    HeaderStoreComponent,
    FooterStoreComponent,
    CartStoreComponent,
    UndefinedStoreComponent,
    PoliticaPrivacidadComponent,
    TerminosServicioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }

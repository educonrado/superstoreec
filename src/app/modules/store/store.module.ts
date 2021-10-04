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
import { SkeletonUndefinedStoreComponent } from './components/skeleton-undefined-store/skeleton-undefined-store.component';
import { HeaderUndefinedStoreComponent } from './components/header-undefined-store/header-undefined-store.component';
import { ProductStoreComponent } from './components/product-store/product-store.component';
import { ProductStoreDetailsComponent } from './components/product-store-details/product-store-details.component';


@NgModule({
  declarations: [
    StoreComponent,
    SkeletonStoreComponent,
    HeaderStoreComponent,
    FooterStoreComponent,
    CartStoreComponent,
    UndefinedStoreComponent,
    PoliticaPrivacidadComponent,
    TerminosServicioComponent,
    SkeletonUndefinedStoreComponent,
    HeaderUndefinedStoreComponent,
    ProductStoreComponent,
    ProductStoreDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }

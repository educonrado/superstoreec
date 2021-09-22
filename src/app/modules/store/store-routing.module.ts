import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartStoreComponent } from './components/cart-store/cart-store.component';
import { PoliticaPrivacidadComponent } from './components/politica-privacidad/politica-privacidad.component';
import { SkeletonUndefinedStoreComponent } from './components/skeleton-undefined-store/skeleton-undefined-store.component';
import { StoreComponent } from './components/store/store.component';
import { TerminosServicioComponent } from './components/terminos-servicio/terminos-servicio.component';
import { UndefinedStoreComponent } from './components/undefined-store/undefined-store.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
  },
  {
    path: 'cart',
    component: CartStoreComponent,
  },
  {
    path: 'empty',
    component: SkeletonUndefinedStoreComponent,
  },
  {
    path: 'politica-privacidad',
    component: PoliticaPrivacidadComponent,
  },
  {
    path: 'terminos-servicio',
    component: TerminosServicioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}

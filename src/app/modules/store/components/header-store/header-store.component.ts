import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '@core/services/cart/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header-store',
  templateUrl: './header-store.component.html',
  styleUrls: ['./header-store.component.scss']
})
export class HeaderStoreComponent implements OnInit {

  @Input()
  nameStore: string | undefined = '';
  @Input()
  imageStore: string | undefined = '';
  image$: any;
  total$!: Observable<number>;

  constructor(private cartService: CartService) { 
    this.total$ = this.cartService.cart$
      .pipe(map((products) => products.length));
  }

  ngOnInit(): void {
    // TODO Carga asincrona de imagen
    this.image$ = new Observable((obs)=>{
      obs.next(this.imageStore);
    });
  }

}

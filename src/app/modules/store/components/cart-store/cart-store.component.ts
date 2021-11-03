import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '@core/services/cart/cart.service';
import { StoreVerifiedService } from '@core/services/store-verified/store-verified.service';
import { Appsettings } from '@data/constants/appsettings';
import { Product } from '@data/model/product';
import { Store } from '@data/model/store';
import { Order } from '@modules/data/order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart-store',
  templateUrl: './cart-store.component.html',
  styleUrls: ['./cart-store.component.scss'],
})
export class CartStoreComponent implements OnInit {
  productsCart$!: Observable<Product[]>;
  displayedColumns = ['producto', 'precio', 'cantidad', 'total', 'actions'];
  ps: Product[] = [];
  emptyCart = true;
  cantidad = 1;
  compra = true;
  formBuy: FormGroup = new FormGroup({});
  order: Order = {
    buyerName: '',
    buyerPhone: '',
    articles: [],
    seller: {},
    purchaseDate: new Date(),
  };
  smsClient: string | undefined;
  /**
   *
   * @param cartService
   */
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private storeVerifiedService: StoreVerifiedService
  ) {
    this.createFormBuy();
  }

  ngOnInit(): void {
    this.productsCart$ = this.cartService.cart$;
  }

  /**
   *
   * @param index
   */
  public confirmationDelete(index: number): void {
    this.cartService.delete(index);
  }

  public getTotalCost(): any {
    this.productsCart$.subscribe((p) => {
      this.ps = p;
    });
    const res = this.ps
      .map((t) => t.price)
      .reduce((acc, value) => acc + value, 0);
    //var group = _.mapValues()
    return res;
  }

  addItem(): void {
    console.log('Agregando ítem al carrito');
    // TODO obtener product y pasar al addCart
    // this.cartService.addCart();
    this.cantidad += 1;
  }

  removeItem(): void {
    console.log('Removiendo ítem al carrito');
    this.cantidad -= 1;
  }

  comprar(section: string): void {
    this.compra = false;
    window.location.hash = '';
    window.location.hash = section;
  }

  /**
   * TODO crear objeto de tipo pedido
   * @param event
   */
  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.formBuy.valid && this.ps.length > 0) {
      this.createOrder(this.formBuy.value);
      this.storeVerifiedService.store.subscribe((store) => {
        if (store !== undefined) {
          this.createStoreLimit(store);
          this.cartService.createOrder(this.order).then(() => {
            console.log('orden creada correctamente');
            var url = Appsettings.MESSAGE_WHATSAPP_SEND;
           console.log(url);
           
            window.open(url,'_blank')
          });
        }
      });
      // TODO crear insert en base y abrir logica para envío por Whatsapp
      this.cartService.deleteAllItems();
      this.formBuy.reset();
      // {relativeTo: this.route} Mantiene la ruta relativa
      this.router.navigate(['..'], { relativeTo: this.route });
    } else {
      alert('No existe un pedido a procesar!');
      this.formBuy.reset();
    }
  }

  private createOrder(buyer: any) {
    this.order.buyerName = buyer.buyerName;
    this.order.buyerPhone = buyer.buyerPhone;
    this.order.articles = this.ps;
    this.order.purchaseDate = new Date();
  }

  private createStoreLimit(store: Store) {
    this.order.seller.nameStore = store.nameStore;
    this.order.seller.urlStore = store.urlStore;
    this.order.seller.category = store.category;
    this.smsClient = store.messageClients;
    this.order.seller.phoneNumberStore = store.phoneNumberStore;
  }

  private createFormBuy() {
    this.formBuy = this.formBuilder.group({
      buyerName: [null, Validators.required],
      buyerPhone: [
        null,
        [
          Validators.required,
          Validators.pattern('[+0-9]+'),
          Validators.minLength(6),
        ],
      ],
    });
  }
}

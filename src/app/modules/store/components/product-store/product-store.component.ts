import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '@core/services/cart/cart.service';
import { Appsettings } from '@data/constants/appsettings';
import { Product } from '@data/model/product';
import { DialogStoreComponent } from '@shared/components/dialog-store/dialog-store.component';
import { NotificationComponent } from '@shared/components/notification/notification.component';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.scss'],
})
export class ProductStoreComponent {
  @Input()
  product!: Product;
  @Output()
  productClicked: EventEmitter<any> = new EventEmitter();
  today = new Date();

  constructor(
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog,
    private cartService: CartService
  ) {}

  addCart(): void {
    console.log('Agregar al carrito');
    // this.productClicked.emit(this.producto.id);
    this.cartService.addCart(this.product);
  }

  detailsProduct(): void {
    const dialogRef = this.matDialog.open(DialogStoreComponent, {
      panelClass: 'my-class',
      data: {
        title: this.product.title,
        price: this.product.price,
        description: this.product.description,
        image: this.product.image,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addCart();
        this.notification(Appsettings.MESSAGE_PRODUCT_CART);
      }
    });
  }

  /**
   *
   * @param message
   */
  private notification(message: string): void {
    this.matSnackBar.openFromComponent(NotificationComponent, {
      duration: Appsettings.TIME_NOTIFICACION * 1000,
      data: message,
    });
  }
}

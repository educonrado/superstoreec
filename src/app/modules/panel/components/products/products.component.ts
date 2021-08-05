import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@core/services/auth/auth.service';
import { ClientsService } from '@core/services/clients/clients.service';
import { StoreService } from '@core/services/store/store.service';
import { Appsettings } from '@data/constants/appsettings';
import { EXAMPLE_PRODUCTS } from '@data/mocks/products-mock';
import { BodyDialog } from '@data/model/body-dialog';
import { Product } from '@data/model/product';
import { Store } from '@data/model/store';
import User from '@data/model/user';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  displayedColumns = ['image', 'title', 'price', 'action'];
  register = false;
  store$!: Observable<any>;
  products$!: Observable<Product[]>;
  uid: string = '';
  constructor(
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog,
    private authService: AuthService,
    private storeService: StoreService
  ) {
    this.validateStore();
  }

  ngOnInit(): void {}

  private validateStore(): void {
    this.authService.getCurrentUser().then((user: any) => {
      this.storeService.getStore(user.uid);
      this.uid = user.uid;
      this.store$ = this.storeService.store;
      this.store$.subscribe((res: Store) => {
        this.register = res === undefined;
        if (!this.register) {         
          this.storeService.getProducts(user.uid);
          this.products$ = this.storeService.products;
        }
      });
    });
  }

  confirmationDelete(id: string): void {
    const dialogRef = this.matDialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: Appsettings.MESSAGE_PRODUCT,
        body: Appsettings.MESSAGE_PRODUCT_DELETE,
        btn1: Appsettings.BTN_CANCEL,
        btn2: Appsettings.BTN_DELETE,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduct(id);
      }
    });
  }
  private deleteProduct(id: string): void {
    this.notification(Appsettings.MESSAGE_DELETE);
  }
  private notification(message: string): void {
    this.matSnackBar.openFromComponent(NotificationComponent, {
      duration: Appsettings.TIME_NOTIFICACION * 1000,
      data: message,
    });
  }

}

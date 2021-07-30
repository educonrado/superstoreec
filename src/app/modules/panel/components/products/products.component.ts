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

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  displayedColumns = ['image', 'title', 'price', 'action'];

  stores$ = this.storeService.stores;

  constructor(
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog,
    private authService: AuthService,
    private storeService: StoreService
  ) {
    this.validateStore();
  }

  ngOnInit(): void {
    this.products = EXAMPLE_PRODUCTS;
    console.log(this.storeService.getStore("LX0ld88IdTSAM2onP7ZSHPg6Pmf1"));
  }

  private validateStore(): void {
    this.authService.getCurrentUser().then((user: any) => {
      console.log(user.uid);
    });
  }

  crearStore() {
    const store: Store = {
      id: 'edu',
      nameStore: 'studio',
    };

    const nameStore = 'edu-studio';
    this.storeService.createStore(store, nameStore);
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

  ngOnDestroy(): void {
    console.log('Destroy');
  }
}

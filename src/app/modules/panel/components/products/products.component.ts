import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@core/services/auth/auth.service';
import { StoreService } from '@core/services/store/store.service';
import { Appsettings } from '@data/constants/appsettings';
import { Product } from '@data/model/product';
import { Store } from '@data/model/store';
import { DialogPublishComponent } from '@shared/components/dialog-publish/dialog-publish.component';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { Observable } from 'rxjs';

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

  public confirmationDelete(id: string, downloadUrl: string): void {
    const dialogRef = this.matDialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: '',
        body: Appsettings.MESSAGE_PRODUCT_DELETE,
        btn1: Appsettings.BTN_CANCEL,
        btn2: Appsettings.BTN_DELETE,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduct(id, downloadUrl);
      }
    });
  }

  public publishStore(): void {
    const a = 'Tienda de peoe';
    const b = 'https://superstore.web.app/pepe';
    const dialogRef = this.matDialog.open(DialogPublishComponent, {
      width: '400px',
      data: {
        title: Appsettings.MESSAGE_PUBLISH_STORE,
        nameStore: a,
        urStore: b,
        imageStore: 'https://firebasestorage.googleapis.com/v0/b/superstoreec.appspot.com/o/images%2FLX0ld88IdTSAM2onP7ZSHPg6Pmf1%2F1631304118129?alt=media&token=34e7d979-8863-4844-b553-ed0abe931aa0',
        description: 'Todoooooo',
        btn1: Appsettings.BTN_CANCEL,
        btn2: Appsettings.BTN_PUBLISH,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

  private deleteProduct(id: string, downloadUrl: string): void {
    this.storeService.deleteProduct(this.uid, id, downloadUrl);
    this.notification(Appsettings.MESSAGE_DELETE);
  }
  private notification(message: string): void {
    this.matSnackBar.openFromComponent(NotificationComponent, {
      duration: Appsettings.TIME_NOTIFICACION * 1000,
      data: message,
    });
  }
}

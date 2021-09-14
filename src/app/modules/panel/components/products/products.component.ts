import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@core/services/auth/auth.service';
import { StoreVerifiedService } from '@core/services/store-verified/store-verified.service';
import { StoreService } from '@core/services/store/store.service';
import { Appsettings } from '@data/constants/appsettings';
import { Product } from '@data/model/product';
import { StateType, Store } from '@data/model/store';
import { DialogPublishComponent } from '@shared/components/dialog-publish/dialog-publish.component';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  showSpinner = false;
  dataSubject = new BehaviorSubject(null);
  private storeVerified: Store = {};
  constructor(
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog,
    private authService: AuthService,
    private storeService: StoreService,
    private storeVerifiedService: StoreVerifiedService
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
    this.showSpinner = true;
    const dialogRef = this.matDialog.open(DialogPublishComponent, {
      width: '400px',
      data: {
        title: Appsettings.MESSAGE_PUBLISH_STORE,
        nameStore: this.storeService.tienda.nameStore,
        urStore:
          Appsettings.PATH_TIENDA_VERIFIED + this.storeService.tienda.urlStore,
        imageStore: this.storeService.tienda.imageStore,
        description: this.storeService.tienda.description,
        btn1: Appsettings.BTN_CANCEL,
        btn2: Appsettings.BTN_PUBLISH,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createStoreVerified();
        this.storeService.updateStore(this.uid, StateType.PUBLISHED).then().catch((err)=>console.log(err));
      } else {
        this.showSpinner = false;
      }
    });
  }
  private async createStoreVerified(): Promise<void> {
    const store = this.storeService.tienda;
    this.storeVerified.nameStore = store.nameStore;
    this.storeVerified.urlStore = store.urlStore;
    this.storeVerified.imageStore = store.imageStore;
    this.storeVerified.description = store.description;
    this.storeVerified.phoneNumberStore = store.phoneNumberStore;
    // this.storeVerified.socialNetwork = store.socialNetwork;
    this.storeVerified.category = store.category;
    this.storeVerified.state = StateType.PUBLISHED;
    this.storeVerified.memberType = store.memberType;
    const prods = this.storeService.products;
    prods.subscribe((prods) => {
      this.storeVerified.products = prods;
      this.storeVerifiedService
        .createStoreVerified(this.storeVerified.urlStore, this.storeVerified)
        .then()
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.showSpinner = false;
        });
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

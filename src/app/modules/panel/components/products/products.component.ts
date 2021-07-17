import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@core/services/auth/auth.service';
import { Appsettings } from '@data/constants/appsettings';
import { EXAMPLE_PRODUCTS } from '@data/mocks/products-mock';
import { BodyDialog } from '@data/model/body-dialog';
import { Product } from '@data/model/product';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { NotificationComponent } from '@shared/components/notification/notification.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = ['image', 'title', 'price', 'action'];
  constructor(
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {
    this.authService.getCurrentUser().then( (user: any) =>{
      console.log(user.uid);
 
    });
  }
  ngOnInit(): void {
    this.products = EXAMPLE_PRODUCTS;    
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

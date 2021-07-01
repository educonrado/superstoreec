import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { Appsettings } from '@data/constants/appsettings';
import { MemberType, Store } from '@data/model/store';
import { NotificationComponent } from '@shared/components/notification/notification.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formRegistro: FormGroup = new FormGroup({});
  showSpinner = false;
  store: Store = {
    id: '1',
    manager: {
      uid: '',
      name: 'string',
      lastName: 'string',
      email: 'string',
      emailVerified: true,
      password: 'string',
      phoneNumber: 'string',
      photo: 'string',
    },
    category: 'cellphones',
    messageClients: 'Holaaaa',
    phone: '593995000585',
    nameStore: 'Mi',
    products: [],
    memberType: MemberType.FREE,
  };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private matSnackBar: MatSnackBar
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    console.log(this.store);
    
  }

  registrar(event: Event): void {
    event.preventDefault();
    this.showSpinner = true;
    if (this.formRegistro.valid) {
      const value = this.formRegistro.value;
      this.authService
        .createUser(value.email, value.password)
        .then(() => {
          this.router.navigate([Appsettings.RUTA_LOGIN]);
          this.notification(Appsettings.MESSAGE_SUCCESS_REGISTER);
          this.showSpinner = false;
        })
        .catch((err: any) => {
          this.notification(err.message);
          this.formRegistro.reset();
          this.showSpinner = false;
        });
    }
  }

  private notification(message: string): void {
    this.matSnackBar.openFromComponent(NotificationComponent, {
      duration: Appsettings.TIME_NOTIFICACION * 1000,
      data: message,
    });
  }

  private createForm(): void {
    this.formRegistro = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }
}

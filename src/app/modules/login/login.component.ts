import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { ClientsService } from '@core/services/clients/clients.service';
import { Appsettings } from '@data/constants/appsettings';
import User from '@data/model/user';
import { NotificationComponent } from '@shared/components/notification/notification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});
  showSpinner = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private matSnackBar: MatSnackBar,
    private ngZone: NgZone
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  login(event: Event): void {
    // Evita que la página recargue cuando realiza submit
    event.preventDefault();
    if (this.formLogin.valid) {
      this.mostrarSpinner();
      const value = this.formLogin.value;
      this.authService
        .login(value.email, value.password)
        .then(() => {
          this.router.navigate([Appsettings.RUTA_ADMIN]);
          this.ocultarSpinner();
        })
        .catch(() => {
          this.notificationError(Appsettings.MESSAGE_ERROR_LOGIN);
          this.formLogin.reset();
          this.ocultarSpinner();
        })
        .finally(() => this.ocultarSpinner());
    }
  }

  loginGoogle(): void {
    // Service auth
    try {
      this.mostrarSpinner();
      this.authService.loginGoogle().then(() => {
        this.ngZone.run(() => {
          this.router.navigate([Appsettings.RUTA_ADMIN]);
          this.ocultarSpinner();
        });
      });
    } catch (error) {
      this.notificationError(Appsettings.MESSAGE_ERROR_LOGIN);
      this.formLogin.reset();
      this.ocultarSpinner();
    }
  }

  loginMicrosoft(): void {
    try {
      this.authService.loginMicrosoft();
    } catch (error) {
      console.log(error);
    }
  }
  loginFacebook(): void {}

  private notificationError(message: string): void {
    this.matSnackBar.openFromComponent(NotificationComponent, {
      duration: Appsettings.TIME_NOTIFICACION * 1000,
      data: message,
    });
  }

  private createForm(): void {
    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  private ocultarSpinner(): boolean {
    return (this.showSpinner = false);
  }

  private mostrarSpinner(): boolean {
    return (this.showSpinner = true);
  }
}

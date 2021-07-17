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
  userTmp: User = new User();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private matSnackBar: MatSnackBar,
    private clientService: ClientsService,
    private ngZone: NgZone
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  login(event: Event): void {
    // Evita que la página recargue cuando realiza submit
    event.preventDefault();
    if (this.formLogin.valid) {
      this.showSpinner = true;
      const value = this.formLogin.value;
      this.authService
        .login(value.email, value.password)
        .then((user: any) => {
          this.router.navigate([Appsettings.RUTA_ADMIN]);
          this.showSpinner = false;
        })
        .catch(() => {
          this.notificationError(Appsettings.MESSAGE_ERROR_LOGIN);
          this.formLogin.reset();
          this.showSpinner = false;
        });
    }
  }

  loginGoogle(): void {
    // Service auth
    try {
      this.showSpinner = true;
      this.authService.loginGoogle().then((userCredential: any) => {
        const user = userCredential.user;
        this.ngZone.run(()=>{
          this.router.navigate([Appsettings.RUTA_ADMIN]);
          this.createNewClient(user);
          this.showSpinner = false;
        });
      });
    } catch (error) {
      this.notificationError(Appsettings.MESSAGE_ERROR_LOGIN);
      this.formLogin.reset();
      this.showSpinner = false;
    }
  }

  private createNewClient(user: any): void {
    this.authService.getCurrentUser().then( (user: any) =>{
      console.log(user.uid);
 
    }

    );/*
    this.userTmp.email = user.email;
    this.userTmp.emailVerified = user.emailVerified;
    this.userTmp.uid = user.uid;
    this.userTmp.name = user.displayName;
    this.userTmp.phoneNumber = user.phoneNumber;
    this.userTmp.photo = user.photoURL;
    
    this.clientService.createClient(this.userTmp).then((userRegistered: any) => {
      console.log('Usuario creado correctamente'+user);
    });*/
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
}

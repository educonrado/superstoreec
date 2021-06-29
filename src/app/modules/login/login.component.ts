import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { Appsettings } from '@data/constants/appsettings';
import { NotificationComponent } from '@shared/components/notification/notification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});
  showSpinner = false;
  uidUser: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private matSnackBar: MatSnackBar
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  login(event: Event): void {
    // Evita que la página recargue cuando realiza submit
    event.preventDefault();
    this.showSpinner = true;
    if (this.formLogin.valid) {
      const value = this.formLogin.value;
      this.authService
        .login(value.email, value.password)
        .then((user: any) => {
          this.authService.getUid().subscribe(user=>{
            this.uidUser = user?.uid;            
          });
          this.router.navigate([Appsettings.RUTA_ADMIN, this.uidUser]);
          this.showSpinner = false;
        })
        .catch(() => {
          this.notificationError(Appsettings.MESSAGE_ERROR_LOGIN);
          this.formLogin.reset();
          this.showSpinner = false;
        });
    }
    
  }

  private notificationError(message: string): void {
    this.matSnackBar.openFromComponent(NotificationComponent, {
      duration: Appsettings.TIME_NOTIFICACION * 1000,
      data: message
    });
  }

  private createForm(): void {
    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

}

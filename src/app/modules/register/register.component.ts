import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { Appsettings } from '@data/constants/appsettings';
import { NotificationComponent } from '@shared/components/notification/notification.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formRegistro: FormGroup = new FormGroup({});
  showSpinner = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private matSnackBar: MatSnackBar
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

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

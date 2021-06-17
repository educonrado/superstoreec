import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegistro: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  registrar(event: Event): void {
    event.preventDefault();
    if (this.formRegistro.valid) {
      console.log('Usuario registrado correctamente...');
      this.router.navigate(['/user/login']);
    }
  }
  
  private createForm(): void {
    this.formRegistro = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

}

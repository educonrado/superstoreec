import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  urlImage: string = 'https://img.motor16.com/modelos/lamborghini-aventador.jpg';
  profileForm = this.fb.group({
    company: [null, Validators.required],
    firstName: null,
    lastName: null,
    address: [null],
    phone: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    alert('Thanks!');
  }

}

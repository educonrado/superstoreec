import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-asistent',
  templateUrl: './asistent.component.html',
  styleUrls: ['./asistent.component.scss']
})
export class AsistentComponent implements OnInit {

  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.createForm();
  }
  private createForm(): void {
    this.firstFormGroup = this.formBuilder.group({
      nameStore: [null, [Validators.required]],
      nameShortStore: [null, [Validators.required]],
      descriptionStore: null,
      imageStore: null,
    });
    this.secondFormGroup = this.formBuilder.group({
      instructionPay: null,
      direction: null,
      phoneStore: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

}

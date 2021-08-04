import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import { StoreService } from '@core/services/store/store.service';
import { Appsettings } from '@data/constants/appsettings';
import { MemberType, Store } from '@data/model/store';
import User from '@data/model/user';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-asistent',
  templateUrl: './asistent.component.html',
  styleUrls: ['./asistent.component.scss'],
})
export class AsistentComponent implements OnInit {
  store: Store = {};
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  userUID!: string;
  user: User | undefined;
  selectedCategory: string = '';
  categorias: string[] = Appsettings.CATEGORIAS;
  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private authService: AuthService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getUser();
  }

  createStore(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const frm1 = this.firstFormGroup.value;
      const frm2 = this.secondFormGroup.value;
      this.store.nameStore = frm1.nameStore;
      this.store.description = frm1.descriptionStore;
      this.store.urlStore = frm1.nameShortStore;
      this.store.manager = this.userUID;
      this.store.phoneNumberStore = frm2.phoneStore;
      this.store.messageClients = Appsettings.MESSAGE_TMP;
      this.store.category = frm1.categoriaStore;
      this.store.memberType = MemberType.FREE;
      this.store.products = [];

      this.storeService
        .createStore(this.userUID, this.store)
        .then(() => console.log);
    }
  }

  private getUser(): void {
    this.authService.getUid().subscribe((userResponse: any) => {
      this.userUID = userResponse.uid;
      this.user = userResponse;
    });
  }

  private createForm(): void {
    this.firstFormGroup = this.formBuilder.group({
      nameStore: [null, [Validators.required, Validators.minLength(3)]],
      nameShortStore: [
        null,
        [
          Validators.required,
          Validators.pattern('[a-z0-9-]*'),
          Validators.minLength(3),
        ],
      ],
      descriptionStore: null,
      imageStore: null,
      categoriaStore: [null, Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      instructionPay: null,
      direction: null,
      phoneStore: [
        this.user?.phoneNumber,
        [Validators.required, Validators.pattern('[+0-9]+')],
      ],
    });
  }
}

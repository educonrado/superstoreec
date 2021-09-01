import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
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
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-asistent',
  templateUrl: './asistent.component.html',
  styleUrls: ['./asistent.component.scss'],
})
export class AsistentComponent implements OnInit {
  @ViewChild('uploadImage')
  uploadImage!: ElementRef;
  store: Store = {};
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  userUID!: string;
  user: User | undefined;
  selectedCategory: string = '';
  categorias: string[] = Appsettings.CATEGORIAS;
  imageURL: string = '';
  file: any;
  showSpinner = false;
  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private authService: AuthService,
    private angularFirestorage: AngularFireStorage
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getUser();
  }

  createStore(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      this.showSpinner = true;
      this.saveImage(this.file);
    }
  }

  private saveImage(file: any): void {
    this.showSpinner = true;
    const dirTmpImg =
      Appsettings.PATH_STORAGE_IMAGES +
      `${this.userUID}` +
      Appsettings.PATH_LOGO;
    const fileRef = this.angularFirestorage.ref(dirTmpImg);
    const task = this.angularFirestorage.upload(dirTmpImg, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.saveStore(url);
          });
        })
      )
      .subscribe();
  }

  private saveStore(urlStorage: string): void {
    this.firstFormGroup.controls['imageStore'].setValue(urlStorage);
    const frm1 = this.firstFormGroup.value;
    const frm2 = this.secondFormGroup.value;
    this.store.nameStore = frm1.nameStore;
    this.store.description = frm1.description;
    this.store.urlStore = frm1.urlStore;
    this.store.manager = this.user?.displayName
      ? this.user?.displayName
      : this.userUID;
    this.store.phoneNumberStore = frm2.phoneNumberStore;
    this.store.messageClients = Appsettings.MESSAGE_TMP;
    this.store.category = frm1.category;
    this.store.memberType = MemberType.FREE;
    this.store.products = [];
    this.store.imageStore = frm1.imageStore;
    this.storeService
      .createStore(this.userUID, this.store)
      .then(() => console.log)
      .finally(() => (this.showSpinner = false));
  }

  public previewImage(event: any): void {
    this.file = event.target.files[0];
    if (this.file.type.includes('image')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(this.file);
      this.firstFormGroup.controls['imageStore'].setValue(
        this.file ? this.file.name : ''
      );
    } else {
      this.file = null;
      this.imageURL = '';
      this.uploadImage.nativeElement.value = '';
      this.firstFormGroup.controls['imageStore'].setValue('');
      alert('Debe escoger una imagen válida');
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
      urlStore: [
        null,
        [
          Validators.required,
          Validators.pattern('[a-z0-9-]*'),
          Validators.minLength(3),
        ],
      ],
      description: null,
      imageStore: [null, Validators.required],
      category: [null, Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      instructionPay: null,
      direction: null,
      phoneNumberStore: [
        this.user?.phoneNumber,
        [Validators.required, Validators.pattern('[+0-9]+')],
      ],
    });
  }
}

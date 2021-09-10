import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { StoreService } from '@core/services/store/store.service';
import { Appsettings } from '@data/constants/appsettings';
import { Store } from '@data/model/store';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('uploadImage')
  uploadImage!: ElementRef;
  store!: Store;
  categorias = Appsettings.CATEGORIAS;
  profileForm: FormGroup = new FormGroup({});
  imageURL: string = '';
  file: any;
  userUID: string = '';
  showSpinner = false;
  socials!: [];
  image$!: Observable<any>;
  private tmpUrlStore = '';

  /**
   *
   * @param formBuilder
   * @param storeService
   * @param authService
   * @param angularFirestorage
   */
  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private authService: AuthService,
    private angularFirestorage: AngularFireStorage,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {
    this.createFormProfile();
  }

  ngOnInit(): void {
    this.store = this.storeService.tienda;
    if (this.store === undefined) {
      this.redirectTo();
    } else {
      this.profileForm.patchValue(this.store);
      this.tmpUrlStore = this.profileForm.controls['urlStore'].value;
      this.imageURL = this.profileForm.controls['imageStore'].value;
      this.getUser();
    }
  }

  private redirectTo() {
    this.router.navigate([Appsettings.RUTA_ADMIN]);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      if (this.tmpUrlStore === this.profileForm.controls['urlStore'].value) {
        if (this.file) {
          this.updateProfileImage(this.file);
        } else {
          this.updateProfile();
        }
        this.redirectTo();
      } else {
        console.log('Diferente');
      }
    }
  }

  private updateProfile(): void {
    this.storeService.createStore(this.userUID, this.profileForm.value);
    this.notification('Perfil actualizado correctamente');
  }
  private getUser(): void {
    this.authService.getUid().subscribe((userResponse: any) => {
      this.userUID = userResponse.uid;
      this.loadImage(userResponse.uid);
    });
  }

  /**
   *
   * @param file
   */
  private updateProfileImage(file: any): void {
    this.showSpinner = true;
    const dirTmpImg =
      Appsettings.PATH_STORAGE_IMAGES + this.userUID + Appsettings.PATH_LOGO;
    const fileRef = this.angularFirestorage.ref(dirTmpImg);
    const task = this.angularFirestorage.upload(dirTmpImg, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.profileForm.controls['imageStore'].setValue(url);
            try {
              this.updateProfile();
            } catch (error) {
              console.log(error);
            } finally {
              this.showSpinner = false;
            }
          });
        })
      )
      .subscribe();
  }

  /**
   *
   * @param event
   */
  previewImage(event: any): void {
    this.file = event.target.files[0];
    if (this.file.type.includes('image')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
        this.image$ = new Observable<any>();
      };
      reader.readAsDataURL(this.file);
      this.profileForm.controls['imageStore'].setValue(
        this.file ? this.file.name : ''
      );
    } else {
      this.file = null;
      this.imageURL = '';
      this.uploadImage.nativeElement.value = '';
      this.profileForm.controls['imageStore'].setValue('');
      alert('Debe escoger una imagen válida');
    }
  }

  /**
   * Cargar imagen
   */
  public async loadImage(uid: string): Promise<void> {
    const fileRef = this.angularFirestorage.ref(
      'images/' + `${uid}` + '/' + Appsettings.PATH_LOGO
    );
    this.image$ = fileRef.getDownloadURL();
  }

  /**
   *
   * @param message
   */
  private notification(message: string): void {
    this.matSnackBar.openFromComponent(NotificationComponent, {
      duration: Appsettings.TIME_NOTIFICACION * 1000,
      data: message,
    });
  }

  /**
   * TODO Implememtar redes sociales
   */
  private createFormProfile(): void {
    this.profileForm = this.formBuilder.group({
      nameStore: [null, Validators.required],
      urlStore: [
        null,
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9.]*'),
          Validators.minLength(3),
        ],
      ],
      phoneNumberStore: [null, Validators.required],
      manager: [null, Validators.required],
      description: null,
      category: [null, Validators.required],
      socialNetwork: null,
      messageClients: null,
      imageStore: [null, Validators.required],
    });
  }
}

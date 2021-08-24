import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '@core/services/store/store.service';
import { Appsettings } from '@data/constants/appsettings';
import { Product } from '@data/model/product';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @ViewChild('uploadImage')
  uploadImage!: ElementRef;
  productForm: FormGroup = new FormGroup({});
  titulo = false;
  newProduct!: Product;
  image$!: Observable<any>;
  uid: string = '';
  id: string = '';
  dirTmpImg: string = '';
  imageURL: string = '';
  file: any;
  showSpinner = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private router: Router,
    private angularFirestorage: AngularFireStorage
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.uid = this.activatedRoute.snapshot.params.uid;
    if (this.id === undefined) {
      this.titulo = true;
    } else {
      this.titulo = false;
      this.fetchProduct(this.uid, this.id);
    }
  }

  fetchProduct(uid: string, id: string): void {
    this.storeService.getProduct(uid, id).subscribe((prod: Product) => {
      if (prod === undefined) {
        this.redirectAdmin();
      } else {
        this.productForm.patchValue(prod);
        console.log(this.productForm.value);

        this.loadImage();
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.saveProduct(this.file);
    }
  }

  /**
   *
   * @param event
   * TODO minimizar tamaño de imagenes
   */
  private saveProduct(file: any): void {
    this.showSpinner = true;
    this.dirTmpImg = this.createUrlImage();
    console.log(this.dirTmpImg);

    const fileRef = this.angularFirestorage.ref(this.dirTmpImg);
    const task = this.angularFirestorage.upload(this.dirTmpImg, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe((url) => {
            this.productForm.controls['image'].setValue(url);
            try {
              if (this.titulo) {
                this.storeService.saveProduct(this.uid, this.productForm.value);
              } else {
                this.storeService.updateProduct(
                  this.uid,
                  this.id,
                  this.productForm.value
                );
              }
            } catch (error) {
              console.log(error);
            } finally {
              this.redirectAdmin();
              this.showSpinner = false;
            }
          });
        })
      )
      .subscribe();
  }

  private createUrlImage(): string {
    if (this.id === undefined) {
      this.productForm.controls['nameImg'].setValue(Date.now());
    }
    return (
      Appsettings.PATH_STORAGE_IMAGES +
      `${this.uid}/${this.productForm.get('nameImg')?.value}`
    );
  }

  public previewImage(event: any): void {
    this.file = event.target.files[0];
    if (this.file.type.includes('image')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(this.file);
      this.productForm.controls['image'].setValue(
        this.file ? this.file.name : ''
      );
    } else {
      this.file = null;
      this.imageURL = '';
      this.uploadImage.nativeElement.value = '';
      this.productForm.controls['image'].setValue('');
      alert('Debe escoger una imagen válida');
    }
  }

  /**
   * Primera forma de cargar imagen
   */
  public loadImage(): void {
    const fileRef = this.angularFirestorage.ref(
      'images/' + this.uid + '/' + this.id
    );
    this.image$ = fileRef.getDownloadURL();
  }

  public cancel(): void {
    this.redirectAdmin();
  }

  private redirectAdmin(): void {
    this.router.navigate([Appsettings.RUTA_ADMIN]);
  }

  private createForm(): void {
    this.productForm = this.formBuilder.group({
      title: [null, Validators.required],
      price: [
        null,
        [Validators.required, Validators.min(1), Validators.maxLength(10)],
      ],
      description: [null, Validators.required],
      image: [null, Validators.required],
      nameImg: null,
    });
  }
}

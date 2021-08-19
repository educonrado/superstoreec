import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '@core/services/products.service';
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
  productForm: FormGroup = new FormGroup({});
  titulo = false;
  newProduct!: Product;
  image$!: Observable<any>;
  uid: string = '';
  id: string = '';
  dirTmpImg: string = '';
  imageURL: string='';
  file: any= '';

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
        //this.loadImage();
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.titulo) {
        try {
          this.uploadFile(this.file);
          this.storeService.saveProduct(this.uid, this.productForm.value);
        } catch (error) {
          console.log(error);
        } finally {
          this.redirectAdmin();
        }
      } else {
        try {
          this.storeService.updateProduct(
            this.uid,
            this.id,
            this.productForm.value
          );
        } catch (error) {
          console.log(error);
        } finally {
          this.redirectAdmin();
        }
      }
    }
  }

  public showPreview(event: any):void {
    this.file = event.target.files[0];
    this.productForm.patchValue({
      image: this.file
    });
    this.productForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(this.file);
    
  }

  private uploadFile(file: any): void {    
    this.dirTmpImg = 'images/' + Math.floor(Math.random() * 999999);
    console.log(this.dirTmpImg);
    /*
    const fileRef = this.angularFirestorage.ref(this.dirTmpImg);
    const task = this.angularFirestorage.upload(this.dirTmpImg, file);
    this.productForm.controls['image'].setValue(file ? file.name : '');
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe((url) => {
            this.productForm.get('image')?.setValue(url);
          });
        })
      )
      .subscribe();*/
  }
/*
  public loadImage() {
    const fileRef = this.angularFirestorage.ref('img-'+this.id);
    this.image$ = fileRef.getDownloadURL();
  }*/

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
    });
  }
}

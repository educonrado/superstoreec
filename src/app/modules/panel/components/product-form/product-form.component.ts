import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '@core/services/products.service';
import { StoreService } from '@core/services/store/store.service';
import { Product } from '@data/model/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  titulo = false;
  newProduct!: Product;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.params.id;
    console.log(id);
    if (id === undefined) {
      this.titulo = true;
    } else {
      this.titulo = false;
      this.fetchProduct(id);
    }
  }
  fetchProduct(id: string): void {
    console.log('Consultando un producto');
    this.storeService.getProduct('LX0ld88IdTSAM2onP7ZSHPg6Pmf1',id);
    
  }

  onSubmit(): void {
    if (this.productForm.valid) {
     this.storeService.saveProduct(this.productForm.value);
     
    }
  }

  private createForm(): void {
    this.productForm = this.formBuilder.group({
      id: null,
      title: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      description: [null, Validators.required],
      images: null,
    });
  }
}

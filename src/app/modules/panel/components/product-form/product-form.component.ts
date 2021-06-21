import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '@core/services/products.service';
import { Product } from '@data/model/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  titulo=false;
  newProduct!: Product;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.params.id;
    if (id === undefined) {
      this.titulo = true;
    } else {
      this.titulo = false;
      this.fetchProduct(id);
      
    }
  }
  fetchProduct(id: string): void {
    this.productForm = this.formBuilder.group({
      id: this.productService.getProduct(id)?.id,
      title: this.productService.getProduct(id)?.title,
      price:this.productService.getProduct(id)?.price,
      description: this.productService.getProduct(id)?.description,
      images: null,
    });
  }

  onSubmit(): void {
    alert('Thanks!');
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

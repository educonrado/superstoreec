import { Component, OnInit } from '@angular/core';
import { EXAMPLE_PRODUCTS } from '@data/mocks/products-mock';
import { Product } from '@data/model/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  displayedColumns = [ 'image', 'title', 'price', 'action'];
  constructor() {}
  ngOnInit(): void {
    this.products = EXAMPLE_PRODUCTS;
  }
}

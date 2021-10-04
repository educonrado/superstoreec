import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@data/model/product';

@Component({
  selector: 'app-product-store-details',
  templateUrl: './product-store-details.component.html',
  styleUrls: ['./product-store-details.component.scss']
})
export class ProductStoreDetailsComponent implements OnInit {

  @Input()
  product!: Product;
  constructor() { }

  ngOnInit(): void {
  }

}

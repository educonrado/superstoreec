import { Injectable } from '@angular/core';
import { EXAMPLE_PRODUCTS } from '@data/mocks/products-mock';
import { Product } from '@data/model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  
  listProducts: Product[] = EXAMPLE_PRODUCTS;
  constructor() {}

  saveProduct() {
    
  }
  
  fetchProduct(id: string) {}
  getProduct(id: string) {
    // return this.http.get<Product>(`${environment.url_api}${id}`);
    // return this.listProducts.find((prod) => prod.id === parseInt(id));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  uri: string = 'http://localhost:4000/product';
  constructor(private http: HttpClient) { }
  getProducts() {
    return this.http.get(`${this.uri}/get`);
  }
  getProductById(id: string) {
    return this.http.get(`${this.uri}/${id}`);
  }
  addProducts(product: object) {
    return this.http.post(`${this.uri}/add-product`, product);
  }
  deleteProduct(id: string) {
    return this.http.get(`${this.uri}/delete-product/${id}`)
  }
}

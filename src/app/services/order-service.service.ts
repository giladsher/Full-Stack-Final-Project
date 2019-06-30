import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  uri: string = 'http://localhost:4000/order'
  constructor(private http: HttpClient) { }

  sendOrder(cart) {
    let token = localStorage.getItem('token');
    return this.http.post(`${this.uri}/add`, {cart : cart, token : token});
  }
  getOrder(id) {
    return this.http.get(`${this.uri}/${id}`);
  }
}
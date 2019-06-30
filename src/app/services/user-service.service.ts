import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri: String = 'http://localhost:4000/user';
  constructor(private http: HttpClient) { }

  signUp(user) {
    return this.http.post(`${this.uri}/sign-up`, user);
  }
  logIn(user) {
    return this.http.post(`${this.uri}/log-in`, user);
  }
}

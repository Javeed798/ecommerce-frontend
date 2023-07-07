import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { Product } from '../_model/product.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  // it means that the login doesnt need any jwt token
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  public API_END_POINT = 'http://localhost:9090';

  public login(loginData: any) {
    return this.http.post<Product>(
      `${this.API_END_POINT}/authenticate`,
      loginData,
      {
        headers: this.requestHeader,
      }
    );
  }

  public forUser() {
    return this.http.get(`${this.API_END_POINT}/forUser`, {
      responseType: 'text',
    });
  }

  public forAdmin() {
    return this.http.get(`${this.API_END_POINT}/forAdmin`, {
      responseType: 'text',
    });
  }

  public register(registerData: any) {
    return this.http.post(
      'http://localhost:9090/registerNewUser',
      registerData
    );
  }

  public roleMatch(allowedRoles: any): any {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}

import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    constructor(private router: Router) { }

    public CheckLogin(): boolean {
        let status = false;
        if (localStorage.getItem('isLoggedIn') == "true") {
          var abc = this.GetToken();
          if (this.CheckTokenExpired(this.GetToken())) {
            status = false;
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('token');
          } else {
            status = true;
          }
        }
        else {
          status = false;
        }
        return status;
      }

      public CheckTokenExpired(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
      }

      public GetToken(): string {
        let token = localStorage.getItem('token');
        if (token != null) {
          return token;
        } else {
          return "";
        }
      }
  }
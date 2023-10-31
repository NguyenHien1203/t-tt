import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    constructor(private router: Router,private cookieService: CookieService) { }

    public CheckLogin(): boolean {
        let status = false;

        if (this.cookieService.get('isLoggedIn') == "true") {
          if (this.CheckTokenExpired(this.GetToken())) {
            status = false;
            this.cookieService.set('isLoggedIn', 'false');
            this.cookieService.delete('token');
            this.cookieService.delete('mUserInfo');

          } else {
            status = true;
          }
        }
        else {
          status = false;
        }
 
        //Dùng localStorrage
        // if (localStorage.getItem('isLoggedIn') == "true") {
        //   if (this.CheckTokenExpired(this.GetToken())) {
        //     status = false;
        //     localStorage.setItem('isLoggedIn', 'false');
        //     localStorage.removeItem('token');
        //   } else {
        //     status = true;
        //   }
        // }
        // else {
        //   status = false;
        // }
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
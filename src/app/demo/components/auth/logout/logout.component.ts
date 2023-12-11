import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent {

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.DangXuat();
  }

  public DangXuat(): void {
    this.cookieService.set('isLoggedIn', 'false');
    this.cookieService.delete('token');
    this.cookieService.delete('mUserInfo');
    this.cookieService.delete('idDonViLamViec');
    this.router.navigate(['/login']);
    // localStorage.setItem('isLoggedIn', 'false');
    // localStorage.removeItem('token');
    // this.router.navigate(['/login']);
  }

}

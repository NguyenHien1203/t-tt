import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.DangXuat();
  }

  public DangXuat(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

}

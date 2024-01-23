import { DangNhapService } from 'src/app/demo/service/he-thong/dang-nhap.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/common/auth.services';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
})
export class LogoutComponent {
    constructor(
        private router: Router,
        private cookieService: CookieService,
        private dangNhapService: DangNhapService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.DangXuat();
    }

    public DangXuat(): void {
        this.dangNhapService // thu hồi refreshtoken
            .RefreshTokenRevoke(this.authService.GetmUserInfo()?.userId ?? '0')
            .then((data) => data);
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

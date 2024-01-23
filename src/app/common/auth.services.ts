import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { mUserInfo } from '../models/common/mUserInfo';
import { DangNhapService } from '../demo/service/he-thong/dang-nhap.service';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private router: Router,
        private cookieService: CookieService,
        private dangNhapService: DangNhapService
    ) {}

    public CheckLogin(): boolean {
        let status = false;
        if (this.cookieService.get('isLoggedIn') == 'true') {
            if (this.CheckTokenExpired(this.GetToken())) {//false
                const uid = this.GetmUserInfo()?.userId ?? '0';
                const refreshToken =
                    this.GetmUserInfo()?.tokensUser?.refreshToken ?? '0';
                const itemData = {
                    userId: uid.toString(),
                    refreshToken: refreshToken,
                };
                this.dangNhapService.RefreshToken(itemData).then((data) => {
                    // Làm mới token thành công, lưu token mới và thiết lập trạng thái đăng nhập
                    if (!data.isError) {
                        this.cookieService.set('token', data.objData);
                        status = true;
                    } else {
                        status = false;
                        this.cookieService.set('isLoggedIn', 'false');
                        this.cookieService.delete('token');
                        this.cookieService.delete('mUserInfo');
                        this.cookieService.delete('idDonViLamViec');
                    }
                });
            } else {
                status = true;
            }
        } else {
            status = false;
        }
        return status;
    }

    public CheckTokenExpired(token: string) {
        const expiry = JSON.parse(atob(token.split('.')[1])).exp;
        return Math.floor(new Date().getTime() / 1000) >= expiry;
    }

    public GetToken(): string {
        let token = this.cookieService.get('token');
        if (token != null) {
            return token;
        } else {
            return '';
        }
    }

    public GetmUserInfo(): mUserInfo {
        if (this.cookieService.get('mUserInfo')) {
            const mUser: mUserInfo = JSON.parse(
                this.cookieService.get('mUserInfo')
            );
            return mUser;
        }
        return null;
    }

    public GetDonViLamViec(): string {
        if (this.cookieService.get('idDonViLamViec')) {
            const DonViLamViec = this.cookieService.get('idDonViLamViec');
            return DonViLamViec;
        }
        return null;
    }

    public checkLoginAndNavigate(): void {
        if (!this.CheckLogin()) {
            this.router.navigate(['/login']);
        }
    }
}

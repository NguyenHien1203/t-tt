import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { mUserInfo } from '../models/common/mUserInfo';
import { DangNhapService } from '../demo/service/he-thong/dang-nhap.service';
import { environment } from 'src/environments/environment.development';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private router: Router,
        private cookieService: CookieService,
        private dangNhapService: DangNhapService,
        private httpClient: HttpClient
    ) {}

    public async CheckLogin(): Promise<boolean> {
        let status = false;
        if (this.cookieService.get('isLoggedIn') == 'true') {
            const token = this.GetToken();
            if (token && !this.CheckTokenExpired(token)) {
                return true;
            }
            const refreshThreshold = 1 * 30 * 1000; //30 second
            const tokenExpirationDate = this.GetTokenExpirationDate(
                this.GetToken()
            );
            if (
                tokenExpirationDate &&
                tokenExpirationDate - new Date().getTime() < refreshThreshold
            ) {
            }

            let itemData = {
                userId: (this.GetmUserInfo()?.userId ?? '0').toString(),
                refreshToken:
                    this.GetmUserInfo()?.tokensUser?.refreshToken ?? '',
            };
            const response = await this.dangNhapService.RefreshToken(itemData);
            if (!response.isError) {
                status = true;
                this.cookieService.set('token', response.objData);
            } else {
                status = false;
                this.DeleteCokie();
            }
        } else {
            status = false;
        }
        return status;
    }

    public DeleteCokie() {
        this.cookieService.set('isLoggedIn', 'false');
        this.cookieService.delete('token');
        this.cookieService.delete('mUserInfo');
        this.cookieService.delete('idDonViLamViec');
    }

    public RefreshToken() {
        let itemData = {
            userId: (this.GetmUserInfo()?.userId ?? '0').toString(),
            refreshToken: this.GetmUserInfo()?.tokensUser?.refreshToken ?? '0',
        };
        const url = environment.baseUrlApi + '/Membership/RefreshToken';
        return this.httpClient.post<any>(url, itemData, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        });
    }

    public CheckTokenExpired(token: string) {
        const expiry = JSON.parse(atob(token.split('.')[1])).exp;
        return Math.floor(new Date().getTime() / 1000) >= expiry;
    }

    public GetTokenExpirationDate(token: string) {
        return JSON.parse(atob(token.split('.')[1])).exp;
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

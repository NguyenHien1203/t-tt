import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class DoiMatKhauService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private router: Router
    ) {}

    doiMatKhau(itemData: any) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/DoiMatKhau/ThayDoiMatKhau',
            itemData,
            this.httpOption
        );
    }
}

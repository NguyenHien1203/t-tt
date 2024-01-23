import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ThayDoiThongTinService {
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

    getThongTinNguoiDung(id: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/ThayDoiThongTin/GetThongTinUser/' +
                    id
            )
            .toPromise()
            .then((data) => data.objData);
    }

    thayDoiThongTin(itemData: any) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/ThayDoiThongTin/CapNhatThongTin',
            itemData,
            this.httpOption
        );
    }

    getAnh(filePath: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.get(
            environment.baseUrlApi +
                '/HeThong/ThayDoiThongTin/GetImage?filePath=' +
                filePath,
            { responseType: 'blob' }
        );
    }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemQuanTriLich } from 'src/app/models/thong-tin-khac/lich/quan-tri-lich';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class QuanTriLichService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private router: Router
    ) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
    }

    getDanhSachQuanTriLich(timKiemDanhSach: TimKiemQuanTriLich) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/Lich/QuanTriLich/GetDanhSachQuanTriLich',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getCurrentWeekAndYear(tuan: number, nam: number) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/Lich/QuanTriLich/CauHinhQuanTriLich?tuan=' +
                    tuan +
                    '&nam=' +
                    nam,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getQuanTriLichById(idQuanTriLich: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/Lich/QuanTriLich/GetQuanTriLichById/' +
                    idQuanTriLich,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    capNhatQuanTriLich(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/Lich/QuanTriLich/CapNhatQuanTriLich',
            itemData,
            this.httpOption
        );
    }

    themMoiQuanTriLich(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/Lich/QuanTriLich/ThemMoiQuanTriLich',
            itemData,
            this.httpOption
        );
    }

    xoaQuanTriLich(idQuanTriLich: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/Lich/QuanTriLich/XoaQuanTriLich/' +
                idQuanTriLich,
            this.httpOption
        );
    }

    xuLyQuanTriLich(idQuanTriLich: string, action: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/Lich/QuanTriLich/XuLyQuanTriLich?idQuanTriLich=' +
                idQuanTriLich +
                '&action=' +
                action,
            this.httpOption
        );
    }
}

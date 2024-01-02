import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemQuanLyDatLaiMatKhau } from 'src/app/models/he-thong/quan-ly-dat-lai-mat-khau';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class QuanLyDatLaiMatKhauService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSach(timKiemDanhSach: TimKiemQuanLyDatLaiMatKhau) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HeThong/QuanLyDatLaiMatKhau/GetDanhSach',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    xuLyYeuCau(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/QuanLyDatLaiMatKhau/XuLyYeuCau',
            itemData,
            this.httpOption
        );
    }

    kiemTraTaiKhoan(userName: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/QuanLyDatLaiMatKhau/KiemTraTaiKhoan/' +
                    userName,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    guiYeuCauDatLai(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HeThong/QuanLyDatLaiMatKhau/GuiYeuCauDatLai',
            itemData,
            this.httpOption
        );
    }
}

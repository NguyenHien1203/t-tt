import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemXuLyCongViec } from 'src/app/models/thong-ke/xu-ly-cong-viec';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class XuLyCongViecService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) {}

    getDanhSachXuLyCongViec(timKiemDanhSach: TimKiemXuLyCongViec) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/CongViec/XuLyCongViec/GetDanhSachXuLyCongViec',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
    
    getDanhSachHoSoCongViec(timKiemDanhSach: TimKiemXuLyCongViec) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/CongViec/XuLyCongViec/GetDanhSachHoSoCongViec',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    KiemTraUserThuocNhomNguoiDung(idUser : string, idDonVi : string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/CongViec/XuLyCongViec/KiemTraUserThuocNhomNguoiDung?idUser=' +idUser+ "&idDonVi="+ idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
}

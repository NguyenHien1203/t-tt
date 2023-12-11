import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemQuanLyHoSoCaNhan } from 'src/app/models/ho-so-cong-viec/quan-ly-ho-so-ca-nhan';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class QuanLyHoSoCaNhanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachHoSoCaNhan(timKiemDanhSach: TimKiemQuanLyHoSoCaNhan) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCaNhan/GetDanhSachHoSoCaNhan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachLoaiHoSo(idDonVi: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCaNhan/GetDanhSachLoaiHoSo/' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachChonVanBan(timKiemDanhSach: any) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCaNhan/GetDanhSachChonVanBan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachChonCongViec(timKiemDanhSach: any) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCaNhan/GetDanhSachChonCongViec',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachChonPhieuTrinh(timKiemDanhSach: any) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCaNhan/GetDanhSachChonPhieuTrinh',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getHoSoCaNhanId(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCaNhan/GetHoSoCaNhanById/' +
                    id
            )
            .toPromise()
            .then((data) => data.objData);
    }

    themMoiHoSoCaNhan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/QuanLyHoSoCaNhan/ThemMoiHoSoCaNhan',
            itemData,
            this.httpOption
        );
    }

    capNhatHoSoCaNhan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/QuanLyHoSoCaNhan/CapNhatHoSoCaNhan',
            itemData,
            this.httpOption
        );
    }

    xoaHoSoCaNhan(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/QuanLyHoSoCaNhan/XoaHoSoCaNhan/' +
                id
        );
    }
}

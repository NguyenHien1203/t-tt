import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemNhomTaiKhoan } from 'src/app/models/he-thong/nhom-tai-khoan-phong-ban';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class NhomTaiKhoanCaNhanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachTaiKhoanCaNhan(timKiemDanhSach: TimKiemNhomTaiKhoan) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanCaNhan/GetDanhSachNhomTaiKhoanCaNhan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getTaiKhoanCaNhanById(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanCaNhan/GetNhomTaiKhoanCaNhanById/' +
                    id,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getThongTinCaNhan(idDonViLamViec: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanCaNhan/GetThongTinCaNhan/' +
                    idDonViLamViec,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getDanhSachCaNhanDaThem(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanCaNhan/GetDanhSachCaNhanDaThem/' +
                    id,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    changePhongBan(idPhongBan: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanCaNhan/GetDanhSachCaNhanThuocPhongBan/' +
                    idPhongBan,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    themMoiCaNhan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HeThong/NhomTaiKhoanCaNhan/ThemMoiNguoiDung',
            itemData,
            this.httpOption
        );
    }

    getThuTu(idPhongBan: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanCaNhan/GetSoThuTu/' +
                    idPhongBan,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    themMoiTaiKhoanCaNhan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HeThong/NhomTaiKhoanCaNhan/ThemMoiNhomTaiKhoanCaNhan',
            itemData,
            this.httpOption
        );
    }

    capNhatTaiKhoanCaNhan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HeThong/NhomTaiKhoanCaNhan/CapNhatNhomTaiKhoanCaNhan',
            itemData,
            this.httpOption
        );
    }

    xoaTaiKhoanCaNhan(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HeThong/NhomTaiKhoanCaNhan/XoaNhomTaiKhoanCaNhan/' +
                id,
            this.httpOption
        );
    }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemNhomTaiKhoan } from 'src/app/models/he-thong/nhom-tai-khoan-phong-ban';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class NhomTaiKhoanDonViService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachTaiKhoanDonVi(timKiemDanhSach: TimKiemNhomTaiKhoan) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanDonVi/GetDanhSachNhomTaiKhoanDonVi',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getTaiKhoanDonViById(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanDonVi/GetNhomTaiKhoanDonViById/' +
                    id,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getThongTinDonVi(idDonViLamViec: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanDonVi/GetThongTinDonVi/' +
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
                    '/HeThong/NhomTaiKhoanDonVi/GetDanhSachCaNhanDaThem/' +
                    id,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    changePhongBan(idDonVi: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanDonVi/GetDanhSachCaNhanThuocPhongBan/' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getDanhSachDonVi() {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanDonVi/GetTreeDonVi',
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    themMoiCaNhan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HeThong/NhomTaiKhoanDonVi/ThemMoiNguoiDung',
            itemData,
            this.httpOption
        );
    }

    getThuTu(idDonVi: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanDonVi/GetSoThuTu/' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    themMoiTaiKhoanDonVi(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HeThong/NhomTaiKhoanDonVi/ThemMoiNhomTaiKhoanDonVi',
            itemData,
            this.httpOption
        );
    }

    capNhatTaiKhoanDonVi(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HeThong/NhomTaiKhoanDonVi/CapNhatNhomTaiKhoanDonVi',
            itemData,
            this.httpOption
        );
    }

    xoaTaiKhoanDonVi(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HeThong/NhomTaiKhoanDonVi/XoaNhomTaiKhoanDonVi/' +
                id,
            this.httpOption
        );
    }
}

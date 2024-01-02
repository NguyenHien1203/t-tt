import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemNhomTaiKhoan } from 'src/app/models/he-thong/nhom-tai-khoan-phong-ban';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class NhomTaiKhoanChungService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachTaiKhoanChung(timKiemDanhSach: TimKiemNhomTaiKhoan) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanChung/GetDanhSachNhomTaiKhoanChung',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getTaiKhoanChungById(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanChung/GetNhomTaiKhoanChungById/' +
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
                    '/HeThong/NhomTaiKhoanChung/GetThongTinDonVi/' +
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
                    '/HeThong/NhomTaiKhoanChung/GetDanhSachCaNhanDaThem/' +
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
                    '/HeThong/NhomTaiKhoanChung/GetDanhSachCaNhanThuocPhongBan/' +
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
                    '/HeThong/NhomTaiKhoanChung/GetTreeDonVi',
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    themMoiCaNhan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HeThong/NhomTaiKhoanChung/ThemMoiNguoiDung',
            itemData,
            this.httpOption
        );
    }

    getThuTu(idDonVi: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanChung/GetSoThuTu/' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    themMoiTaiKhoanChung(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HeThong/NhomTaiKhoanChung/ThemMoiNhomTaiKhoanChung',
            itemData,
            this.httpOption
        );
    }

    capNhatTaiKhoanChung(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HeThong/NhomTaiKhoanChung/CapNhatNhomTaiKhoanChung',
            itemData,
            this.httpOption
        );
    }

    xoaTaiKhoanChung(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HeThong/NhomTaiKhoanChung/XoaNhomTaiKhoanChung/' +
                id,
            this.httpOption
        );
    }
}

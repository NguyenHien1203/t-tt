import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemNhomTaiKhoan } from 'src/app/models/he-thong/nhom-tai-khoan-phong-ban';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class NhomTaiKhoanPhongBanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachTaiKhoanPhongBan(timKiemDanhSach: TimKiemNhomTaiKhoan) {
        return this.http
            .post<any>(
                environment.baseUrlApi + '/HeThong/NhomTaiKhoanPhongBan/GetDanhSachNhomTaiKhoanPhongBan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getTaiKhoanPhongBanById(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanPhongBan/GetTaiKhoanPhongBanById/' +
                    id,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }
    
    getThuTu(idPhongBan: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanPhongBan/GetSoThuTu/' +
                    idPhongBan,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    themMoiTaiKhoanPhongBan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/NhomTaiKhoanPhongBan/ThemMoiNhomTaiKhoanPhongBan',
            itemData,
            this.httpOption
        );
    }

    capNhatTaiKhoanPhongBan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/NhomTaiKhoanPhongBan/CapNhatNhomTaiKhoanPhongBan',
            itemData,
            this.httpOption
        );
    }

    xoaTaiKhoanPhongBan(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi + '/HeThong/NhomTaiKhoanPhongBan/XoaNhomTaiKhoanPhongBan/' + id,
            this.httpOption
        );
    }
}

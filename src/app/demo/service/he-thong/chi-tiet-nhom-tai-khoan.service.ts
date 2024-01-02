import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ChiTietNhomTaiKhoanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachNguoiDungTrongNhom(id : string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanPhongBan/GetDanhSachNguoiDungTrongNhom/' +
                    id,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }
}

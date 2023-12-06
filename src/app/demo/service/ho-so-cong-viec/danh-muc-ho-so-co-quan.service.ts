import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemDanhMucHoSoCoQuan } from 'src/app/models/ho-so-cong-viec/danh-muc-ho-so-co-quan';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class DanhMucHoSoCoQuanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachDanhMucHoSoCoQuan(idDonVi: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/DanhMucHoSoCoQuan/GetDanhMucHoSoCoQuan/' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhMucHoSoCoQuanId(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/DanhMucHoSoCoQuan/GetDanhMucHoSoCoQuanById/' +
                    id
            )
            .toPromise()
            .then((res) => res.objData);
    }

    themMoiDanhMucHoSoCoQuan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/DanhMucHoSoCoQuan/ThemMoiDanhMucHoSoCoQuan',
            itemData,
            this.httpOption
        );
    }

    capNhatDanhMucHoSoCoQuan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/DanhMucHoSoCoQuan/CapNhatDanhMucHoSoCoQuan',
            itemData,
            this.httpOption
        );
    }

    xoaDanhMucHoSoCoQuan(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/DanhMucHoSoCoQuan/XoaDanhMucHoSoCoQuan/' +
                id
        );
    }
}

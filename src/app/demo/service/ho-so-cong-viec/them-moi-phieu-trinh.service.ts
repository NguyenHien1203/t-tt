import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemPhieuTrinh } from 'src/app/models/ho-so-cong-viec/them-moi-phieu-trinh';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ThemMoiPhieuTrinhService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachPhieuTrinh(timKiemDanhSach: TimKiemPhieuTrinh) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/PhieuTrinh/GetDanhSachPhieuTrinh',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getPhieuTrinhId(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/PhieuTrinh/GetPhieuTrinhById/' +
                    id
            )
            .toPromise()
            .then((res) => res.objData);
    }

    themMoiPhieuTrinh(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/PhieuTrinh/ThemMoiPhieuTrinh',
            itemData,
            this.httpOption
        );
    }

    capNhatPhieuTrinh(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/PhieuTrinh/CapNhatPhieuTrinh',
            itemData,
            this.httpOption
        );
    }

    xoaPhieuTrinh(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/PhieuTrinh/XoaPhieuTrinh/' +
                id
        );
    }
}

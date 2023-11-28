import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemChuyenMucCauHoi } from 'src/app/models/thong-tin-khac/quan-ly-chuyen-muc-cau-hoi';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class QuanLyChuyenMucCauHoiService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachChuyenMucCauHoi(timKiemDanhSach: TimKiemChuyenMucCauHoi) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/QuanLyChuyenMucCauHoi/GetDanhSach',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
    getChuyenMucCauHoiById(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/QuanLyChuyenMucCauHoi/GetDanhMucChuyenMucCauHoiById/' +
                    id
            )
            .toPromise()
            .then((res) => res.objData);
    }

    themMoiChuyenMucCauHoi(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyChuyenMucCauHoi/ThemMoiChuyenMucCauHoi',
            itemData,
            this.httpOption
        );
    }

    capNhatChuyenMucCauHoi(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyChuyenMucCauHoi/CapNhatChuyenMucCauHoi',
            itemData,
            this.httpOption
        );
    }

    xoaChuyenMucCauHoi(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyChuyenMucCauHoi/XoaChuyenMucCauHoi/' +
                id
        );
    }
}

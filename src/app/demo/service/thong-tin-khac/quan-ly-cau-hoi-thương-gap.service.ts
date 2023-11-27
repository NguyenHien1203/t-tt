import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemCauHoiThuongGap } from 'src/app/models/thong-tin-khac/quan-ly-cau-hoi-thuong-gap';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class QuanLyCauHoiThươngGapService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachQuanLyCauHoiThuongGap(
        timKiemDanhSach: TimKiemCauHoiThuongGap
    ) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/QuanLyCauHoiThuongGap/GetDanhSach',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
    getCauHoiThuongGapById(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/QuanLyCauHoiThuongGap/GetCauHoiThuongGapById/' +
                    id
            )
            .toPromise()
            .then((res) => res.objData);
    }

    themMoiCauHoiThuongGap(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyCauHoiThuongGap/ThemMoiCauHoiThuongGap',
            itemData,
            this.httpOption
        );
    }

    capNhatCauHoiThuongGap(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyCauHoiThuongGap/CapNhatCauHoiThuongGap',
            itemData,
            this.httpOption
        );
    }

    xoaCauHoiThuongGap(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyCauHoiThuongGap/XoaCauHoiThuongGap/' +
                id
        );
    }
}

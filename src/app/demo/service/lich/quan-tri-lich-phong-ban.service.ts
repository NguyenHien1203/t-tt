import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemQuanTriLichPhongBan } from 'src/app/models/thong-tin-khac/lich/quan-tri-lich-phong-ban';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class QuanTriLichPhongBanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachQuanTriLichPhongBan(
        timKiemDanhSach: TimKiemQuanTriLichPhongBan
    ) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/Lich/QuanTriLichPhongBan/GetDanhSachQuanTriLichPhongBan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getCurrentWeekAndYear(tuan: number, nam: number) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/Lich/QuanTriLichPhongBan/CauHinhQuanTriLichPhongBan?tuan=' +
                    tuan +
                    '&nam=' +
                    nam,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getQuanTriLichPhongBanById(idQuanTriLichPhongBan: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/Lich/QuanTriLichPhongBan/GetQuanTriLichPhongBanById/' +
                    idQuanTriLichPhongBan,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    capNhatQuanTriLichPhongBan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/Lich/QuanTriLichPhongBan/CapNhatQuanTriLichPhongBan',
            itemData,
            this.httpOption
        );
    }

    themMoiQuanTriLichPhongBan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/Lich/QuanTriLichPhongBan/ThemMoiQuanTriLichPhongBan',
            itemData,
            this.httpOption
        );
    }

    xoaQuanTriLichPhongBan(idQuanTriLichPhongBan: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/Lich/QuanTriLichPhongBan/XoaQuanTriLichPhongBan/' +
                idQuanTriLichPhongBan,
            this.httpOption
        );
    }

    getDanhSachLichThuDaThem(tuNgay: string, denNgay: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/Lich/QuanTriLichPhongBan/GetDanhSachLichThuDaThem?tuNgay=' +
                    tuNgay +
                    '&denNgay=' +
                    denNgay,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }
}

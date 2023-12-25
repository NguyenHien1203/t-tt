import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemNhan } from 'src/app/models/he-thong/quan-ly-nhan';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class QuanLyNhanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachNhan(timKiemDanhSach: TimKiemNhan) {
        return this.http
            .post<any>(
                environment.baseUrlApi + '/HeThong/QuanLyNhan/GetDanhSachNhan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }
    
    getDanhSachNhanCha(idUser: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi + '/HeThong/QuanLyNhan/GetDanhSachNhanCha/' + idUser,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }
    
    getNhanById(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi + '/HeThong/QuanLyNhan/GetNhanById/' + id,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    themMoiNhan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/QuanLyNhan/ThemMoiNhan',
            itemData,
            this.httpOption
        );
    }

    capNhatNhan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/QuanLyNhan/CapNhatNhan',
            itemData,
            this.httpOption
        );
    }

    xoaNhan(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi + '/HeThong/QuanLyNhan/XoaNhan/' + id,
            this.httpOption
        );
    }
}

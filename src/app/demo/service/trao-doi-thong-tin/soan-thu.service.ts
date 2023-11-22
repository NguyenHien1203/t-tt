import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemDanhSach } from 'src/app/models/trao-doi-thong-tin/nhan-ca-nhan';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class SoanThuService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachNhanCaNhan(timKiemDanhSach: any) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/NhanCaNhan/GetDanhSachNhanCaNhan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }
}

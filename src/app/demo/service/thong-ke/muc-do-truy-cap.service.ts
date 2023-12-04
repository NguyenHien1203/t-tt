import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemMucDoTruyCap } from 'src/app/models/thong-ke/muc-do-truy-cap';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class MucDoTruyCapService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachMucDoTruyCap(timKiemDanhSach: TimKiemMucDoTruyCap) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/ThongKe/MucDoTruyCap/GetDanhSachThongKeMucDoTruyCap',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
}

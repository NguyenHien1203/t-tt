import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemVanBanDi } from 'src/app/models/thong-ke/van-ban-di';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class VanBanDiService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachThongKeVanBanDi(timKiemDanhSach: TimKiemVanBanDi) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/ThongKe/ThongKeVanBanDi/GetDanhSachThongKeVanBanDi',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
}

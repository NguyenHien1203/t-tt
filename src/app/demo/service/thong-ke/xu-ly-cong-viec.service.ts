import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemXuLyCongViec } from 'src/app/models/thong-ke/xu-ly-cong-viec';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class XuLyCongViecService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachMucDoTruyCap(timKiemDanhSach: TimKiemXuLyCongViec) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/ThongKe/ThongKeXuLyCongViec/GetDanhSachThongKeXuLyCongViec',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
}
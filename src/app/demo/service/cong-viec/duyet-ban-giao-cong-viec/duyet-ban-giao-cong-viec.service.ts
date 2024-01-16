import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TimKiemDanhSachDBGCV } from 'src/app/models/cong-viec/duyet-ban-giao-cong-viec';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class DuyetBanGiaoCongViecService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) {}

    getDanhSachBGCV(timKiemDanhSach: TimKiemDanhSachDBGCV) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/CongViec/DuyetBanGiaoCongViec/GetDanhSachBGCV',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }
}

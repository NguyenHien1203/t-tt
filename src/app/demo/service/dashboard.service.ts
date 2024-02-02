import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import {
    TimKiemCongViecDashBoard,
    TimKiemLichCoQuanDashBoard,
    TimKiemThongKeThongTin,
} from 'src/app/models/dash-board';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private router: Router
    ) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
    }

    getDataCongViec(timKiemDanhSach: TimKiemCongViecDashBoard) {
        return this.http
            .post<any>(
                environment.baseUrlApi + '/Menu/DashBoard/GetDataCongViec',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachLichCoQuan(timKiemDanhSach: TimKiemLichCoQuanDashBoard) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/Menu/DashBoard/GetDanhSachLichCoQuan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getThongTinThongKeDashBoard(timKiemDanhSach: TimKiemThongKeThongTin) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/Menu/DashBoard/GetThongTinThongKeDashBoard',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
}

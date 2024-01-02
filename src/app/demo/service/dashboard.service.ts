import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemCongViecDashBoard, TimKiemLichCoQuanDashBoard } from 'src/app/models/dash-board';
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
    constructor(private http: HttpClient) {}

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
                environment.baseUrlApi + '/Menu/DashBoard/GetDanhSachLichCoQuan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
}

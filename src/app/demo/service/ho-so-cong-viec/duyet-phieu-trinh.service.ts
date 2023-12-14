import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { TimKiemPhieuTrinh } from 'src/app/models/ho-so-cong-viec/them-moi-phieu-trinh';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class DuyetPhieuTrinhService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachPhieuTrinhChoXuLy(timKiemDanhSach: TimKiemPhieuTrinh) {
        timKiemDanhSach.ngayTrinh = format(
            new Date(timKiemDanhSach.ngayTrinh),
            'yyyy-MM-dd'
        );

        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/PhieuTrinh/GetDanhSachPhieuTrinhChoDuyet',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getPhieuTrinhById(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/PhieuTrinh/GetPhieuTrinhById/' +
                    id
            )
            .toPromise()
            .then((res) => res.objData);
    }
}

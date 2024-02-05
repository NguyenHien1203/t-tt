import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemVanBanNhan } from 'src/app/models/thong-ke/van-ban-nhan';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class VanBanNhanService {
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

    getDanhSachMucDoTruyCap(timKiemDanhSach: TimKiemVanBanNhan) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/ThongKe/ThongKeVanBanNhan/GetDanhSachThongKeVanBanNhan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachDonVi() {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ThongKe/ThongKeVanBanNhan/GetDanhSachDonVi',
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachNguoiDung() {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ThongKe/ThongKeVanBanNhan/GetDanhSachNguoiDung',
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
}

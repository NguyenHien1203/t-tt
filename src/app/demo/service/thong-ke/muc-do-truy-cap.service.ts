import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
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
    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private router: Router
    ) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
    }

    getDanhSachMucDoTruyCap(timKiemDanhSach: TimKiemMucDoTruyCap) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/ThongKe/ThongKeMucDoTruyCap/GetDanhSachMucDoTruyCap',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachPhongBan(idDonVi: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ThongKe/ThongKeMucDoTruyCap/ChangeDonVi/' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
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
    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private router: Router
    ) {}

    getDanhSachXuLyCongViec(timKiemDanhSach: TimKiemXuLyCongViec) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/ThongKe/ThongKeXuLyCongViec/GetDanhSachXuLyCongViec',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
}

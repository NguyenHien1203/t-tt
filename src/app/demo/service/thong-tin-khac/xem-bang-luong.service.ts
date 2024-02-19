import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import {
    TimKiemDanhSach,
    XemBangLuong,
} from 'src/app/models/thong-tin-khac/xem-bang-luong';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class XemBangLuongService {
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

    getDanhSachXemBangLuong(timKiemDanhSach: TimKiemDanhSach) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/XemBangLuong/GetDanhSach',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as XemBangLuong[]);
    }

    getFile(id: string) {
        const headers = new HttpHeaders().set(
            'Accept',
            'application/octet-stream'
        );
        return this.http.get(
            environment.baseUrlApi + '/ThongTinKhac/XemBangLuong/GetFile/' + id,
            {
                headers,
                responseType: 'blob', // Xác định responseType là 'blob'.
            }
        );
    }
}

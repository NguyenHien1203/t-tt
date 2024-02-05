import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    QuanLyBangLuong,
    TimKiemDanhSach,
} from 'src/app/models/thong-tin-khac/quan-ly-bang-luong';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/common/auth.services';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root',
})
export class QuanLyBangLuongService {
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

    getDanhSachQuanLyBangLuong(timKiemDanhSach: TimKiemDanhSach) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/QuanLyBangLuong/GetDanhSach',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as QuanLyBangLuong[]);
    }

    getQuanLyBangLuongId(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/QuanLyBangLuong/GetBangLuongById/' +
                    id
            )
            .pipe(map((response: any) => response.objData));
    }

    getFile(id: string) {
        const headers = new HttpHeaders().set(
            'Accept',
            'application/octet-stream'
        );
        return this.http.get(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyBangLuong/GetFile/' +
                id,
            {
                headers,
                responseType: 'blob', // Xác định responseType là 'blob'.
            }
        );
    }

    themMoiQuanLyBangLuong(modelBangLuong: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyBangLuong/ThemMoiBangLuong',
            modelBangLuong,
            this.httpOption
        );
    }

    capNhatQuanLyBangLuong(modelBangLuong: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyBangLuong/CapNhatBangLuong',
            modelBangLuong,
            this.httpOption
        );
    }

    xoaQuanLyBangLuong(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyBangLuong/DeleteBangLuong/' +
                id
        );
    }
}

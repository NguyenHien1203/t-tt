import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemChuyenMucCauHoi } from 'src/app/models/thong-tin-khac/quan-ly-chuyen-muc-cau-hoi';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class QuanLyChuyenMucCauHoiService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

    getDanhSachChuyenMucCauHoi(timKiemDanhSach: TimKiemChuyenMucCauHoi) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/QuanLyChuyenMucCauHoi/GetDanhSach',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
    getChuyenMucCauHoiById(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/QuanLyChuyenMucCauHoi/GetDanhMucChuyenMucCauHoiById/' +
                    id
            )
            .toPromise()
            .then((res) => res.objData);
    }

    themMoiChuyenMucCauHoi(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyChuyenMucCauHoi/ThemMoiChuyenMucCauHoi',
            itemData,
            this.httpOption
        );
    }

    capNhatChuyenMucCauHoi(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyChuyenMucCauHoi/CapNhatChuyenMucCauHoi',
            itemData,
            this.httpOption
        );
    }

    xoaChuyenMucCauHoi(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyChuyenMucCauHoi/XoaChuyenMucCauHoi/' +
                id
        );
    }
}

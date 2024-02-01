import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemPhieuTrinh } from 'src/app/models/ho-so-cong-viec/them-moi-phieu-trinh';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class KyPhieuTrinhService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

    getDanhSachPhieuTrinhChoXuLy(timKiemDanhSach: TimKiemPhieuTrinh) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        timKiemDanhSach.ngayTrinh = format(
            new Date(timKiemDanhSach.ngayTrinh),
            'yyyy-MM-dd'
        );

        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/XuLyPhieuTrinh/GetDanhSachPhieuTrinhChoKy',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getPhieuTrinhById(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/XuLyPhieuTrinh/GetPhieuTrinhById/' +
                    id
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachNguoiTrinh(idDonViLamViec: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/XuLyPhieuTrinh/GetDanhSachNguoiTrinh/' +
                    idDonViLamViec
            )
            .toPromise()
            .then((res) => res.objData);
    }

    xuLyPhieuTrinh(itemData) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/XuLyPhieuTrinh/KyPhieuTrinh',
            itemData,
            this.httpOption
        );
    }
}

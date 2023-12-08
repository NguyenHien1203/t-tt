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
    private baseUrl = environment.baseUrlApi;
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

    getDanhSachXuLyCongViec(timKiemDanhSach: TimKiemXuLyCongViec) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                '/CongViec/XuLyCongViec/GetDanhSachXuLyCongViec',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachHoSoCongViec(timKiemDanhSach: TimKiemXuLyCongViec) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                '/CongViec/XuLyCongViec/GetDanhSachHoSoCongViec',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDataBaoCaoTienDo(id: string, cap : string, loai : string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/CongViec/XuLyCongViec/GetDataBaoCaoTienDo?id=' + id + "&cap=" + cap + "&loai=" + loai,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    public getDataLuongDuLieu(idCap: string, idCongViec: string, loai: string) {
        if (!this.auth.CheckLogin())
            this.router.navigate(['/login']);

        const idDonViLamViec = this.auth.GetDonViLamViec();

        const url = `${this.baseUrl}/CongViec/XuLyCongViec/GetDataLuongDuLieu?idCongViec=` + idCongViec + "&idCap=" + idCap + "&idDonViLamViec=" + idDonViLamViec + "&loai=" + loai;
        return this.http.get<any>(url);
    }
    KiemTraUserThuocNhomNguoiDung(idUser: string, idDonVi: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                '/CongViec/XuLyCongViec/KiemTraUserThuocNhomNguoiDung?idUser=' + idUser + "&idDonVi=" + idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
}

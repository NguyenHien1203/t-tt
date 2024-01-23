import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import {
    TimKiemChonVanBan,
    TimKiemXuLyCongViec,
} from 'src/app/models/cong-viec/xu-ly-cong-viec';

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

    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private router: Router
    ) {}

    getDanhSachXuLyCongViec(timKiemDanhSach: TimKiemXuLyCongViec) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
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

    getDanhSachChonVanBan(timKiemDanhSach: TimKiemChonVanBan) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/CongViec/XuLyCongViec/GetDanhSachChonVanBan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachHoSoCongViec(timKiemDanhSach: TimKiemXuLyCongViec) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
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

    getDataBaoCaoTienDo(id: string, cap: string, loai: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/CongViec/XuLyCongViec/GetDataBaoCaoTienDo?id=' +
                    id +
                    '&cap=' +
                    cap +
                    '&loai=' +
                    loai,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDataViewChiTiet(id: string, cap: string, loai: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/CongViec/XuLyCongViec/GetDataViewChiTiet?id=' +
                    id +
                    '&cap=' +
                    cap +
                    '&loai=' +
                    loai,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    public getDataLuongDuLieu(idCap: string, idCongViec: string, loai: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        const idDonViLamViec = this.auth.GetDonViLamViec();

        const url =
            `${this.baseUrl}/CongViec/XuLyCongViec/GetDataLuongDuLieu?idCongViec=` +
            idCongViec +
            '&idCap=' +
            idCap +
            '&idDonViLamViec=' +
            idDonViLamViec +
            '&loai=' +
            loai;
        return this.http.get<any>(url);
    }

    KiemTraUserThuocNhomNguoiDung(idUser: string, idDonVi: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/CongViec/XuLyCongViec/KiemTraUserThuocNhomNguoiDung?idUser=' +
                    idUser +
                    '&idDonVi=' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
    public UpdateNgayHt(idCongViec: string, ngayHt: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);

        const url =
            `${this.baseUrl}/CongViec/XuLyCongViec/UpdateNgayHoanThanh?idCongViec=` +
            idCongViec +
            '&ngayHoanThanh=' +
            ngayHt;

        return this.http.post<any>(url, this.httpOption);
    }

    public ThemMoiTienDoCongViec(model: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/CongViec/XuLyCongViec/ThemBaoCaoTienDo',
            model,
            this.httpOption
        );
    }

    //GiaoViec

    public GetVanBanById(idCongViec: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);

        const url =
            `${this.baseUrl}/CongViec/XuLyCongViec/GetVanBanById?idCongViec=` +
            idCongViec;
        return this.http.get<any>(url);
    }

    public LoadDataDefault(idCongViec: string, cap: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        var IdDonVi = this.auth.GetmUserInfo().donViId.toString();
        const url =
            `${this.baseUrl}/CongViec/XuLyCongViec/GetDanhSachCongViec?idCongViec=` +
            idCongViec +
            '&cap=' +
            cap;
        return this.http.get<any>(url);
    }

    public XoaCongViec(idChiTieu: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        const url =
            `${this.baseUrl}/VanBanDen/SuaButPheVanBan/XoaCongViec?idUserXuLy=` +
            idChiTieu;
        return this.http.post<any>(url, this.httpOption);
    }

    public GetDataTraoDoi(idCongViec: string, stt: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        const url =
            `${this.baseUrl}/CongViec/XuLyCongViec/GetDuLieuTraoDoi?idCongViec=` +
            idCongViec +
            '&stt=' +
            stt;
        return this.http.get<any>(url);
    }

    public LuuTraoDoiTheoUser(model: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/CongViec/XuLyCongViec/LuuTraoDoiTheoUser',
            model,
            this.httpOption
        );
    }
}

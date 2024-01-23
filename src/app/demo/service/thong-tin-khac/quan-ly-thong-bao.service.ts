import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
    PhongBanModel,
    QuanLyThongBao,
    TimKiemDanhSach,
} from 'src/app/models/thong-tin-khac/quan-ly-thong-bao';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class QuanLyThongBaoService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

    getDanhSachQuanLyThongBao(timKiemDanhSach: TimKiemDanhSach) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/QuanLyThongBao/GetDanhSach',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as QuanLyThongBao[]);
    }

    getQuanLyThongBaoId(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/QuanLyThongBao/GetThongBaoById/' +
                    id
            )
            .pipe(map((response: any) => response.objData));
    }

    getFile(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        const headers = new HttpHeaders().set(
            'Accept',
            'application/octet-stream'
        );
        return this.http.get(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyThongBao/GetFile/' +
                id,
            {
                headers,
                responseType: 'blob', // Xác định responseType là 'blob'.
            }
        );
    }

    themMoiQuanLyThongBao(modelThongBao: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyThongBao/ThemMoiThongBao',
            modelThongBao,
            this.httpOption
        );
    }

    guiThongBao(modelThongBao: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/ThongTinKhac/QuanLyThongBao/GuiThongBao',
            modelThongBao,
            this.httpOption
        );
    }

    getDanhSachDonViDaGui(thongBaoId: string, donViId: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/QuanLyThongBao/LayDanhSachDonViDaGui?thongBaoId=' +
                    thongBaoId +
                    '&donViId=' +
                    donViId
            )
            .toPromise()
            .then((res) => res.objData);
    }

    capNhatQuanLyThongBao(modelThongBao: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyThongBao/CapNhatThongBao',
            modelThongBao,
            this.httpOption
        );
    }

    xoaQuanLyThongBao(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyThongBao/DeleteThongBao/' +
                id
        );
    }

    getDanhSachPhongBan(donViId: string, userName: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/QuanLyThongBao/GetDanhSachPhongBan?donViId=' +
                    donViId +
                    '&userName=' +
                    userName
            )
            .toPromise()
            .then((data) => data.objData as PhongBanModel[]);
    }

    getDanhSachNhomNguoiDung(
        donViId: string,
        phongBanId: string,
        userId: string
    ) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/QuanLyThongBao/GetDanhSachNhomNguoiDung?donViId=' +
                    donViId +
                    '&phongBanId=' +
                    phongBanId +
                    '&userId=' +
                    userId
            )
            .toPromise()
            .then((data) => data.objData);
    }

    changePhongBan(phongBanId: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/ChangePhongBan/' +
                    phongBanId
            )
            .toPromise()
            .then((data) => data.objData);
    }

    changeNhomNguoiDung(nhomNguoiDungId: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/BindUserByNhomNguoiDung/' +
                    nhomNguoiDungId
            )
            .toPromise()
            .then((data) => data.objData);
    }
}

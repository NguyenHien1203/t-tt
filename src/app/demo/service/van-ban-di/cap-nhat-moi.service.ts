import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs/operators';
import {
    CapNhatMoi,
    LoaiVanBan,
    SoVanBan,
    TimKiemDanhSach,
    TimKiemDanhSachVanBan,
} from 'src/app/models/van-ban-di/cap-nhat-moi';
import { AuthService } from 'src/app/common/auth.services';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root',
})
export class CapNhatMoiService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private auth: AuthService, private router : Router ) {}

    getDanhSachVanBanDi(timKiemDanhSach: TimKiemDanhSach) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/GetDanhSachVanBanDi',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as CapNhatMoi[]);
    }
    getVanBanById(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return (
            this.http
                .get<any>(
                    environment.baseUrlApi +
                        '/VanBanDi/CapNhatMoi/GetVanBanById/' +
                        id
                )
                // .pipe(
                //   map((response: any) => response.objData)
                // );
                .toPromise()
                .then((data) => data.objData)
        );
    }

    getFile(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        const headers = new HttpHeaders().set(
            'Accept',
            'application/octet-stream'
        );
        return this.http.get(
            environment.baseUrlApi + '/VanBanDi/CapNhatMoi/GetFile/' + id,
            {
                headers,
                responseType: 'blob', // Xác định responseType là 'blob'.
            }
        );
    }

    themMoiVanBanDi(modelThongBao: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/VanBanDi/CapNhatMoi/ThemMoiVanBanDi',
            modelThongBao,
            this.httpOption
        );
    }
    
    capNhatVanBanDaGui(modelThongBao: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/VanBanDi/CapNhatMoi/CapNhatVanBanDaGui',
            modelThongBao,
            this.httpOption
        );
    }

    capNhatVanBanDi(modelThongBao: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/VanBanDi/CapNhatMoi/CapNhatVanBanDi',
            modelThongBao,
            this.httpOption
        );
    }

    xoaVanBanDi(idVanBan: string, idDonViLamViec: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/VanBanDi/CapNhatMoi/XoaVanBanDi?idVanBan=' +
                idVanBan +
                '&idDonViLamViec=' +
                idDonViLamViec
        );
    }

    getSoVanBan(idDonViLamViec: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/GetSoVanBan/' +
                    idDonViLamViec
            )
            .toPromise()
            .then((data) => data.objData as SoVanBan[]);
    }

    changeSoVanBan(idSoVanBan: string, idDonViLamViec: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/ChangeSoVanBan?idSoVanBan=' +
                    idSoVanBan +
                    '&idDonViLamViec=' +
                    idDonViLamViec
            )
            .toPromise()
            .then((data) => data.objData as LoaiVanBan[]);
    }

    getSoHienTai(
        idSoVanBan: string,
        ngayBanHanh: Date,
        idSoVanBanUpdate: string,
        soDiHienTai: string,
        soDiHienTaiUpDate: string
    ) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        let itemData = {
            idSoVanBan: idSoVanBan,
            ngayBanHanh: ngayBanHanh,
            idSoVanBanUpdate: idSoVanBanUpdate,
            soDiHienTai: soDiHienTai,
            soDiDenUpdate: soDiHienTaiUpDate,
        };
        return this.http
            .post<any>(
                environment.baseUrlApi + '/VanBanDi/CapNhatMoi/GetSoHienTai',
                itemData,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.data);
    }

    getSoKiHieu(idSoVanBan: string, loaiVanBanId: string, soHienTai: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/GetSoKiHieu?idSoVanBan=' +
                    idSoVanBan +
                    '&loaiVanBanId=' +
                    loaiVanBanId +
                    '&soHienTai=' +
                    soHienTai,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.data);
    }

    getDanhSachPhongBan(donViId: string, userName: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/GetDanhSachPhongBan?donViId=' +
                    donViId +
                    '&userName=' +
                    userName,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
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
                    '/VanBanDi/CapNhatMoi/GetDanhSachNhomNguoiDung?donViId=' +
                    donViId +
                    '&phongBanId=' +
                    phongBanId +
                    '&userId=' +
                    userId,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getDanhSachLanhDaoKy(idDonViLamViec: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/GetDanhSachLanhDaoKy?idDonViLamViec=' +
                    idDonViLamViec,
                this.httpOption
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

    getPhongBanSelected(idVanBan: string, idDonViLamViec: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/GetPhongBanSelected?idVanBan=' +
                    idVanBan +
                    '&idDonViLamViec=' +
                    idDonViLamViec
            )
            .toPromise()
            .then((data) => data.objData as any[]);
    }

    getDanhSachCaNhanDaPhanPhoi(idVanBan: string, idDonViLamViec: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/LayDanhSachCaNhanDaPhanPhoi?vanBanId=' +
                    idVanBan +
                    '&donViId=' +
                    idDonViLamViec
            )
            .toPromise()
            .then((data) => data.objData);
    }

    phanPhoi(model: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/VanBanDi/CapNhatMoi/PhanPhoi',
            model,
            this.httpOption
        );
    }

    getNhomDonViTheoDinhNghia(userId: string, idDonViLamViec: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/BindNhomDonViTheoDinhNghia?userId=' +
                    userId +
                    '&idDonVilamViec=' +
                    idDonViLamViec,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getTreeDonVi(tenDonVi?: string, donViDaChon?: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/GetTreeDonVi?tenDonVi=' +
                    tenDonVi +
                    '&donViDaChon=' +
                    donViDaChon,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    changeNhomDonViTuDinhNghia(
        idNhomNguoiDung?: string,
        idDonViLamViec?: string
    ) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/ChangeNhomDonViTuDinhNghia?idNhomNguoiDung=' +
                    idNhomNguoiDung +
                    '&idDonViLamViec=' +
                    idDonViLamViec,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getDanhSachChonVanBan(modelTimKiem: TimKiemDanhSachVanBan) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/GetDanhSachChonVanBan',
                modelTimKiem,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    guiVanBan(model: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/VanBanDi/CapNhatMoi/GuiVanBan',
            model,
            this.httpOption
        );
    }

    thuHoiVanBan(model: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/VanBanDi/CapNhatMoi/ThuHoiVanBan',
            model,
            this.httpOption
        );
    }
    
    thayTheVanBan(model: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/VanBanDi/CapNhatMoi/ThayTheVanBan',
            model,
            this.httpOption
        );
    }
}

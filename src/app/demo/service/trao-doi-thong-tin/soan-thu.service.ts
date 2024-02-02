import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemDanhSachTraoDoi } from 'src/app/models/trao-doi-thong-tin/chi-tiet-trao-doi';
import { TimKiemDanhSach } from 'src/app/models/trao-doi-thong-tin/nhan-ca-nhan';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class SoanThuService {
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

    timKiemDanhSachNhanCaNhan: any = {
        tenNhan: '',
        phanLoai: '1',
        ghiChu: '',
        hienThi: '1',
        nguoiTao: 0,
        timChinhXac: 0,
    };

    getChiTietHopThuById(idHopThu: string, idUser: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/SoanThu/GetHopThuById?idHopThu=' +
                    idHopThu +
                    '&idNguoiGui=' +
                    idUser,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachChiTietTraoDoi(timKiemDanhSach: TimKiemDanhSachTraoDoi) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/SoanThu/GetDanhSachChiTietTraoDoi',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachNhanCaNhan(nguoiTao: number) {
        this.timKiemDanhSachNhanCaNhan.nguoiTao = nguoiTao;
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/NhanCaNhan/GetDanhSachNhanCaNhan',
                this.timKiemDanhSachNhanCaNhan,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getMenuNhanCaNhan(nguoiTao: number) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/NhanCaNhan/GetMenuNhanCaNhan/' +
                    nguoiTao,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachDonVi() {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/SoanThu/GetDanhSachDonVi',
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachPhongBan(idDonVi: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/SoanThu/GetDanhSachPhongBan?idDonVi=' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachNhomNguoiDung(
        idUser: string,
        idPhongBan: string,
        idDonVi: string
    ) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/SoanThu/GetDanhSachNhomNguoiDung?idUser=' +
                    idUser +
                    '&idPhongBan=' +
                    idPhongBan +
                    '&idDonVi=' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachUserThuocPhongBan(idDonVi: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/SoanThu/GetDanhSachUserThuocPhongBan/' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachUserThuocNhomNguoiDung(idNhomNguoiDung: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/SoanThu/GetDanhSachUserThuocNhomNguoiDung/' +
                    idNhomNguoiDung,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachNguoiDungs() {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/SoanThu/GetDanhSachUsers',
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    guiDi(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/TraoDoiThongTin/SoanThu/GuiDi',
            itemData,
            this.httpOption
        );
    }

    luuNhap(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/TraoDoiThongTin/SoanThu/LuuNhap',
            itemData,
            this.httpOption
        );
    }

    xoaNhieu(lstHopThu: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/TraoDoiThongTin/SoanThu/XoaNhieu',
            lstHopThu,
            this.httpOption
        );
    }

    xoa(idHopThuUser: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/TraoDoiThongTin/SoanThu/Xoa/' +
                idHopThuUser,
            this.httpOption
        );
    }

    danhDauQuanTrong(lstHopThu: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/TraoDoiThongTin/SoanThu/ChuyenThuQuanTrong',
            lstHopThu,
            this.httpOption
        );
    }

    boDanhDauQuanTrong(lstHopThu: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/TraoDoiThongTin/SoanThu/BoThuQuanTrong',
            lstHopThu,
            this.httpOption
        );
    }

    ganNhan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/TraoDoiThongTin/SoanThu/GanNhan',
            itemData,
            this.httpOption
        );
    }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    TimKiemDanhSach,
    TimKiemDanhSachVanBan,
} from 'src/app/models/van-ban-di/gui-van-ban';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class GuiVanBanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachVanBanDi(timKiemDanhSach: TimKiemDanhSach) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/VanBanDi/GuiVanBan/GetDanhSachVanBanDi',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }
    GetVanBanById(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/GetVanBanById/' +
                    id
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getFile(id: string) {
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

    capNhatVanBanDi(modelThongBao: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/VanBanDi/CapNhatMoi/CapNhatVanBanDi',
            modelThongBao,
            this.httpOption
        );
    }

    xoaVanBanDi(idVanBan: string, idDonViLamViec: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/VanBanDi/CapNhatMoi/XoaVanBanDi?idVanBan=' +
                idVanBan +
                '&idDonViLamViec=' +
                idDonViLamViec
        );
    }

    getSoVanBan(idDonViLamViec: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/GetSoVanBan/' +
                    idDonViLamViec
            )
            .toPromise()
            .then((data) => data.objData as any[]);
    }

    changeSoVanBan(idSoVanBan: string, idDonViLamViec: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/ChangeSoVanBan?idSoVanBan=' +
                    idSoVanBan +
                    '&idDonViLamViec=' +
                    idDonViLamViec
            )
            .toPromise()
            .then((data) => data.objData as any[]);
    }

    getSoHienTai(
        idSoVanBan: string,
        ngayBanHanh: Date,
        idSoVanBanUpdate: string,
        soDiHienTai: string,
        soDiHienTaiUpDate: string
    ) {
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
        return this.http.post<any>(
            environment.baseUrlApi + '/VanBanDi/CapNhatMoi/PhanPhoi',
            model,
            this.httpOption
        );
    }

    getNhomDonViTheoDinhNghia(userId: string, idDonViLamViec: string) {
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
        return this.http.post<any>(
            environment.baseUrlApi + '/VanBanDi/CapNhatMoi/GuiVanBan',
            model,
            this.httpOption
        );
    }

    layLaiVanBanDi(
        idVanBan: string,
        idDonViLamViec: string,
        lyDoLayLai: string
    ) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/VanBanDi/CapNhatMoi/LayLaiVanBan?idVanBan=' +
                idVanBan +
                '&idDonViLamViec=' +
                idDonViLamViec +
                '&lyDoLayLai=' +
                lyDoLayLai
        );
    }
}

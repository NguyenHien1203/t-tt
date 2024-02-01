import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AnyComponent } from '@fullcalendar/core/preact';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemDanhSach } from 'src/app/models/van-ban-di/theo-doi-van-ban-di';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class TheoDoiVanBanDiService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

    getDanhSachVanBanDi(timKiemDanhSach: TimKiemDanhSach) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/VanBanDi/TheoDoiVanBanDi/GetDanhSachTheoDoiVanBanDi',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachBaoCaoVanBanDi(idVanban: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/TheoDoiVanBanDi/GetDanhSachBaoCaoVanBanDi/' +
                    idVanban,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDonViDaBaoCao(idVanban: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/TheoDoiVanBanDi/GetDonViDaBaoCao/' +
                    idVanban,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getVanBanById(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
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
            .then((data) => data.objData as any[]);
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
            .then((data) => data.objData as any[]);
    }

    theoDoiVanBanDi(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/VanBanDi/TheoDoiVanBanDi/DangKy',
            itemData,
            this.httpOption
        );
    }

    capNhatKetQuaBaoCao(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/VanBanDi/TheoDoiVanBanDi/CapNhatKQBC',
            itemData,
            this.httpOption
        );
    }

    guiCanhBao(idVanBan: string, idDonVi: string, noiDungCanhBao: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/VanBanDi/TheoDoiVanBanDi/GuiCanhBao?idVanBan=' +
                idVanBan +
                '&idDonVi=' +
                idDonVi +
                '&noiDungCanhBao=' +
                noiDungCanhBao,
            this.httpOption
        );
    }

    getDonViDaGui(idDonViNhan: string, idDonViGui: string, idVanBan: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/TheoDoiVanBanDi/GetDanhSachDonViDaGui?idVanBan=' +
                    idVanBan +
                    '&idDonViNhan=' +
                    idDonViNhan +
                    '&idDonViGui=' +
                    idDonViGui
            )
            .toPromise()
            .then((data) => data.objData as any[]);
    }

    getDanhSachPhongBanSelected(idDonViLamViec: string, idVanBan: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/TheoDoiVanBanDi/GetDanhSachDonViDaGui?idVanBan=' +
                    idVanBan +
                    '&idDonViLamViec=' +
                    idDonViLamViec
            )
            .toPromise()
            .then((data) => data.objData as any[]);
    }

    getDanhSachBaoCaoSelected(idVanBan: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/TheoDoiVanBanDi/GetDanhSachBaoCaoSelected?idVanBan=' +
                    idVanBan
            )
            .toPromise()
            .then((data) => data.objData as any[]);
    }

    getFileKetQuaBaoCao(idVanBan: string, idDonViNhan: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/TheoDoiVanBanDi/GetFileKetQuaBaoCao?idVanBan=' +
                    idVanBan +
                    '&idDonViNhan=' +
                    idDonViNhan
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getDanhSachBaoCaoVanBanTraLoi(
        idVanBan: string,
        idDonViLamViec: string,
        idDonViNhan: string,
        loaiBaoCao: number
    ) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/TheoDoiVanBanDi/GetDanhSachVanBanBaoCaoTraLoi?idVanBan=' +
                    idVanBan +
                    '&idDonViLamViec=' +
                    idDonViLamViec +
                    '&idDonViNhan=' +
                    idDonViNhan +
                    '&loaiBaoCao=' +
                    loaiBaoCao,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData as any[]);
    }

    capNhatKetQua(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/VanBanDi/TheoDoiVanBanDi/capNhatKetQua',
            itemData,
            this.httpOption
        );
    }
}

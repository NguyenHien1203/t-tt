import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    constructor(private http: HttpClient) {}

    getDanhSachVanBanDi(timKiemDanhSach: TimKiemDanhSach) {
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

    getVanBanById(id: string) {
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

    theoDoiVanBanDi(itemData) {
        return this.http.post<any>(
            environment.baseUrlApi + itemData,
            this.httpOption
        );
    }

    getDonViDaGui(idDonViNhan: string, idDonViGui: string, idVanBan: string) {
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
}

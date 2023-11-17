import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    SoVanBanDi,
    TimKiemDanhSach,
} from 'src/app/models/van-ban-di/so-van-ban-di';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class SoVanBanDiService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    private httpOptionFile = {
        responseType: 'arraybuffer' as 'json',
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachSoVanBanDi(timKiemDanhSach: TimKiemDanhSach) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/VanBanDi/SoVanBanDi/GetDanhSachSoVanBanDi',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as SoVanBanDi[]);
    }

    getSoVanBan(idDonViLamViec: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/SoVanBanDi/GetSoVanBan/' +
                    idDonViLamViec
            )
            .toPromise()
            .then((data) => data.objData as any[]);
    }

    changeSoVanBan(idSoVanBan: string, idDonViLamViec: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/SoVanBanDi/ChangeSoVanBan?idSoVanBan=' +
                    idSoVanBan +
                    '&idDonViLamViec=' +
                    idDonViLamViec
            )
            .toPromise()
            .then((data) => data.objData as any[]);
    }

    exportWord(timKiemDanhSach: TimKiemDanhSach) {
        return this.http.post<any>(
          environment.baseUrlApi + '/VanBanDi/SoVanBanDi/ExportWord',
          timKiemDanhSach,
          this.httpOptionFile
        );
    }

    exportExcel(timKiemDanhSach: TimKiemDanhSach) {
        return this.http.post(
            environment.baseUrlApi + '/VanBanDi/SoVanBanDi/ExportExcel',
            timKiemDanhSach,
            this.httpOptionFile
        );
    }
}

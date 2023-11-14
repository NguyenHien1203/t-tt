import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemDanhSach } from 'src/app/models/van-ban-di/tra-cuu-don-gian';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class TraCuuDonGianService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachTraCuuDonGian(timKiemDanhSach: TimKiemDanhSach) {
      return this.http.post<any>(environment.baseUrlApi + '/VanBanDi/TraCuuDonGian/GetDanhSachTraCuuDonGian', timKiemDanhSach, this.httpOption)
        .toPromise()
        .then(res => res.objData as any[]);
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

}

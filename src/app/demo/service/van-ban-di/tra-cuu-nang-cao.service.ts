import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemDanhSach } from 'src/app/models/van-ban-di/tra-cuu-nang-cao';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TraCuuNangCaoService {

  private httpOption = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
constructor(private http: HttpClient) {}

  getDanhSachTraCuuNangCao(timKiemDanhSach: TimKiemDanhSach) {
    return this.http
        .post<any>(
            environment.baseUrlApi +
                '/VanBanDi/TraCuuNangCao/GetDanhSachTraCuuNangCao',
            timKiemDanhSach,
            this.httpOption
        )
        .toPromise()
        .then((res) => res.objData as any[]);
}
  
  
        getDanhSachLoaiVanBan(idDonViLamViec: string) {
    return this.http
        .get<any>(
            environment.baseUrlApi +
                '/VanBanDi/TraCuuNangCao/GetDanhSachLoaiVanBan/' + idDonViLamViec,
            this.httpOption
        )
        .toPromise()
        .then((res) => res.objData as any[]);
}
}

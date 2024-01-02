import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemDanhSachVBTC } from 'src/app/models/van-ban-den/van-ban-da-tu-choi';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VanBanDaTuChoiService  {
  private httpOption = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      }),
  };
  constructor(private http: HttpClient) {}

  getDanhSachTraCuuNangCao(timKiemDanhSach: TimKiemDanhSachVBTC) {
    return this.http
        .post<any>(
            environment.baseUrlApi +
                '/VanBanDen/TraCuuNangCao/GetDanhSachTraCuuNangCao',
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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
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
    constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

    getDanhSachTraCuuDonGian(timKiemDanhSach: TimKiemDanhSach) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
      return this.http.post<any>(environment.baseUrlApi + '/VanBanDi/TraCuuDonGian/GetDanhSachTraCuuDonGian', timKiemDanhSach, this.httpOption)
        .toPromise()
        .then(res => res.objData as any[]);
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

}

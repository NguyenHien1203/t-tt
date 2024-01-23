import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemDanhSach } from 'src/app/models/van-ban-di/van-ban-di-lien-quan';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VanBanDiLienQuanService {

  private httpOption = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

  getDanhSachVanBanDiLienQuan(timKiemDanhSach: TimKiemDanhSach) {
   if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    return this.http
        .post<any>(
            environment.baseUrlApi +
                '/VanBanDi/VanBanDiLienQuan/GetDanhSachVanBanDiLienQuan',
            timKiemDanhSach,
            this.httpOption
        )
        .toPromise()
        .then((res) => res.objData as any[]);
}
}

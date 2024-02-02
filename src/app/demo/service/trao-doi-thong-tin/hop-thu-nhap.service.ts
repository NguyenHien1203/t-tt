import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemDanhSach } from 'src/app/models/trao-doi-thong-tin/hop-thu-nhap';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HopThuNhapService {

  private httpOption = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
constructor(private http: HttpClient, private auth: AuthService, private router : Router) {
  if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
}

getDanhSachHopThuNhap(timKiemDanhSach: TimKiemDanhSach) {
   
    return this.http
        .post<any>(
            environment.baseUrlApi +
                '/TraoDoiThongTin/HopThuNhap/GetDanhSachHopThuNhap',
            timKiemDanhSach,
            this.httpOption
        )
        .toPromise()
        .then((res) => res.objData as any[]);
}
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemCauHoiThuongGap } from 'src/app/models/thong-tin-khac/quan-ly-cau-hoi-thuong-gap';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CauHoiThuongGapService {

  private httpOption = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

getDanhSachQuanLyCauHoiThuongGap(timKiemDanhSach: TimKiemCauHoiThuongGap) {
   if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    return this.http
        .post<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/CauHoiThuongGap/GetDanhSach',
            timKiemDanhSach,
            this.httpOption
        )
        .toPromise()
        .then((res) => res.objData);
}

getCauHoiThuongGap(idCauHoi: string) {
   if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    return this.http
        .get<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/CauHoiThuongGap/GetCauHoiThuongGapById/' + idCauHoi,
            this.httpOption
        )
        .toPromise()
        .then((res) => res.objData);
}
}

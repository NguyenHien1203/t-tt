import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemDanhSach } from 'src/app/models/nhiem-vu/tao-nhiem-vu';
import { TimKiemDanhSachVanBan } from 'src/app/models/van-ban-di/gui-van-ban';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaoNhiemVuService {
  private baseUrl = environment.baseUrlApi;
  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  public GetDanhSachNhiemVu(timKiemDanhSach: TimKiemDanhSach) {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);

    const url = `${this.baseUrl}/NhiemVu/TaoNhiemVu/GetDanhSachNhiemVu/`;
    return this.http.post<any>(url, timKiemDanhSach, this.httpOption);
  }

  public GetDataDefaultOption(): Observable<any> {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    var DonViId = this.auth.GetmUserInfo().donViId.toString();
    var phongBanId = this.auth.GetmUserInfo().phongBanId.toString();
    const url = `${this.baseUrl}/NhiemVu/TaoNhiemVu/GetDataDefaultOption?DonViId=${DonViId}&phongBanId=${phongBanId}`;
    return this.http.get<any>(url);
  }

  public ThemMoi(TaoNhiemVu: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/NhiemVu/TaoNhiemVu/ThemMoi`, TaoNhiemVu, this.httpOption)
  }

  public GetTaoNhiemVu(id: string): Observable<any> {
    // return this.http.get<any>(`${this.baseUrl}/NhiemVu/TaoNhiemVu/GetTaoNhiemVu/${id}`)
    return this.http.get<any>(`${this.baseUrl}/NhiemVu/TaoNhiemVu/GetTaoNhiemVu/4`)

  }
}

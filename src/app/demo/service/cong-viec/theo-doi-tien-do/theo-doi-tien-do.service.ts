import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemNam_Thang, TimKiemTuan } from 'src/app/models/cong-viec/theo-doi-tien-doi';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TheoDoiTienDoService {

  private baseUrl = environment.baseUrlApi;
  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private router: Router
  ) { }

  public GetDanhSachTienDoTuan(modelTimKiem: TimKiemTuan) {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    modelTimKiem.idUser = this.auth.GetmUserInfo().userId.toString();
    const url = `${this.baseUrl}/CongViec/TheoDoiTienDo/GetDanhSachTuan/`;

    return this.httpClient.post<any>(url, modelTimKiem, this.httpOption);
  }

  public GetDanhSachTienDoNamThang(modelTimKiem: TimKiemNam_Thang) {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    modelTimKiem.idUser = this.auth.GetmUserInfo().userId.toString();
    const url = `${this.baseUrl}/CongViec/TheoDoiTienDo/GetDanhSachNamThang/`;

    return this.httpClient.post<any>(url, modelTimKiem, this.httpOption);
  }
}

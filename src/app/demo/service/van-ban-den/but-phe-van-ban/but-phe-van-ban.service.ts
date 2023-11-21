import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemDanhSach } from 'src/app/models/van-ban-den/but-phe-van-ban';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ButPheVanBanService {

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


  /**
   * getDanhSachCapNhatMoi
   */
  public getDataButPhe(modelTimKiem: TimKiemDanhSach) {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    var DviLamViec = this.auth.GetDonViLamViec();
    var PblvId = this.auth.GetmUserInfo().phongBanLamViecId.toString();

    const url = `${this.baseUrl}/VanBanDen/ButPheVanBan/GetDanhSachButPhe/`;
    modelTimKiem.DonViLamViec = DviLamViec;
    modelTimKiem.phongbanlamviecid = PblvId;

    return this.httpClient.post<any>(url, modelTimKiem, this.httpOption);
  }
}

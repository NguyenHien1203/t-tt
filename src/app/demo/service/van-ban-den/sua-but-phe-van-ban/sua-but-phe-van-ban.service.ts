import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemDanhSach } from 'src/app/models/van-ban-den/but-phe-van-ban';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SuaButPheVanBanService {
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
  public getDataSuaButPhe(modelTimKiem: TimKiemDanhSach) {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    var DviLamViec = this.auth.GetDonViLamViec();
    var PblvId = this.auth.GetmUserInfo().phongBanLamViecId.toString();

    const url = `${this.baseUrl}/VanBanDen/SuaButPheVanBan/GetDanhSachSuaButPhe/`;
    modelTimKiem.DonViLamViec = DviLamViec;
    modelTimKiem.phongbanlamviecid = PblvId;

    return this.httpClient.post<any>(url, modelTimKiem, this.httpOption);
  }

  /**
   * Lấy thông tin văn bản nhận gửi
   */
  public LoadDataDefault(IdvanBan: string): Observable<any> {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    var IdDonVi = this.auth.GetmUserInfo().donViId.toString();
    const url = `${this.baseUrl}/VanBanDen/SuaButPheVanBan/GetDanhSachCongViec?idVanBan=` + IdvanBan + "&idDonVi=" + IdDonVi;
    return this.httpClient.get<any>(url);
  }

  public GetDataUpdateCongViec(item: any): Observable<any> {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);

    const url = `${this.baseUrl}/VanBanDen/SuaButPheVanBan/GetDataUpdateCongViec?idUserCvChiTieu=` + item.id.toString() + "&idCongViec=" + item.congViecId + "&stt=" + item.stt;
    return this.httpClient.get<any>(url);
  }

  public CapNhatCongViec(modelVanban: any): Observable<any> {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    return this.httpClient.post<any>(environment.baseUrlApi + '/VanBanDen/SuaButPheVanBan/CapNhatCongViec', modelVanban, this.httpOption)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemDanhSach } from 'src/app/models/van-ban-den/cap-nhat-moi';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TiepNhanVanBanService {

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

  public getDanhSachTiepNhanVanBan(modelTimKiem: TimKiemDanhSach) {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    var DviLamViec = this.auth.GetmUserInfo().donViId.toString();
    const url = `${this.baseUrl}/VanBanDen/TiepNhanVanBanDen/GetListTiepNhanVanBanDen/`;
    modelTimKiem.DonViLamViec = DviLamViec;
    return this.httpClient.post<any>(url, modelTimKiem, this.httpOption);
  }

  public GetVanBanTiepNhan(id: string) {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);

    const url = `${this.baseUrl}/VanBanDen/TiepNhanVanBanDen/GetVanBanTiepNhan?idVanBan=` + id;
    return this.httpClient.get<any>(url).toPromise()
      .then(data => data.objData);

  }

  /**
    * Tiếp nhận văn bản
    */
  public TiepNhanVanBan(modelVanban: any): Observable<any> {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    return this.httpClient.post<any>(environment.baseUrlApi + '/VanBanDen/TiepNhanVanBanDen/ChapNhanVanBanDen', modelVanban, this.httpOption)
  }

   /**
    * Từ chối văn bản
    */
   public TuChoiVanBan(modelVanban: any): Observable<any> {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    return this.httpClient.post<any>(environment.baseUrlApi + '/VanBanDen/TiepNhanVanBanDen/TuChoiVanBanDen', modelVanban, this.httpOption)
  }
}

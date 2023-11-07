import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/common/auth.services';
import { DmDonVi, TimKiemModel } from 'src/app/models/danh-muc/don-vi/donvi.model';

@Injectable({
  providedIn: 'root'
})
export class DonViService {
  baseApiUrl: string = "https://localhost:7077/api";
  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private auth: AuthService) { }
  getDanhSachDonVi(timkiem: TimKiemModel) {
    return this.http.post<any>(this.baseApiUrl + '/DanhMuc/DonVi/GetDanhSachDonVi', timkiem, this.httpOption)
      .toPromise()
      .then(res => res.objData as DmDonVi[]);
  }

  addDonVi(addPhongBan: DmDonVi): Observable<DmDonVi> {
    return this.http.post<any>(this.baseApiUrl + '/DanhMuc/DonVi/ThemMoiDonVi/', addPhongBan, this.httpOption);
  }

  /**
   * Lấy dữ liệu đơn vị tree
   */
  public GetDataDonVi(): Observable<any> {
    const url = `${this.baseApiUrl}/DanhMuc/DonVi/GetDataDonVi`;
    return this.http.get(url);
  }

  /**
   * Lấy dữ liệu phòng ban
   */
  GetDonViById(id: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/DanhMuc/DonVi/GetDonViById/' + id).pipe(
      map((response: any) => response.objData)
    );
  }

  CapNhatDonVi(modelLienKet: any) {
    return this.http.post<any>(this.baseApiUrl + '/DanhMuc/DonVi/CapNhatDonVi', modelLienKet, this.httpOption)
  }

  xoaDonVi(id: string) {
    return this.http.post<any>(this.baseApiUrl + '/DanhMuc/DonVi/DeleteDonVi/' + id, this.httpOption)
  }
}



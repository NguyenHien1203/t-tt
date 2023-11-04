import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DmPhongBan, TimKiemModel } from 'src/app/demo/api/danh-muc/phong-ban';
import { Observable, ObservedValueOf } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhongbanService {
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

  constructor(private http: HttpClient) { }

  getDanhSachPhongBan(timkiem: TimKiemModel) {
    return this.http.post<any>(this.baseApiUrl + '/DanhMuc/PhongBan/GetDanhSachPhongBan/', timkiem, this.httpOption).toPromise().then(response => response.objData.listPhongBan as DmPhongBan[])
  }

  addPhongBan(addPhongBan: DmPhongBan): Observable<DmPhongBan> {
    return this.http.post<any>(this.baseApiUrl + '/DanhMuc/PhongBan/ThemMoiPhongBan/', addPhongBan, this.httpOption);
  }

  /**
   * Lấy dữ liệu đơn vị tree
   */
  public GetDataDonVi(): Observable<any> {
    const url = `${this.baseApiUrl}/DanhMuc/PhongBan/GetDataDonVi`;
    return this.http.get(url);
  }

  /**
   * Lấy dữ liệu phòng ban
   */
  GetPhongBanById(id: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/DanhMuc/PhongBan/GetPhongBanById/' + id).pipe(
      map((response: any) => response.objData)
    );
  }

  CapNhatPhongBan(modelLienKet: any) {
    return this.http.post<any>(this.baseApiUrl + '/DanhMuc/PhongBan/CapNhatPhongBan', modelLienKet, this.httpOption)
  }

  xoaPhongBan(id: string) {
    return this.http.post<any>(this.baseApiUrl + '/DanhMuc/PhongBan/DeletePhongBan/' + id, this.httpOption)
  }
}

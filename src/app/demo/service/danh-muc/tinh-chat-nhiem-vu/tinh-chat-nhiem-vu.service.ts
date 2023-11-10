import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TinhChatNhiemVu } from 'src/app/models/danh-muc/tinh-chat-nhiem-vu';

@Injectable({
  providedIn: 'root'
})
export class TinhChatNhiemVuService {

  url = '/DanhMuc/TinhChatNhiemVu/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public getDanhSachTinhChatNhiemVU(danhSach: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSach', danhSach).pipe(
      map((response: any) => response.objData.listDanhSach as TinhChatNhiemVu[])
    )
  }

  public getTinhChatNhiemVu(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetTinhChatNhiemVuById/${id}`).pipe(
      map((response: any) => response.objData as TinhChatNhiemVu[])
    )
  }

  public themMoiTinhChatNhiemVu(danhSach: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'ThemMoiDanhMucLienKet', danhSach, this.httpOptions)
  }

  public capNhatTinhChatNhiemVu(danhSach: any, id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `CapNhatTinhChatNhiemVu/${id}`, danhSach, this.httpOptions)
  }

  public xoaTinhChatNhiemVu(id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `DeleteTinhChatNhiemVu/${id}`, id, this.httpOptions)
  }

}

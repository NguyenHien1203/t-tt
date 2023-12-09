import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HoatDongSapToiService {

  constructor(private http: HttpClient) { }

  url = '/ThongTinKhac/HoatDongSapToi/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public getDanhSach(danhSach: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSach', danhSach)
      .pipe(map((res: any) => res.objData));
  }

  public getHoatDong(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetHoatDong/${id}`)
      .pipe(map((res: any) => res.objData));
  }

  public themMoi(hoatDong: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'ThemMoi', hoatDong, this.httpOptions);
  }

  public capNhat(hoatDong: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `CapNhat/${hoatDong.id}`, hoatDong, this.httpOptions);
  }

  public xoa(id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `Xoa/${id}`, this.httpOptions);
  }

  public changePhongBan(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `ChangePhongBan/${id}`)
      .pipe(map((res: any) => res.objData));
  }

  public changeNhomNguoiDung(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `BindUserByNhomNguoiDung/${id}`)
      .pipe(map((res: any) => res.objData));
  }

  public danhSachPhongBan(idDonVi: any, userName: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetDanhSachPhongBan?donViId=${idDonVi}&userName=${userName}`)
      .pipe(map((res: any) => res.objData));
  }

  public danhSachNhomNguoiDung(donViId: any, phongBanId: any, userId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetDanhSachNhomNguoiDung?donViId=${donViId}&phongBanId=${phongBanId}&userId=${userId}`)
      .pipe(map((res: any) => res.objData));
  }
}

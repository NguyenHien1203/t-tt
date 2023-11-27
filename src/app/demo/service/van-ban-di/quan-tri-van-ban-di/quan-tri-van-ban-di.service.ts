import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuanTriVanBanDi } from 'src/app/models/van-ban-di/quan-tri-van-ban-di';

@Injectable({
  providedIn: 'root'
})

export class QuanTriVanBanDiService {
  url = '/VanBanDi/QuanTriVanBanDi/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public getLoaiVanBan(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + 'GetLoaiVanBan/' + id)
      .pipe(map((res: any) => res.objData))
  }

  public getSoVanBan(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + 'GetSoVanBan/' + id)
      .pipe(map((res: any) => res.objData))
  }

  public danhSachVanBanDi(danhSach: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSachQuanTriVanBanDi', danhSach)
      .pipe(map((res: any) => res.objData as QuanTriVanBanDi))
  }

  public getVanBanDi(idVb: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + 'GetVanBanDi?id=' + idVb, this.httpOptions)
      .pipe(map((res: any) => res.objData as QuanTriVanBanDi))
  }

  public getVanBanDiCapNhat(idVb: string) {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + 'GetVanBanDi?id=' + idVb)
      .toPromise().then((res) => res.objData)
  }

  public getVanBanNhanGui(id: any, idDonViLamViec: any, idDonViCha: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + 'GetVanBanNhanGui?id=' + id + '&idDv=' + idDonViLamViec + '&idDvC=' + idDonViCha)
      .pipe(map((res: any) => res.objData))
  }

  public getThongTinDaGui(id: string, idDv: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + 'GetThongTinDaGui/' + id + '/' + idDv)
      .pipe(map((res: any) => res.objData))
  }

  public getDanhSachLanhDaoKy(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSachLanhDaoKy?id=' + id)
      .pipe(map((res: any) => res.objData))
  }

  public getDanhSachPBSoanThao(id: any, userName: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSachPBSoanThao?id=' + id + '&userName=' + userName)
      .pipe(map((res: any) => res.objData))
  }

  public getUploadFile(file: any, url: string): any {
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      return this.http.post(environment.baseUrlApi + url, formData);
    }
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DuyetVanBanTrinhKyService {

  constructor(private http: HttpClient) { }

  url = '/KySo/DuyetVanBanTrinhKy/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public getLoaiVanBan(idDonVi: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetLoaiVanBan?donViId=${idDonVi}`)
    .pipe(map((res: any) => res.objData))
  }

  public getDanhSach(danhSach: any): Observable<any> {
    return this.http.post(`${environment.baseUrlApi}` + this.url + `GetDanhSach?danhSach`, danhSach)
    .pipe(map((res: any) => res.objData))
  }
}

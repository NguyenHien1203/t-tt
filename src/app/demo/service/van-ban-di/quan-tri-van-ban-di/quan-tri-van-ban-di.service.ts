import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
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
    .pipe(map((res: any)=> res.objData))
  }

  public getSoVanBan(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}`  + this.url + 'GetSoVanBan/' + id)
    .pipe(map((res: any) => res.objData))
  }

  public danhSachVanBanDi(danhSach: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSachQuanTriVanBanDi', danhSach)
    .pipe(map((res: any) => res.objData as QuanTriVanBanDi))
  }
}

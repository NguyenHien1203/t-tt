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

  public getVanBanDi(idVb: any, idDv: any, idDvCha: any, idPB: any, nameAdmin: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + 'GetVanBanDi/' + idVb + '/' + idDv + '/' + idDvCha + '/' + idPB + '/' + nameAdmin)
      .pipe(map((res: any) => res.objData as QuanTriVanBanDi))
  }

  public getVanBanNhanGui(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + 'GetVanBanNhanGui/' + id)
      .pipe(map((res: any) => res.objData))
  }

  public getThongTinDaGui(id: string, idDv: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + 'GetThongTinDaGui/' + id + '/' + idDv)
      .pipe(map((res: any) => res.objData))
  }
}

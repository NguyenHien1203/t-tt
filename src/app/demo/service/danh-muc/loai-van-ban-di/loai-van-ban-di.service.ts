import { environment } from 'src/environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaiVanBanDi } from 'src/app/models/danh-muc/loai-van-ban-di';

@Injectable({
  providedIn: 'root'
})
export class LoaiVanBanDiService {
  url = '/DanhMuc/LoaiVBDiTaiCoQuan/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public getSoVanBan(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetSoVanBan/${id}`)
      .pipe(
        map((response: any) => response)
      )
  }

  public getLoaiVBDonVi(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetLoaiVBDonVi/${id}`)
    .pipe(
      map((response: any) => response.objData as LoaiVanBanDi[])
    )
  }

  public updateDataVBDen(data: any): Observable<any> { 
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'UpdateQuanTRiVanBan', data);
  }
}

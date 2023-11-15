import { environment } from 'src/environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LinhVuc } from 'src/app/models/danh-muc/linh-vuc';

@Injectable({
  providedIn: 'root'
})
export class LinhVucService {

  url = '/DanhMuc/LinhVuc/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public getLinhVuc(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetLinhVucById/${id}`)
      .pipe(
        map((response: any) => response.objData as LinhVuc[])
      );
  }

  public getDanhSachLinhVuc(danhSach: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSachLinhVuc', danhSach, this.httpOptions)
      .pipe(
        map((res: any) => res.objData as LinhVuc[])
      )
  }

  public themMoi(linhVuc: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'ThemMoiLinhVuc', linhVuc, this.httpOptions)
  }

  public capNhat(linhVuc: any, id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `CapNhatLinhVuc?id=${id}`, linhVuc, this.httpOptions)
  }

  public xoa(id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `DeleteLinhVuc/${id}`, this.httpOptions)
  }

  public getTreeUnits(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetDataDonViTree`, this.httpOptions)
  }

  public getDataDepart(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetDataPhongBanByDVi/${id}`, this.httpOptions)
  }
}

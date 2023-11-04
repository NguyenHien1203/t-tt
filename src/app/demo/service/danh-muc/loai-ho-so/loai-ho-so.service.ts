import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaiHoSo } from 'src/app/models/danh-muc/loai-ho-so';

@Injectable({
  providedIn: 'root'
})
export class LoaiHoSoService {

  url = '/DanhMuc/LoaiHoSo/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public getListRecords(records: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSachLoaiHoSo', records).pipe(
      map((response: any) => response.objData.listLoaiHoSo as LoaiHoSo[])
    )
  }

  public getIdRecord(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetLoaiHoSoById/${id}`).pipe(
      map((response: any) => response.objData as LoaiHoSo[])
    )
  }

  public createRecord(record: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'ThemMoiLoaiHoSo', record, this.httpOptions)
  }

  public updateRecord(record: any, id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `CapNhatLoaiHoSo/${id}`, record, this.httpOptions)
  }

  public deleteRecord(id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'DeleteLoaiHoSo', id, this.httpOptions)
  }
}

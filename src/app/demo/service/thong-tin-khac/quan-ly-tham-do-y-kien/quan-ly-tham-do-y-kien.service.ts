import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuanLyThamDoYKien } from 'src/app/models/thong-tin-khac/quan-ly-tham-do-y-kien/quan-ly-tham-do-y-kien';

@Injectable({
  providedIn: 'root'
})
export class QuanLyThamDoYKienService {

  url = '/ThongTinKhac/QuanLyThamDoYKien/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public getDanhSach(danhSach: any): Observable<any> {
    return this.http.post(`${environment.baseUrlApi}` + this.url + 'GetDanhSach' ,danhSach)
    .pipe(map((res: any) => res.objData as QuanLyThamDoYKien))
  }

  public themMoi(cauHoi: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'ThemMoi', cauHoi, this.httpOptions)
  }
}

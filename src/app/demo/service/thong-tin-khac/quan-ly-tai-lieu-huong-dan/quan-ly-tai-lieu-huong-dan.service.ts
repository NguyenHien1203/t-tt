import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuanLyTaiLieuHuongDan } from 'src/app/models/thong-tin-khac/quan-ly-tai-lieu-huong-dan/quan-ly-tai-lieu-huong-dan';

@Injectable({
  providedIn: 'root'
})
export class QuanLyTaiLieuHuongDanService {

  url = '/ThongTinKhac/QuanLyTaiLieuHuongDan/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public getDonVi(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + 'GetDonVi')
    .pipe(map((res: any) => res.objData))
  }

  public getDanhSach(danhSach: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSachTaiLieu', danhSach)
    .pipe(map((res: any) => res.objData as QuanLyTaiLieuHuongDan))
  }
}

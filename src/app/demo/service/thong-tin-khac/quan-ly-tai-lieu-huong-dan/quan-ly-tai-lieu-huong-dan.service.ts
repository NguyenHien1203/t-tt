import { QuanLyTaiLieuHuongDan } from './../../../../models/thong-tin-khac/quan-ly-tai-lieu-huong-dan/quan-ly-tai-lieu-huong-dan';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

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

  public getTaiLieu(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetTaiLieuHuongDan/${id}`)
      .pipe(map((res: any) => res.objData))
  }

  public getFile(id: string) {
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
    return this.http.get(`${environment.baseUrlApi}` + this.url + `GetFile/${id}`, {
      headers,
      responseType: 'blob',
    });
  }

  public themMoi(taiLieu: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `ThemMoi`, taiLieu, this.httpOptions);
  }

  public capNhat(taiLieu: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `CapNhat`, taiLieu, this.httpOptions);
  }

  public xoa(id: any):Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `Xoa/${id}`, this.httpOptions);
  }
}

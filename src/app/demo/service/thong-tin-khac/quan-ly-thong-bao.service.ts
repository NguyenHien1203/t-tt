import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuanLyThongBao, TimKiemDanhSach } from 'src/app/models/thong-tin-khac/quan-ly-thong-bao';
import { environment } from 'src/environments/environment.development';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuanLyThongBaoService {

  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getDanhSachQuanLyThongBao(timKiemDanhSach: TimKiemDanhSach) {
    return this.http.post<any>(environment.baseUrlApi + '/ThongTinKhac/QuanLyThongBao/GetDanhSach', timKiemDanhSach, this.httpOption)
      .toPromise()
      .then(res => res.objData as QuanLyThongBao[]);
  }
  getQuanLyThongBaoId(id: string) {
    return this.http.get<any>(environment.baseUrlApi + '/ThongTinKhac/QuanLyThongBao/GetThongBaoById/' + id)
      .pipe(
        map((response: any) => response.objData)
      );
  }

  getFile(id: string): Observable<any> {
    return this.http.get(environment.baseUrlApi + '/ThongTinKhac/QuanLyThongBao/getFile/' + id);
  }

  themMoiQuanLyThongBao(modelThongBao: any) {
    return this.http.post<any>(environment.baseUrlApi + '/ThongTinKhac/QuanLyThongBao/ThemMoiThongBao', modelThongBao, this.httpOption)
  }

  capNhatQuanLyThongBao(modelThongBao: any) {
    return this.http.post<any>(environment.baseUrlApi + '/ThongTinKhac/QuanLyThongBao/CapNhatThongBao', modelThongBao, this.httpOption)
  }

  xoaQuanLyThongBao(id: string) {
    return this.http.get<any>(environment.baseUrlApi + '/ThongTinKhac/QuanLyThongBao/DeleteThongBao/' + id)
  }
}

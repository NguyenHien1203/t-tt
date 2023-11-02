import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuanLyThongBao, TimKiemDanhSach } from 'src/app/models/thong-tin-khac/quan-ly-thong-bao';
import { environment } from 'src/environments/environment.development';
import {map} from 'rxjs/operators';
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
    return this.http.get<any>(environment.baseUrlApi + '/ThongTinKhac/QuanLyThongBao/GetQuanLyThongBaoById/' + id)
      .pipe(
        map((response: any) => response.objData)
      );
  }

  themMoiQuanLyThongBao(modelLienKet: any) {
    return this.http.post<any>(environment.baseUrlApi + '/ThongTinKhac/QuanLyThongBao/ThemMoiQuanLyThongBao', modelLienKet, this.httpOption)
  }

  capNhatQuanLyThongBao(modelLienKet: any) {
    return this.http.post<any>(environment.baseUrlApi + '/ThongTinKhac/QuanLyThongBao/CapNhatQuanLyThongBao', modelLienKet, this.httpOption)
  }

  xoaQuanLyThongBao(id: string) {
    return this.http.get<any>(environment.baseUrlApi + '/ThongTinKhac/QuanLyThongBao/DeleteQuanLyThongBao/' + id)
  }
}

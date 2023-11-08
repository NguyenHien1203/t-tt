import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TimKiemDanhSach } from 'src/app/models/thong-tin-khac/xem-thong-bao';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class XemThongBaoService {
  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient
  ) { }

  getXemThongBaoId(id: string) {
    return this.http.get<any>(environment.baseUrlApi + '/ThongTinKhac/XemThongBao/GetXemThongBaoById/' + id)
      .pipe(
        map((response: any) => response.objData)
      );
  }

  getDanhSachXemThongBao(modelTimKiem: TimKiemDanhSach) {
    return this.http.post<any>(environment.baseUrlApi + '/ThongTinKhac/XemThongBao/GetDanhSach', modelTimKiem, this.httpOption)
      .toPromise()
      .then(data => data.objData)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CoQuanBanHanh } from 'src/app/models/danh-muc/co-quan-ban-hanh/co-quan-ban-hanh.model';
import { NhomDonVi, TimKiemModel } from 'src/app/models/danh-muc/nhom-don-vi/nhom-don-vi';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuanTriVanBanService {
  baseApiUrl: string = "https://localhost:7077/api";
  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getDanhSachCoQuan(timkiem: TimKiemModel) {
    return this.http.post<any>(this.baseApiUrl + '/DanhMuc/CoQuanBanHanh/GetDanhSachCoQuanBanHanh', timkiem, this.httpOption)
      .toPromise()
      .then(res => res.objData.listCoQuanBanHanh as CoQuanBanHanh[]);
  }

   /**
   * Lấy dữ liệu đơn vị
   */
   GetDonViById(id: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/DanhMuc/CoQuanBanHanh/GetCoQuanBanHanhById/' + id).pipe(
      map((response: any) => response.objData)
    );
  }

  //Thêm cơ quan
  addCoQuan(CQBH: CoQuanBanHanh): Observable<any> {
    return this.http.post<any>(this.baseApiUrl +'/DanhMuc/CoQuanBanHanh/ThemMoiCoQuanBH/', CQBH, this.httpOption);
  }

  //Cập nhật cơ quan
  CapNhatCoQuan(modelLienKet: any) {
    return this.http.post<any>(this.baseApiUrl + '/DanhMuc/CoQuanBanHanh/CapNhatCoQuanBH', modelLienKet, this.httpOption)
  }

  public xoaCoQuan(id: string): Observable<any> {
    const url = `${this.baseApiUrl}/DanhMuc/CoQuanBanHanh/DeleteCoQuanBH?id=` + id;
    return this.http.post<any>(url, this.httpOption)
  }
}

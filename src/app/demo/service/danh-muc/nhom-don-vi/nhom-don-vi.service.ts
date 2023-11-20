import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NhomDonVi, TimKiemModel } from 'src/app/models/danh-muc/nhom-don-vi/nhom-don-vi';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NhomDonViService {
  baseApiUrl: string = "https://localhost:7077/api";
  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getDanhSachNhomDonVi(timkiem: TimKiemModel) {
    return this.http.post<any>(this.baseApiUrl + '/DanhMuc/NhomDonVi/GetDanhSachNhomDonVi', timkiem, this.httpOption)
      .toPromise()
      .then(res => res.objData as NhomDonVi[]);
  }

  //Thêm cơ quan
  addNhomDonVi(CQBH: NhomDonVi): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/DanhMuc/NhomDonVi/ThemMoiNhomNguoiDung/', CQBH, this.httpOption);
  }

  /**
   * Lấy dữ liệu đơn vị
   */
  GetNhomDonViById(id: string): Observable<any> {
    const url = `${this.baseApiUrl}/DanhMuc/NhomDonVi/GetNhomDonViId?id=` + id;
    return this.http.get<any>(url).pipe(
      map((response: any) => response.objData)
    );
  }

  GetTenDonViById(id: string) {
    const url = `${this.baseApiUrl}/DanhMuc/NhomDonVi/GetNhomDonViId?id=` + id;
    return (
        this.http
            .get<any>(
              url
            )
            .toPromise()
            .then((data) => data.objData)
    );
}


  //Cập nhật cơ quan
  CapNhatNhomDonVi(modelLienKet: any) {
    return this.http.post<any>(this.baseApiUrl + '/DanhMuc/NhomDonVi/CapNhatNhomNguoiDung', modelLienKet, this.httpOption)
  }


  public xoaNhomDonVi(id: string): Observable<any> {
    const url = `${this.baseApiUrl}/DanhMuc/NhomDonVi/DeleteNhomNguoiDung?id=` + id;
    return this.http.post<any>(url, this.httpOption)
  }

   /**
   * Lấy dữ liệu đơn vị tree
   */
   public GetDataDonVi(): Observable<any> {
    const url = `${this.baseApiUrl}/DanhMuc/NhomDonVi/GetDataDonVi`;
    return this.http.get(url);
  }

  addDonVi(model: any) {
    return this.http.post<any>(
        environment.baseUrlApi + '/VanBanDi/NhomDonVi/AddDonVi',
        model,
        this.httpOption
    );
}
}

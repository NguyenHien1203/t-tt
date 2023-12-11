import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NhomDonVi, TimKiemModel } from 'src/app/models/danh-muc/nhom-don-vi/nhom-don-vi';
import { QuanTriVanBanDen } from 'src/app/models/van-ban-den/quan-tri-van-ban.model';
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

  getDanhSachvanBan(timkiem: TimKiemModel) {
    return this.http.post<any>(this.baseApiUrl + '/VanBanDen/QuanTriVanBanDen/GetListQTriVanBanDen', timkiem, this.httpOption)
      .toPromise()
      .then(res => res.objData as QuanTriVanBanDen[]);
  }

  public getLoaiVanBan(id: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/VanBanDen/QuanTriVanBanDen/GetLoaiVanBan/' + id)
    .pipe(map((res: any)=> res.objData))
  }

  public getSoVanBan(id: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/VanBanDen/QuanTriVanBanDen/GetSoVanBan/' + id)
    .pipe(map((res: any) => res.objData))
  }


   /**
   * Lấy dữ liệu đơn vị
   */
   GetVanBanById(id: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/VanBanDen/QuanTriVanBanDen/GetVanBanById/' + id).pipe(
      map((response: any) => response.objData)
    );
  }

  //Thêm cơ quan
  // addCoQuan(CQBH: CoQuanBanHanh): Observable<any> {
  //   return this.http.post<any>(this.baseApiUrl +'/DanhMuc/CoQuanBanHanh/ThemMoiCoQuanBH/', CQBH, this.httpOption);
  // }

  //Cập nhật cơ quan
  CapNhatCoQuan(modelLienKet: any) {
    return this.http.post<any>(this.baseApiUrl + '/DanhMuc/CoQuanBanHanh/CapNhatCoQuanBH', modelLienKet, this.httpOption)
  }

  public xoaCoQuan(id: string): Observable<any> {
    const url = `${this.baseApiUrl}/DanhMuc/CoQuanBanHanh/DeleteCoQuanBH?id=` + id;
    return this.http.post<any>(url, this.httpOption)
  }

  public TaiVanBan(id: string): Observable<any> {
    const url = `${this.baseApiUrl}/VanBanDen/QuanTriVanBan/TaiFileZip?idFile=` + id;
    return this.http.get<any>(url, this.httpOption)
  }

  xoaVanBanDi(idVanBan: string, idDonViLamViec: string) {
    return this.http.get<any>(
        environment.baseUrlApi +
            '/VanBanDen/QuanTriVanBan/XoaVanBanDen?idVanBan=' +
            idVanBan +
            '&idDonViLamViec=' +
            idDonViLamViec
    );
}
}

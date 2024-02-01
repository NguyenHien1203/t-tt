import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
    GiaoCongViec,
    TimKiemDanhSachDXCV,
    TimKiemHSCV,
} from 'src/app/models/cong-viec/danh-sach-de-xuat-cong-viec';
import { environment } from 'src/environments/environment.development';
export class DanhSachDeXuatCongViecService  {
  private httpOption = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      }),
  };

  constructor(private http: HttpClient) {}

  getDanhSachDXCV(timKiemDanhSach: TimKiemDanhSachDXCV) {
      return this.http
          .post<any>(
              environment.baseUrlApi +
                  '/CongViec/DanhSachDeXuatCongViec/GetDanhSachDXCV',
              timKiemDanhSach,
              this.httpOption
          )
          .toPromise()
          .then((res) => res.objData as any[]);
  }

  getNguoiNhan(idDonViLamViec: string, userId: string) {
      return this.http
          .get<any>(
              environment.baseUrlApi +
                  '/CongViec/DanhSachBanGiaoCongViec/GetDanhSachNguoiNhan?idDonViLamViec=' +
                  idDonViLamViec +
                  '&UserId=' +
                  userId,
              this.httpOption
          )
          .toPromise()
          .then((res) => res.objData as any[]);
  }

  //Thêm CV
  addCoQuan(CQBH: GiaoCongViec): Observable<any> {
      return this.http.post<any>(
          environment.baseUrlApi +
              '/CongViec/DanhSachDeXuatCongViec/ThemMoiBGCV/',
          CQBH,
          this.httpOption
      );
  }

  /**
   * Lấy dữ liệu CV
   */
  GetDonViById(id: string): Observable<any> {
      return this.http
          .get<any>(
              environment.baseUrlApi +
                  '/DanhMuc/CoQuanBanHanh/GetCoQuanBanHanhById/' +
                  id
          )
          .pipe(map((response: any) => response.objData));
  }

  getCongViec(id: string) {
      return this.http
          .get<any>(
              environment.baseUrlApi +
                  '/CongViec/DanhSachDeXuatCongViec/GetCVDXById?id=' +
                  id
          )
          .toPromise()
          .then((data) => data.objData);
  }

  getHoSoCongViec(id: string) {
      return this.http
          .get<any>(
              environment.baseUrlApi +
                  '/CongViec/DanhSachDeXuatCongViec/GetDanhSachNguoiNhan?id=' +
                  id,
              this.httpOption
          )
          .toPromise()
          .then((res) => res.objData);
  }

  getCongViecPopUp(id: string) {
      return this.http
          .get<any>(
              environment.baseUrlApi +
                  '/CongViec/DanhSachDeXuatCongViec/GetCV?id=' +
                  id,
              this.httpOption
          )
          .toPromise()
          .then((res) => res.objData);
  }

  getVanban(id: string) {
      return this.http
          .get<any>(
              environment.baseUrlApi +
                  '/CongViec/DanhSachDeXuatCongViec/GetBGVB?id=' +
                  id,
              this.httpOption
          )
          .toPromise()
          .then((res) => res.objData);
  }

  getLstSelectHSCV(timkiem: TimKiemHSCV) {
      return this.http
      .post<any>(
          environment.baseUrlApi +
              '/CongViec/DanhSachBanGiaoCongViec/GetLstSelectHSCV',
              timkiem,
          this.httpOption
      )
      .toPromise()
      .then((res) => res.objData as any[]);
  }
}

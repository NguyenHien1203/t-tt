import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { LienKet } from 'src/app/models/danh-muc/lien-ket/lien-ket';
import { TimKiemDanhSachLienKet } from 'src/app/models/danh-muc/lien-ket/lien-ket';
import { AuthService } from 'src/app/common/auth.services';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root',
})
export class LienKetService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private router: Router
    ) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
    }

    getDanhSachDmLienKet(timKiemDanhSach: TimKiemDanhSachLienKet) {
        return this.http
            .post<any>(
                environment.baseUrlApi + '/DanhMuc/DanhMucLienKet/GetDanhSach',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData.listDanhSach as LienKet[]);
    }
    getDmLienKetById(id: string) {
        return (
            this.http
                .get<any>(
                    environment.baseUrlApi +
                        '/DanhMuc/DanhMucLienKet/GetDanhMucLienKetById/' +
                        id
                )
                // .pipe(
                //   map((response: any) => response.objData)
                // );
                .toPromise()
                .then((data) => data.objData)
        );
    }

    themMoiLienKet(modelLienKet: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/DanhMuc/DanhMucLienKet/ThemMoiDanhMucLienKet',
            modelLienKet,
            this.httpOption
        );
    }

    capNhatLienKet(modelLienKet: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/DanhMuc/DanhMucLienKet/CapNhatDanhMucLienKet',
            modelLienKet,
            this.httpOption
        );
    }

    xoaLienKet(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/DanhMuc/DanhMucLienKet/DeleteDanhMucLienKet/' +
                id
        );
    }
}

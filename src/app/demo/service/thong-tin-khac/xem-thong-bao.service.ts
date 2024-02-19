import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/common/auth.services';
import {
    TimKiemDanhSach,
    XemThongBao,
} from 'src/app/models/thong-tin-khac/xem-thong-bao';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class XemThongBaoService {
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

    getXemThongBaoId(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/XemThongBao/GetXemThongBaoById/' +
                    id
            )
            .pipe(map((response: any) => response.objData));
    }

    getFile(id: string) {
        const headers = new HttpHeaders().set(
            'Accept',
            'application/octet-stream'
        );
        return this.http.get(
            environment.baseUrlApi + '/ThongTinKhac/XemThongBao/GetFile/' + id,
            {
                headers,
                responseType: 'blob', // Xác định responseType là 'blob'.
            }
        );
    }

    getDanhSachXemThongBao(modelTimKiem: TimKiemDanhSach) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/ThongTinKhac/XemThongBao/GetDanhSach',
                modelTimKiem,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData as XemThongBao[]);
    }
}

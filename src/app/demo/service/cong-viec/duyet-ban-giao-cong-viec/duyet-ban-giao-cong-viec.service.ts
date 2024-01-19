import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemDanhSachDBGCV } from 'src/app/models/cong-viec/duyet-ban-giao-cong-viec';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class DuyetBanGiaoCongViecService {
    private baseUrl = environment.baseUrlApi;
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private router: Router
    ) {}

    getDanhSachBGCV(timKiemDanhSach: TimKiemDanhSachDBGCV) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/CongViec/DuyetBanGiaoCongViec/GetDanhSachBGCV',
                timKiemDanhSach, 
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    /**
     * Duyệt công việc
     */
    public DuyetCongViec(IdVanBan: string): Observable<any> {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        const url =
            `${this.baseUrl}/CongViec/DuyetBanGiaoCongViec/DuyetCongViec?banGiaoId=` +
            IdVanBan;
        return this.http.post<any>(url, this.httpOption);
    }

    public TuChoiDuyetCongViec(IdVanBan: string, NoiDung: string): Observable<any> {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        const url =
            `${this.baseUrl}/CongViec/DuyetBanGiaoCongViec/TuChoiDuyetCongViec?banGiaoId=` +
            IdVanBan + '?noiDung=' + NoiDung;
        return this.http.post<any>(url, this.httpOption);
    }
}


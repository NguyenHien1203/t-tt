import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class CapNhatMoiService {
    private baseUrl = environment.baseUrlApi;
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    constructor(
        private httpClient: HttpClient,
        private auth: AuthService,
        private router: Router

    ) { }

    /**
    * Lấy dữ liệu danh sách sổ văn bản
    */
    public GetDataSoVanBan(): Observable<any> {
        if (!this.auth.CheckLogin())
            this.router.navigate(['/login']);
        var DviLamViec = this.auth.GetDonViLamViec()
        const url = `${this.baseUrl}/VanBanDen/CapNhatMoiVanBanDen/GetDataSoVanBan?IdDonViLamViec=` + DviLamViec;
        return this.httpClient.get<any>(url);
    }

    /**
    * Lấy dữ liệu danh sách loại văn bản theo sổ văn bản
    */
    public GetDataLoaiVanBanByIdSoVanBan(IdSoVanBan: string): Observable<any> {
        if (!this.auth.CheckLogin())
            this.router.navigate(['/login']);
        var DviLamViec = this.auth.GetDonViLamViec()
        const url = `${this.baseUrl}/VanBanDen/CapNhatMoiVanBanDen/GetDataLoaiVanBanByIdSoVanBan?IdSoVanBan=` + IdSoVanBan;
        return this.httpClient.get<any>(url);
    }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/common/auth.services';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class TopbarService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    userId: string = this.authService.GetmUserInfo()?.userId;
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    getDanhSachThongBao() {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/Menu/MenuTopBar/GetDanhSachThongBao/' +
                    this.userId,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }
    
    getDanhSachHopThuDen() {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/Menu/MenuTopBar/GetDanhSachHopThuDen/' +
                    this.userId,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }
}

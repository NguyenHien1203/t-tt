import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class LuuTruCoQuanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachLuuTruHoSoCoQuan(idUser: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/LuuTruHoSoCoQuan/GetDanhSachLuuTruCoQuan/' +
                    idUser,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
}

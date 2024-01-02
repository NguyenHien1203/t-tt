import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class BieuDoThongKeTheoBangService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDaTaBieuDo(idDonVi: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ThongKeNhiemVu/BieuDoThongKeTheoBang/GetDataNhiemVu/' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
}

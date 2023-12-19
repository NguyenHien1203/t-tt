import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class DoiMatKhauService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    doiMatKhau(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/DoiMatKhau/ThayDoiMatKhau',
            itemData,
            this.httpOption
        );
    }
}

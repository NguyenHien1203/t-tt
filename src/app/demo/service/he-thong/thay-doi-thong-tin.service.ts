import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ThayDoiThongTinService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getThongTinNguoiDung(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/ThayDoiThongTin/GetThongTinUser/' +
                    id
            )
            .toPromise()
            .then((data) => data.objData);
    }

    thayDoiThongTin(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/ThayDoiThongTin/CapNhatThongTin',
            itemData,
            this.httpOption
        );
    }

    getAnh(filePath: string) {
        return this.http.get(
            environment.baseUrlApi +
                '/HeThong/ThayDoiThongTin/GetImage?filePath=' +
                filePath,
            { responseType: 'blob' }
        );
    }
}

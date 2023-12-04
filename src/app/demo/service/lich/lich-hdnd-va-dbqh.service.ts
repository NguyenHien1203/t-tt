import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemLichHDNDVaDBQH } from 'src/app/models/thong-tin-khac/lich/lich-hdnd-va-dbnd';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LichHdndVaDbqhService {
  private httpOption = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
constructor(private http: HttpClient) {}

getDanhSachLichHDNDVaDBQH(timKiemDanhSach: TimKiemLichHDNDVaDBQH) {
    return this.http
        .post<any>(
            environment.baseUrlApi +
                '/Lich/LichHDNDVaDBQH/GetDanhSachLichHDNDVaDBQH',
            timKiemDanhSach,
            this.httpOption
        )
        .toPromise()
        .then((res) => res.objData);
}

getLichHDNDVaDBQHById(idLichHDNDVaDBQH: string) {
    return this.http
        .get<any>(
            environment.baseUrlApi +
                '/Lich/LichHDNDVaDBQH/GetLichHDNDVaDBQHById/' +
                idLichHDNDVaDBQH,
            this.httpOption
        )
        .toPromise()
        .then((res) => res.objData);
}

capNhatLichHDNDVaDBQH(itemData: any) {
    return this.http.post<any>(
        environment.baseUrlApi + '/Lich/LichHDNDVaDBQH/CapNhatLichHDNDVaDBQH',
        itemData,
        this.httpOption
    );
}

themMoiLichHDNDVaDBQH(itemData: any) {
    return this.http.post<any>(
        environment.baseUrlApi + '/Lich/LichHDNDVaDBQH/ThemMoiLichHDNDVaDBQH',
        itemData,
        this.httpOption
    );
}

themMoiLichHDNDVaDBQHTuImportFile(itemData: any) {
    return this.http.post<any>(
        environment.baseUrlApi +
            '/Lich/LichHDNDVaDBQH/ThemMoiLichHDNDVaDBQHTuImportFile',
        itemData,
        this.httpOption
    );
}

xoaLichHDNDVaDBQH(idLichHDNDVaDBQH: string) {
    return this.http.get<any>(
        environment.baseUrlApi +
            '/Lich/LichHDNDVaDBQH/XoaLichHDNDVaDBQH/' +
            idLichHDNDVaDBQH,
        this.httpOption
    );
}
}

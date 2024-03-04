import { environment } from 'src/environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class UploadImageService {
    constructor(private http: HttpClient) {}

    uploadImage(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');

        return this.http.post<any>(
            environment.baseUrlApi +
                '/TraoDoiThongTin/SoanThu/UpLoadImageCkeditor',
            formData,
            { headers }
        );
    }
}

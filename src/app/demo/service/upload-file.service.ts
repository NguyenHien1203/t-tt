import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { FileUploadModel } from 'src/app/models/file-upload-model';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class UploadFileService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/*',
        }),
    };
    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private router: Router
    ) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
    }

    postFile(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        return this.http.post(
            environment.baseUrlApi + '/ThongTinKhac/QuanLyThongBao/UploadFile',
            formData
        );
    }

    uploadFile(file: any, urlUpload: string): any {
        if (file) {
            const formData = new FormData();
            formData.append('file', file, file.name);
            return this.http.post(environment.baseUrlApi + urlUpload, formData);
        }
    }

    uploadMultipleFiles(file: any, url: string): any {
        if (file) {
            const formData = new FormData();
            formData.append('file', file, file.name);
            return this.http.post(environment.baseUrlApi + url, formData);
        }
    }

    uploadMutipleFile(file: any): any {
        if (file) {
            const formData = new FormData();
            formData.append('file', file, file.name);
            return this.http.post(
                environment.baseUrlApi +
                    '/VanBanDen/CapNhatMoiVanBanDen/UploadMutipleFile',
                formData
            );
        }
    }

    uploadMutipleFile_XLCV(file: any): any {
        if (file) {
            const formData = new FormData();
            formData.append('file', file, file.name);
            return this.http.post(
                environment.baseUrlApi +
                    '/CongViec/XuLyCongViec/UploadMutipleFile',
                formData
            );
        }
    }

    uploadFiles(file: any, urlUpload: string): any {
        if (file) {
            const formData = new FormData();
            formData.append('file', file, file.name);
            return this.http.post(environment.baseUrlApi + urlUpload, formData);
        }
    }

    downloadFile(filePath: string, fileName: string, urlDownLoad: string) {
        const headers = new HttpHeaders().set(
            'Accept',
            'application/octet-stream'
        );
        return this.http.get(
            environment.baseUrlApi +
                urlDownLoad +
                '?filePath=' +
                filePath +
                '&fileName=' +
                fileName,
            {
                headers,
                responseType: 'blob', // Xác định responseType là 'blob'.
            }
        );
    }
}

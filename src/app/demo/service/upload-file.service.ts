import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadModel } from 'src/app/models/file-upload-model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  postFile(id_alteracion: string, file: File, catalogacion: any): Observable<any> {
    let url = environment.baseUrlApi + '/';
    url += "QuanLyThongBao/UploadFile/" + id_alteracion;

    const formData: FormData = new FormData();

    formData.append('json', JSON.stringify(catalogacion));
    formData.append('documento', file.name);
    // for (let file of filesToUpload) {
    //   formData.append('documento', file.data, file.data.name);
    // }

    console.log(formData);

    let headers = new HttpHeaders();

    return this.http.post(url, formData, { headers: headers });
  }
}

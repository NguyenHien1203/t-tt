import { saveAs } from 'file-saver';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { KyPhieuTrinhService } from 'src/app/demo/service/ho-so-cong-viec/ky-phieu-trinh.service';
import { FileModel } from 'src/app/models/file-upload-model';
import { modelOptions } from 'src/app/models/option-model';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';

@Component({
  selector: 'app-xu-ly',
  templateUrl: './xu-ly.component.html',
  styleUrls: ['./xu-ly.component.scss']
})
export class XuLyComponent {
  @Input() show: boolean = false;
  @Input() id: string = '1';
  @Output() tatPopup = new EventEmitter<boolean>();

  constructor(
      private fb: FormBuilder,
      private service: KyPhieuTrinhService,
      private messageService: MessageService,
      private authService: AuthService,
      private cd: ChangeDetectorRef,
      private fileService: UploadFileService,
  ) {}

  phieuTrinh: any;
  yKienLanhDao: string = '';
  lstFileDuThao: FileModel[] = [];
  lstFileLienQuan: FileModel[] = [];
  lstlanhDaoKy: modelOptions[] = [];
  lstLanhDaoDuyet: modelOptions[] = [];
  lstVanBanLienQuan: modelOptions[] = [];
  idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
  idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
  userFullName: string = this.authService.GetmUserInfo()?.fullName ?? '0';
  idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
  submitted: boolean = false;

  public async BindDialogData() {
      this.phieuTrinh = await this.service.getPhieuTrinhById(this.id);
  }

  public Thoat(): void {
      this.submitted = false;
      this.show = false;
      this.tatPopup.emit(this.show);
      this.cd.detectChanges();
  }

  public XuLy(loai: string) {
      let itemData = {
          id: this.id,
          loai: loai,
          yKienLanhDaoThongQua: this.yKienLanhDao,
      };
      this.service.xuLyPhieuTrinh(itemData).subscribe((data) => {
          if (data.isError)
              this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: data.title,
              });
          else {
              this.messageService.add({
                  severity: 'success',
                  summary: 'success',
                  detail: data.title,
              });
              this.Thoat();
          }
      });
  }

  public DownloadFile(filepath: string, filename: string) {
    let urlDownLoad = '/HoSoCongViec/PhieuTrinh/DownloadFile';
    this.fileService
        .downloadFile(filepath, filename, urlDownLoad)
        .subscribe(
            (data) => {
                const blob = new Blob([data], {
                    type: 'application/octet-stream',
                });
                saveAs(blob, filename);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Tải tệp thành công',
                });
            },
            (error: any) => {
                if (error.status === 404) {
                    // Xử lý lỗi 404 (NotFound)
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Không tìm thấy đường dẫn file',
                    });
                    // Ví dụ: Hiển thị thông báo lỗi cho người dùng
                } else {
                    // Xử lý các lỗi khác
                    console.error('Đã xảy ra lỗi', error);
                    // Thực hiện các hành động tương ứng
                }
                return throwError(() => error);
            }
        );
}
}

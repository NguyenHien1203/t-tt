import { saveAs } from 'file-saver';
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { ThemMoiPhieuTrinhService } from 'src/app/demo/service/ho-so-cong-viec/them-moi-phieu-trinh.service';
import { FileModel } from 'src/app/models/file-upload-model';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
@Component({
    selector: 'app-chi-tiet-phieu-trinh',
    templateUrl: './chi-tiet-phieu-trinh.component.html',
    styleUrls: ['./chi-tiet-phieu-trinh.component.scss'],
})
export class ChiTietPhieuTrinhComponent {
    @Input() show: boolean = false;
    @Input() id: string = '1';
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private service: ThemMoiPhieuTrinhService,
        private messageService: MessageService,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private fileService: UploadFileService
    ) {}

    phieuTrinh: any;
    yKienLanhDao: string = '';
    lstFileDuThao: FileModel[] = [];
    lstFileLienQuan: FileModel[] = [];
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

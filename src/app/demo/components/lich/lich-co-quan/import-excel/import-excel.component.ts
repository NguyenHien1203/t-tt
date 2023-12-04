import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { LichCoQuanService } from 'src/app/demo/service/lich/lich-co-quan.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-import-excel',
    templateUrl: './import-excel.component.html',
    styleUrls: ['./import-excel.component.scss'],
})
export class ImportExcelComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private fb: FormBuilder,
        private service: LichCoQuanService,
        private messageService: MessageService,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private fileService: UploadFileService
    ) {}
    file: any = null;
    lstLichImport: any[] = [];
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idNhomQuyen: string = this.authService.GetmUserInfo()?.nhomQuyenId ?? '0';
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    submitted: boolean = false;
    checkXuatBan: boolean = false;

    public Thoat(): void {
        this.submitted = false;
        this.lstLichImport = [];
        this.file = null;
        this.show = false;
        this.tatPopup.emit(this.show);
        this.cd.detectChanges();
    }

    onChange(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            let urlUpload = '/Lich/LichCoQuan/UploadFile';
            this.fileService.uploadFile(file, urlUpload).subscribe({
                next: (data) => {
                    if (data.isError)
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: data.title,
                        });
                    else {
                        this.lstLichImport = data.objData.lstLich;
                        this.file = { fileName: data.objData.fileName };
                        this.messageService.add({
                            severity: 'info',
                            summary: 'Info',
                            detail: data.title,
                        });
                    }
                },
                error: (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Có lỗi xảy ra',
                    });
                    return throwError(() => error);
                },
            });
        }
    }

    public TaiMau() {
        let urlDownLoad = '/Lich/LichCoQuan/TaiMau';
        this.service.taiMauExcel(urlDownLoad).subscribe(
            (data) => {
                const blob = new Blob([data], {
                    type: 'application/octet-stream',
                });
                saveAs(blob, 'LichPBTemplate.xlsx');
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

    public ThemMoi(): void {
        this.submitted = true;
        let trangThai = this.checkXuatBan
            ? trangThaiXuatBan.xuatBan
            : trangThaiXuatBan.choDuyet;
        const lstLichCoQuan = this.lstLichImport
            .filter((dt) => dt.trangThaiImport == true)
            .map((data) => {
                return {
                    ...data,
                    nguoiTao: this.idUser,
                    donViId: this.idDonViLamViec,
                    trangThai: trangThai,
                };
            });
        this.service.themMoiLichCoQuanTuImportFile(lstLichCoQuan).subscribe(
            (data) => {
                if (data.isError) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.title,
                    });
                } else {
                    this.file = null;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: data.title,
                    });
                    this.Thoat();
                }
            },
            (error) => {
                console.log('Error', error);
            }
        );
    }

    public Reset() {
        this.file = null;
        this.lstLichImport = [];
    }
}

const trangThaiXuatBan = {
    choDuyet: 1,
    duyet: 2,
    tuChoi: 3,
    xuatBan: 4,
};

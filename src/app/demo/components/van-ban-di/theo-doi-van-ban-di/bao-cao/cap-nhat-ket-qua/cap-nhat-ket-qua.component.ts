import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { TheoDoiVanBanDiService } from 'src/app/demo/service/van-ban-di/theo-doi-van-ban-di.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-cap-nhat-ket-qua',
    templateUrl: './cap-nhat-ket-qua.component.html',
    styleUrls: ['./cap-nhat-ket-qua.component.scss'],
    providers: [MessageService],
})
export class CapNhatKetQuaComponent {
    @Input() show: boolean = false;
    @Input() loaiBaoCao: number = 0;
    @Input() idDonViNhan: string = '0';
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() id: string = '1';

    constructor(
        private service: TheoDoiVanBanDiService,
        private messageService: MessageService,
        private authService: AuthService,
        private fb: FormBuilder,
        private uploadFileService: UploadFileService
    ) {}

    donViCaNhanTraLoi: string = '';
    idVanBanTraLoi: string = '';
    lstVanBanTraLoi: any[] = [];
    lstFileKetQuaBaoCao: any[] = [];
    file: File | null = null;
    dataFile: any;
    loading: boolean = false;
    selectedFiles: any[] = [];
    submitted: boolean = false;
    idDonViLamViec = this.authService.GetDonViLamViec() ?? '0';
    formTheoDoiVanBan = this.fb.group({
        ngayBaoCao: ['', []],
        ngayBatDau: ['', []],
        ngayKetThuc: ['', []],
    });

    public BindDataDialog() {
        this.donViCaNhanTraLoi = this.authService.GetmUserInfo().tenDonVi ?? '';

        this.service
            .getDanhSachBaoCaoVanBanTraLoi(
                this.id,
                this.idDonViLamViec,
                this.idDonViNhan,
                this.loaiBaoCao
            )
            .then((data) => {
                this.lstVanBanTraLoi = data;
                console.log(data);
            });

        this.service
            .getFileKetQuaBaoCao(this.id, this.idDonViNhan)
            .then((data) => {
                if (data != null) {
                    this.selectedFiles = data.map((file) => {
                        return { ...file, isNew: false, isDelete: false };
                    });
                }
            });
    }

    public ThoatBaoCao(): void {
        this.formTheoDoiVanBan.reset();
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public onFileSelected(event: any) {
        const FileInput: File = event.target.files[0];

        if (FileInput) {
            let urlSave = '/VanBanDi/TheoDoiVanBanDi/UpLoadFile';
            this.uploadFileService.uploadFiles(FileInput, urlSave).subscribe({
                next: (data) => {
                    if (data.isError)
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Tải lên thất bại',
                        });
                    else {
                        this.file = FileInput;
                        this.messageService.add({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Tải lên thành công',
                        });
                        const fileReturn = {
                            fileName: data.objData.fileName,
                            filePath: data.objData.filePath,
                            isNew: true,
                            isDelete: false,
                        };
                        this.selectedFiles.push(fileReturn);
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

    public DownloadFile(filepath: string, filename: string) {
        let urlDownLoad = '/VanBanDi/CapNhatMoi/DownloadFile';
        this.uploadFileService
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

    public XoaFile(filePath: string): void {
        this.selectedFiles.forEach((obj, index) => {
            if (obj.fileName === filePath) {
                obj.isDelete = true; // Xóa đối tượng thỏa mãn điều kiện
                obj.isNew = false;
            }
        });
    }

    public CapNhatKetQua(): void {
        this.submitted = true;
        let itemData = {
            idVanBan: this.id,
            idDonViNhan: this.idDonViNhan?.toString(),
            idVanBanTraLoi: this.idVanBanTraLoi?.toString(),
            lstFile: this.selectedFiles,
        };
        this.service.capNhatKetQuaBaoCao(itemData).subscribe(
            (data) => {
                if (data.isError) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.title,
                    });
                } else {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: data.title,
                    });
                    this.ThoatBaoCao();
                }
            },
            (error) => {
                console.log('Error', error);
            }
        );
    }
}

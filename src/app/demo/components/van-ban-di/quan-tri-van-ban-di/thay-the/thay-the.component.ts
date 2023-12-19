import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-di/cap-nhat-moi.service';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';

@Component({
    selector: 'app-thay-the',
    templateUrl: './thay-the.component.html',
    styleUrls: ['./thay-the.component.scss'],
})
export class ThayTheComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() id: string = '1';

    constructor(
        private service: CapNhatMoiService,
        private messageService: MessageService,
        private authService: AuthService,
        private uploadFileService: UploadFileService
    ) {}

    lyDoThayThe: string = '';
    loading: boolean = false;
    ThongTinVanBan: any;
    lstSelectedVanBan: any[] = [];
    hienThiChonVanBan: boolean = false;
    keyWord: string = '';
    ThongTinFile: any[] = [];
    submitted: boolean = false;
    idDonViLamViec = this.authService.GetDonViLamViec() ?? '0';
    userName = this.authService.GetmUserInfo()?.userName;
    userId = this.authService.GetmUserInfo()?.userId;
    idPhongBan = this.authService.GetmUserInfo()?.phongBanId;

    public async BindDataDialog() {
        this.lstSelectedVanBan = [];
        this.lyDoThayThe = '';
        this.service.getVanBanById(this.id).then(
            (data) => {
                if (data.isError) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.title,
                    });
                } else {
                    this.ThongTinVanBan = data.objVanBan;
                    this.ThongTinFile = data.lstFile;
                }
            },
            (error) => {
                console.log('Error', error);
            }
        );
    }

    public Thoat(): void {
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public ThoatChonVanban(itemHt: any, loai: string): void {
        if (loai === 'C') this.hienThiChonVanBan = false;
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

    public ChonVanban(event: any) {
        this.lstSelectedVanBan = event;
    }

    public OpenChonVanBan() {
        this.hienThiChonVanBan = true;
    }

    public XoaVanBan(idVanBan: string) {
        this.lstSelectedVanBan = this.lstSelectedVanBan
            .filter((vb) => vb.id != idVanBan)
            .map((vb) => vb);
    }

    public ThayTheVanBan(): void {
        this.submitted = true;
        let itemData: any = {
            idVanBan: this.id?.toString(),
            idDonViLamViec: this.authService.GetDonViLamViec(),
            lyDoThuHoi: this.lyDoThayThe,
            lstVanBanDaChon: this.lstSelectedVanBan.map((vb) => vb.id),
        };

        this.service.thayTheVanBan(itemData).subscribe(
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
                    this.Thoat();
                }
            },
            (error) => {
                console.log('Error', error);
            }
        );
    }
}

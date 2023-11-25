import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { SoanThuService } from 'src/app/demo/service/trao-doi-thong-tin/soan-thu.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
@Component({
    selector: 'app-chi-tiet-hop-thu',
    templateUrl: './chi-tiet-hop-thu.component.html',
    styleUrls: ['./chi-tiet-hop-thu.component.scss'],
})
export class ChiTietHopThuComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() idHopThu: string = '1';
    @Input() idNhanCaNhan: number = 0;
    @Input() checkThuDen: number = 0;
    @Input() checkThuNhap: number = 0;

    constructor(
        private service: SoanThuService,
        private messageService: MessageService,
        private cd: ChangeDetectorRef,
        private uploadfileService: UploadFileService,
        private authService: AuthService
    ) {}

    typebtn: number = 1;
    lblPhanHoi: string = '';
    btnPhanHoi: boolean = false;
    btnChuyenTiep: boolean = false;
    btnXemNguoiDoc: boolean = false;
    xemHopThu: any;
    selectedFiles: any[] = [];
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    public async BindDialogData() {
        const data = await this.service.getChiTietHopThuById(
            this.idHopThu,
            this.idUser
        );

        let itemData = data.objHopThu;
        if (itemData != null) {
            itemData.ngayGui = new Date(itemData.ngayGui);
            this.xemHopThu = {
                thongTinNguoiGui: itemData.thongTinNguoiGui,
                guiToi: itemData.usersTraoDoi,
                tieuDe: itemData.tieuDe,
                noiDung: itemData.noiDung,
                ngayGui: itemData.ngayGui,
            };
        }
        this.selectedFiles = data.lstFile;
        this.AllowAction();
    }

    public DownloadFile(filepath: string, filename: string) {
        let urlDownLoad = '/TraoDoiThongTin/SoanThu/DownloadFile';
        this.uploadfileService
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

    public ThoatChiTiet(): void {
        this.show = false;
        this.tatPopup.emit(this.show);
        this.cd.detectChanges();
    }

    public AllowAction(): void {
      console.log(this.idNhanCaNhan)
        if (this.idNhanCaNhan == 9) {
            this.typebtn = 1;
            this.lblPhanHoi = 'Phản hồi';
            this.btnPhanHoi = true;
            this.btnChuyenTiep = true;
        }
        //
        if (this.idNhanCaNhan == 10) {
            this.btnChuyenTiep = true;
            this.btnXemNguoiDoc = true;
        }
        //
        if (this.idNhanCaNhan == 11) {
            this.typebtn = 3;
            this.lblPhanHoi = 'Gửi';
            this.btnPhanHoi = true;
        }
        if (this.idNhanCaNhan > 11) {
            if (this.checkThuDen == 1) {
                this.typebtn = 1;
                this.lblPhanHoi = 'Phản hồi';
                this.btnPhanHoi = true;
            }

            if (this.checkThuNhap == 1) {
                this.typebtn = 3;
                this.lblPhanHoi = 'Gửi';
                this.btnPhanHoi = true;
            }
            this.btnChuyenTiep = true;
            this.btnXemNguoiDoc = true;
        }
    }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { TheoDoiVanBanDiService } from 'src/app/demo/service/van-ban-di/theo-doi-van-ban-di.service';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-theo-doi',
    templateUrl: './theo-doi.component.html',
    styleUrls: ['./theo-doi.component.scss'],
    providers: [MessageService],
})
export class TheoDoiComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() id: string = '1';

    constructor(
        private service: TheoDoiVanBanDiService,
        private messageService: MessageService,
        private authService: AuthService,
        private fb: FormBuilder,
        private uploadFileService: UploadFileService
    ) {}

    isShowTable: boolean = false;
    loading: boolean = false;
    iconClass = 'pi pi-plus';
    checkAllItem = 'checkAllItem';
    isHienThi: boolean = false;
    ThongTinVanBan: any;
    keyWord: string = '';
    treeData: any[] = [];
    ThongTinFile: any[] = [];
    isCheckedAll: boolean = false;
    isShowAll: boolean = false;
    lstDonViDaGui: any[] = [];
    submitted: boolean = false;
    idDonViLamViec = this.authService.GetDonViLamViec() ?? '0';
    formTheoDoiVanBan = this.fb.group({
        ngayBaoCao: [, []],
        ngayBatDau: [, []],
        ngayKetThuc: [, []],
    });

    public BindDataDialog() {
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

        this.service
            .getDonViDaGui('0', this.authService.GetDonViLamViec(), this.id)
            .then(
                (data) => {
                    console.log(data)
                    this.lstDonViDaGui = data;
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

    public TheoDoiVanBan(): void {
        this.submitted = true;

        // if (this.lstDonViNhan.length == 0) {
        //     this.messageService.add({
        //         severity: 'error',
        //         summary: 'Error',
        //         detail: 'Yêu cầu chọn đơn vị gửi',
        //     });
        //     return;
        // }
        let itemData: any = {
            idVanBan: this.id?.toString(),
            donViId: this.authService.GetDonViLamViec(),
            doAction: 'guivanban',
            lyDoThuHoi: '',
        };

        this.service.theoDoiVanBanDi(itemData).subscribe(
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

    public ToggleTable() {
        this.isShowTable = !this.isShowTable;
    }

    public checkItem() {}

    public checkAll() {}
}

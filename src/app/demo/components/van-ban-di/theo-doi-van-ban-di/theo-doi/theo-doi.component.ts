import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { TheoDoiVanBanDiService } from 'src/app/demo/service/van-ban-di/theo-doi-van-ban-di.service';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

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

    isCheckedAllGuiVb: boolean = false;
    isCheckedAllVbTraLoi: boolean = false;
    isShowTable: boolean = false;
    loading: boolean = false;
    ThongTinVanBan: any;
    ThongTinFile: any[] = [];
    isShowAll: boolean = false;
    lstDonViDaGui: any[] = [];
    submitted: boolean = false;
    idDonViLamViec = this.authService.GetDonViLamViec() ?? '0';
    formTheoDoiVanBan = this.fb.group({
        ngayBaoCao: ['', [Validators.required]],
        ngayBatDau: ['', [Validators.required]],
        ngayKetThuc: ['', [Validators.required]],
    });

    public async BindDataDialog() {
        const data = await this.service.getVanBanById(this.id);
        this.ThongTinVanBan = data.objVanBan;
        this.ThongTinFile = data.lstFile;

        const lstPhongBanSelected =
            await this.service.getDanhSachPhongBanSelected(
                this.authService.GetDonViLamViec(),
                this.id
            );

        const lstBaoCaoSelected = await this.service.getDanhSachBaoCaoSelected(
            this.id
        );

        const lstPhongBanSelectedId = lstPhongBanSelected.map((pb) => pb.id);
        const lstDonViDaGui = await this.service.getDonViDaGui(
            '0',
            this.authService.GetDonViLamViec(),
            this.id
        );
        this.lstDonViDaGui = lstDonViDaGui.map((data) => {
            return {
                ...data,
                checkedPhongBan: lstPhongBanSelectedId.includes(
                    Number(data.id)
                ),
                checkedBaoCao: lstBaoCaoSelected.includes(Number(data.id)),
            };
        });

        this.isCheckedAllGuiVb =
            this.lstDonViDaGui.filter((dv) => dv.checkedPhongBan == true)
                .length == lstPhongBanSelectedId.length &&
            lstPhongBanSelectedId.length > 0;
        this.isCheckedAllVbTraLoi =
            this.lstDonViDaGui.filter((dv) => dv.checkedBaoCao == true)
                .length == lstBaoCaoSelected.length &&
            lstBaoCaoSelected.length > 0;
    }

    public Thoat(): void {
        this.formTheoDoiVanBan.reset();
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
        const lstDonViGui = this.lstDonViDaGui;
        if (this.formTheoDoiVanBan.valid) {
            let itemData: any = {
                idVanBan: this.id?.toString(),
                idDonViLamViec: this.authService.GetDonViLamViec(),
                lstDonViDaNhanVanBan: lstDonViGui
                    .filter((dv) => dv.checkedPhongBan == true)
                    .map((dv) => dv.id),
                lstDonViGuiVanBanTraLoi: lstDonViGui
                    .filter((dv) => dv.checkedBaoCao == true)
                    .map((dv) => dv.id),
                ngayBaoCao: this.formTheoDoiVanBan.value.ngayBaoCao,
                ngayBatDau: this.formTheoDoiVanBan.value.ngayBatDau,
                ngayKetThuc: this.formTheoDoiVanBan.value.ngayKetThuc,
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
    }

    public ToggleTable() {
        this.isShowTable = !this.isShowTable;
    }

    public CheckAll(event) {
        this.lstDonViDaGui = this.lstDonViDaGui.map((data) => {
            return { ...data, checkedBaoCao: event };
        });
    }

    public CheckItem(event) {
        this.isCheckedAllVbTraLoi =
            this.lstDonViDaGui.filter((dv) => dv.checkedBaoCao == true)
                .length == this.lstDonViDaGui.length;
    }
}

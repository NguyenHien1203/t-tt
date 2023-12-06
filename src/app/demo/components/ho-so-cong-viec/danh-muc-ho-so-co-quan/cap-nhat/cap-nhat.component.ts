import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { DanhMucHoSoCoQuanService } from 'src/app/demo/service/ho-so-cong-viec/danh-muc-ho-so-co-quan.service';

@Component({
    selector: 'app-cap-nhat',
    templateUrl: './cap-nhat.component.html',
    styleUrls: ['./cap-nhat.component.scss'],
})
export class CapNhatComponent {
    @Input() id: string = '1';
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private service: DanhMucHoSoCoQuanService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    loading: boolean = true;
    selectedFiles: any[] = [];
    submitted: boolean = false;
    dataFile: any;
    file_fomat: any = [];
    vanBanDi: any = [];
    file: File | null = null;
    chkLienThong: boolean = false;
    chkHeThong: boolean = false;
    chkNoiBo: boolean = false;
    lstSoVanBan: any[] = [];
    lstLoaiVanBan: any[] = [];
    lstPhongBan: any[] = [];
    lstLanhDaoKy: any[] = [];
    lstMucDoVanBan: any[] = [
        { text: 'VB thường', value: 1 },
        { text: 'VB khẩn, hỏa tốc', value: 2 },
        { text: 'VB mật', value: 3 },
        { text: 'VB tuyệt mật', value: 4 },
        { text: 'VB tối mật', value: 5 },
    ];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    public formThongTinVanBan = this.formBuilder.group({
        id: [0, []],
    });
    oldSoDi: string = '0';
    oldSoVanBanId: string = '0';
    oldLoaiVanBanId: string = '';

    ngOnInit() {
        this.loading = false;
    }

    public async BindDialogData() {
        try {
            const data = await this.service.getDanhMucHoSoCoQuanId(this.id);
            let fileLoad = data.lstFile;
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Có lỗi xảy ra' + error,
            });
        }
    }

    public Thoat(): void {
        this.formThongTinVanBan.reset();
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public CapNhat() {
        this.submitted = true;

        if (this.formThongTinVanBan.valid) {
            this.vanBanDi = this.formThongTinVanBan.value;
            this.vanBanDi.chkVanBanLienThong = this.chkLienThong ? 1 : 0;
            this.vanBanDi.chkVanBanHeThong = this.chkHeThong ? 1 : 0;
            this.vanBanDi.chkVanBanNoiBo = this.chkNoiBo ? 1 : 0;
            this.vanBanDi.fileUpLoad = JSON.stringify(this.selectedFiles);
            this.vanBanDi.SoVanBanIdCu = this.oldSoVanBanId?.toString();
            this.vanBanDi.SoDiCu = this.oldSoDi?.toString();

            this.service.capNhatDanhMucHoSoCoQuan(this.vanBanDi).subscribe(
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
                (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Có lỗi xảy ra',
                    });
                    return throwError(() => error);
                }
            );
        }
    }
}

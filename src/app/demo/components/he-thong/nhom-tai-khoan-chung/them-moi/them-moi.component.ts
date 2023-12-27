import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { NhomTaiKhoanChungService } from 'src/app/demo/service/he-thong/nhom-tai-khoan-chung.service';

@Component({
    selector: 'app-them-moi',
    templateUrl: './them-moi.component.html',
    styleUrls: ['./them-moi.component.scss'],
})
export class ThemMoiComponent {
    @Input() id: string = '1';
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private service: NhomTaiKhoanChungService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    loading: boolean = true;
    submitted: boolean = false;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    public formThemMoi = this.formBuilder.group({
        id: [0, []],
        tenNhom: ['', []],
        moTa: ['', []],
        thuTu: [0, []],
        created: [new Date(), []],
        createdBy: [this.idUser, []],
    });

    public Thoat(): void {
        this.formThemMoi.reset();
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public BindDialogData() {
        this.service.getThuTu(this.idDonViLamViec).then((data) => {
            this.formThemMoi.patchValue({
                thuTu: data,
            });
        });
    }

    public ThemMoi() {
        this.submitted = true;

        if (this.formThemMoi.valid) {
            let itemData = this.formThemMoi.value;
            let nhomNguoiDung = {
                id: 0,
                donViId: this.idDonViLamViec,
                tenNhom: itemData.tenNhom,
                moTa: itemData.moTa,
                thuTu: itemData.thuTu,
                created: new Date(),
                createdBy: this.idUser,
            };

            this.service.themMoiTaiKhoanChung(nhomNguoiDung).subscribe(
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

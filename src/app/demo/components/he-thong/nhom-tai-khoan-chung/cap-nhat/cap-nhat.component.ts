import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { NhomTaiKhoanChungService } from 'src/app/demo/service/he-thong/nhom-tai-khoan-chung.service';

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
        private service: NhomTaiKhoanChungService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    loading: boolean = true;
    submitted: boolean = false;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    public formCapNhat = this.formBuilder.group({
        id: [0, []],
        tenNhom: ['', []],
        moTa: ['', []],
        thuTu: [0, []],
        created: [new Date(), []],
        createdBy: [this.idUser, []],
    });

    public Thoat(): void {
        this.formCapNhat.reset();
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public async BindDialogData() {
        try {
            const data = await this.service.getTaiKhoanChungById(this.id);
            this.formCapNhat.patchValue({
                id: data.id,
                tenNhom: data.tenNhom,
                moTa: data.moTa,
                thuTu: data.thuTu,
            });
        } catch (error) {
            console.log(error);
        }
    }

    public CapNhat() {
        this.submitted = true;

        if (this.formCapNhat.valid) {
            let itemData = this.formCapNhat.value;
            let nhomNguoiDung = {
                id: itemData.id,
                donViId: this.idDonViLamViec,
                tenNhom: itemData.tenNhom,
                moTa: itemData.moTa,
                thuTu: itemData.thuTu,
                created: new Date(),
                createdBy: this.idUser,
            };

            this.service.capNhatTaiKhoanChung(nhomNguoiDung).subscribe(
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

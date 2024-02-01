import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DoiMatKhauService } from 'src/app/demo/service/he-thong/doi-mat-khau.service';

@Component({
    selector: 'app-doi-mat-khau',
    templateUrl: './doi-mat-khau.component.html',
    styleUrls: ['./doi-mat-khau.component.scss'],
    providers: [MessageService],
})
export class DoiMatKhauComponent {
    constructor(
        private formBuilder: FormBuilder,
        private service: DoiMatKhauService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    isTrungKhop: boolean = false;
    submitted: boolean = false;
    items: any[] = [{ label: 'Hệ thống' }, { label: 'Đổi mật khẩu' }];
    home: any = { icon: 'pi pi-home', routerLink: '/' };
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    public formThongTin = this.formBuilder.group({
        matKhauCu: ['', [Validators.required]],
        matKhauMoi: ['', [Validators.required]],
        nhapLaiMatKhau: ['', [Validators.required]],
    });

    ngOnInit() {console.log(this.formThongTin.value);
    }

    public ThayDoi() {
        this.submitted = true;
        if (this.formThongTin.valid && !this.isTrungKhop) {
            let itemData = this.formThongTin.value;
            let doiMatKhau = {
                userId: this.idUser,
                matKhauMoi: itemData.matKhauMoi,
                matKhauCu: itemData.matKhauCu,
            };
            this.service.doiMatKhau(doiMatKhau).subscribe(
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
                    }
                },
                (error) => {
                    console.log('Error', error);
                }
            );
        }
    }

    public InputMatKhau() {
        let timeOut = 500;
        clearTimeout(timeOut);

        setTimeout(() => {
            if (
                this.formThongTin.value.nhapLaiMatKhau !== '' &&
                this.formThongTin.value.matKhauMoi !== ''
            ) {
                this.isTrungKhop =
                    this.formThongTin.value.matKhauMoi !==
                    this.formThongTin.value.nhapLaiMatKhau;
            }
            return false;
        }, timeOut);
    }
}

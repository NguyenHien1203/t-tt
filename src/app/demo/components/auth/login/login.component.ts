import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NguoiDungLogin } from 'src/app/models/he-thong/nguoi-dung';
import { DangNhapService } from 'src/app/demo/service/he-thong/dang-nhap.service';
import { AuthService } from 'src/app/common/auth.services';
import { Router } from '@angular/router';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';
import { Message, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { SpinnerService } from 'src/app/common/spinner.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    loader$ = this.spinnerService.loader$;
    valCheck: string[] = ['remember'];
    password!: string;
    nguoidung: NguoiDungLogin = {
        UserName: '',
        Password: '',
    };
    msgs: Message[] = [];
    returnUrl: string = '';
    messageRepose: string = '';
    submited = false;

    public hienThiQuenMatKhau: boolean = false;
    public formDangNhap = this.formBuilder.group({
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]],
        remember: [false, []],
    });

    constructor(
        private dangNhapService: DangNhapService,
        private router: Router,
        private authenService: AuthService,
        private formBuilder: FormBuilder,
        private service: MessageService,
        private cookieService: CookieService,
        private spinnerService: SpinnerService
    ) {}

    ngOnInit(): void {
        this.returnUrl = '/';
        const rememberedUser = localStorage.getItem('rememberedUser');

        if (rememberedUser) {
            const { userName, passWord } = JSON.parse(rememberedUser);
            this.formDangNhap.setValue({
                userName: userName ?? '',
                password: passWord  ?? '',
                remember: true,
            });
        }
        if (this.authenService.CheckLogin()) this.router.navigate(['/']);
        else this.router.navigate(['/login']);
    }

    public ForgotPassword() {
        this.hienThiQuenMatKhau = true;
    }

    get dangNhapFormControl() {
        return this.formDangNhap.controls;
    }

    public DangNhap() {
        this.spinnerService.show();
        this.submited = true;
        if (this.formDangNhap.valid) {
            this.nguoidung.UserName = this.formDangNhap.value.userName ?? '';
            this.nguoidung.Password = this.formDangNhap.value.password ?? '';

            this.dangNhapService.DangNhap(this.nguoidung).subscribe(
                (data) => {
                    if (data.isError) {
                        this.msgs = [];
                        this.msgs.push({
                            severity: 'error',
                            detail: 'Thông tin đăng nhập không hợp lệ',
                        });
                    } else {
                        if (this.formDangNhap.value.remember) {
                            let user = this.nguoidung.UserName;
                            let pass = this.nguoidung.Password;
                            
                            // Lưu thông tin đăng nhập vào localStorage
                            localStorage.setItem(
                                'rememberedUser',
                                JSON.stringify({ userName : user, passWord : pass })
                            );
                        } else {
                            // Xóa thông tin đăng nhập từ localStorage (nếu có)
                            localStorage.removeItem('rememberedUser');
                        }

                        this.cookieService.set('isLoggedIn', 'true');
                        this.cookieService.set(
                            'token',
                            JSON.stringify(data.objData)
                        );
                        this.cookieService.set(
                            'mUserInfo',
                            JSON.stringify(data.objNguoiDung)
                        );
                        this.cookieService.set(
                            'idDonViLamViec',
                            data.objNguoiDung.phongBanId
                        );

                        this.router.navigate([this.returnUrl]);
                    }
                },
                (error) => {
                    console.log('Error', error);
                }
            );
        }
        this.spinnerService.hide();
    }

    public Thoat(itemHt: any, loai: string) {
        if (loai == 'FG') this.hienThiQuenMatKhau = false;
    }
}

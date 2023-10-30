import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NguoiDungLogin } from 'src/app/models/he-thong/nguoi-dung';
import { DangNhapService } from 'src/app/demo/service/he-thong/dang-nhap.service';
import { AuthService } from 'src/app/common/auth.services';
import { Router } from '@angular/router';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';
import { Message, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    valCheck: string[] = ['remember'];
    password!: string;
    nguoidung: NguoiDungLogin = {
        UserName: '',
        Password: '',
    }
    msgs: Message[] = [];
    returnUrl: string = '';
    messageRepose: string = '';
    submited = false;

    public formDangNhap = this.formBuilder.group({
        userName: ["", [Validators.required]],
        password: ["", [Validators.required]]
    });

    constructor(
        private dangNhapService: DangNhapService,
        private router: Router,
        private authenService: AuthService,
        private formBuilder: FormBuilder,
        private service: MessageService,
        private cookieService: CookieService
    ) { }

    ngOnInit(): void {
        this.returnUrl = '/dashboard';
        if (this.authenService.CheckLogin())
            this.router.navigate(['/dashboard']);
        else
            this.router.navigate(['/login']);
    }

    get dangNhapFormControl() {
        return this.formDangNhap.controls;
    }

    public DangNhap() {
        this.submited = true;
        if (this.formDangNhap.valid) {
            this.nguoidung.UserName = this.formDangNhap.value.userName ?? '';
            this.nguoidung.Password = this.formDangNhap.value.password ?? '';

            this.dangNhapService.DangNhap(this.nguoidung).subscribe(data => {
                if (data.isError) {
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', detail: "Thông tin đăng nhập không hợp lệ" });
                } else {
                    this.cookieService.set('isLoggedIn', "true");
                    this.cookieService.set('token', data.objData);

                    // localStorage.setItem('isLoggedIn', "true");
                    // localStorage.setItem('token', data.objData);
                    this.router.navigate([this.returnUrl])
                }
            }, (error) => {
                console.log('Error', error);
            })

        }
    }
}
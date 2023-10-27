import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NguoiDungLogin } from 'src/app/models/he-thong/nguoi-dung';
import { DangNhapService } from 'src/app/demo/service/he-thong/dang-nhap.service';
import { AuthService } from 'src/app/common/auth.services';
import { Router } from '@angular/router';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
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

    returnUrl: string = '';
    messageRepose: string = '';
    submited = false;

    public formDangNhap = this.formBuilder.group({
        userName: ["", [Validators.required]],
        password: ["", [Validators.required]]
    });

    constructor(
        public layoutService: LayoutService,
        private dangNhapService: DangNhapService,
        private router: Router,
        private authenService: AuthService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.returnUrl = '/trang-chu';
        if (this.authenService.CheckLogin())
            this.router.navigate(['/trang-chu']);
        else
            this.router.navigate(['/auth/login']);
    }

    get dangNhapFormControl() {
        return this.formDangNhap.controls;
    }

    public DangNhap() {
        this.submited = true;
        if (this.formDangNhap.valid) {
            this.nguoidung.UserName = this.formDangNhap.value.userName ?? '';
            this.nguoidung.Password = this.formDangNhap.value.password ?? '';
            this.dangNhapService.DangNhap(this.nguoidung).subscribe((data: ResponeMessage) => {
                console.log('Đăng nhập thành công', data);
                localStorage.setItem('isLoggedIn', "true");
                localStorage.setItem('token', data.objData);
                this.router.navigate([this.returnUrl])
            }, error => {
                if (error.status == 401) {
                    this.messageRepose = 'Tài khoản hoặc mật khẩu không chính xác';
                }
                if (error.status == 0) {
                    this.messageRepose = 'Lỗi kết nối';
                }
                console.log(error)
            })
        }
        console.log(this.formDangNhap.value);
    }
}
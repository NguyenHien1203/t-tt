import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DanhSachBanGiaoCongViecService } from 'src/app/demo/service/cong-viec/danh-sach-ban-giao-cong-viec/danh-sach-ban-giao-cong-viec.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';

@Component({
    selector: 'app-ban-giao-cong-viec',
    templateUrl: './ban-giao-cong-viec.component.html',
    styleUrls: ['./ban-giao-cong-viec.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class BanGiaoCongViecComponent {
    constructor(
        // private taikhoanService: TaiKhoanService,
        private service: DanhSachBanGiaoCongViecService,
        private formBuilder: FormBuilder,
        private fileService: UploadFileService,
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService,
        private route: ActivatedRoute
    ) {}

    idBanGiao: string = '';

    items: any[] = [
        { label: 'Công việc' },
        { label: 'Danh sách bàn giao công việc' },
        { label: 'Bàn giao công việc' },
    ];
    home: any = { icon: 'pi pi-home', routerLink: '/' };
    loading: boolean = true;
    submitted: boolean = false;
    hienThiHSCV = false;

    ngOnInit() {
        this.loading = false;
        this.BindData();
        this.BindHoSoCongViec();
        this.BindCongViec();
        this.BindVanBan();
    }

    daTa: any[] = [];
    async BindData() {
        try {
            this.route.queryParams.subscribe(async (params) => {
                let id = params['id'];
                this.idBanGiao = id;
                const data = await this.service.getCongViec(id);
                this.congViec.push(data); // Push the data into the array
            });
        } catch (error) {
            console.log(error);
        }
    }

    hoSoCongViec: any[] = [];
    async BindHoSoCongViec() {
        try {
            this.route.queryParams.subscribe(async (params) => {
                let id = params['id'];
                this.service.getHoSoCongViec(id).then((data) => {
                    this.hoSoCongViec = data;
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    congViec: any[] = [];
    async BindCongViec() {
        try {
            this.route.queryParams.subscribe(async (params) => {
                let id = params['id'];
                this.service.getCongViecPopUp(id).then((data) => {
                    this.congViec = data;
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    vanBan: any[] = [];
    async BindVanBan() {
        try {
            this.route.queryParams.subscribe(async (params) => {
                let id = params['id'];
                this.service.getVanban(id).then((data) => {
                    this.vanBan = data;
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    public ThemMoiHSCV(): void {
        this.hienThiHSCV = true;
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'T') this.hienThiHSCV = false;

        // else this.hienThiCapNhat = false;
    }
}

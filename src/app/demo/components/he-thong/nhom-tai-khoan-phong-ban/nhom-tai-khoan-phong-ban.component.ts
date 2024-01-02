import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { NhomTaiKhoanPhongBanService } from 'src/app/demo/service/he-thong/nhom-tai-khoan-phong-ban.service';
import {
    TimKiemNhomTaiKhoan,
    phanLoaiNhomDonVi,
} from 'src/app/models/he-thong/nhom-tai-khoan-phong-ban';
import { modelOptions } from 'src/app/models/option-model';

@Component({
    selector: 'app-nhom-tai-khoan-phong-ban',
    templateUrl: './nhom-tai-khoan-phong-ban.component.html',
    styleUrls: ['./nhom-tai-khoan-phong-ban.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class NhomTaiKhoanPhongBanComponent {
    constructor(
        private messageService: MessageService,
        private service: NhomTaiKhoanPhongBanService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}

    isShowSearch: boolean = false;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    timChinhXac: boolean = false;
    public id: string = '1';
    hienThiCapNhat: boolean = false;
    hienThiThemMoi: boolean = false;
    hienThiChiTiet: boolean = false;
    hienThiThemNguoiDung: boolean = false;
    loading: boolean = false;
    lstNhomTaiKhoan: any[] = [];
    items = [{ label: 'Hệ thống' }, { label: 'Nhóm tài khoản phòng ban' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemNhomTaiKhoan = {
        keyWord: '',
        moTa: '',
        phanLoai: phanLoaiNhomDonVi.phongBan,
        phongBanId: Number(this.idPhongBan),
        timChinhXac: 0,
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
    }

    public async LoadDanhSach() {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.lstNhomTaiKhoan = await this.service.getDanhSachTaiKhoanPhongBan(
            this.timKiemDanhSach
        );
    }

    public ThemMoi() {
        this.hienThiThemMoi = true;
    }

    public CapNhat(id: string) {
        this.hienThiCapNhat = true;
        this.id = id;
    }

    public ChiTiet(id: string) {
        this.hienThiChiTiet = true;
        this.id = id;
    }

    public ThemNguoiDung(id: string) {
        this.hienThiThemNguoiDung = true;
        this.id = id;
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'C') this.hienThiCapNhat = false;
        if (loai === 'CT') this.hienThiChiTiet = false;
        if (loai === 'T') this.hienThiThemMoi = false;
        if (loai === 'TND') this.hienThiThemNguoiDung = false;
        this.LoadDanhSach();
    }

    public Xoa(id: string) {
        this.confirmService.confirm({
            message: 'Bạn có chắc chắn xác nhận xóa nhóm tài khoản?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service.xoaTaiKhoanPhongBan(id).subscribe(
                    (data) => {
                        if (data.isError) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: data.title,
                            });
                        } else {
                            this.LoadDanhSach();
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
            },
            reject: () => {},
        });
    }

    public CheckedHt() {
        this.timChinhXac = !this.timChinhXac;
    }
}

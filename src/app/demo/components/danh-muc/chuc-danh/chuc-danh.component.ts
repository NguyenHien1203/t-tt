import { ChucDanhService } from './../../../service/danh-muc/chuc-danh/chuc-danh.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { ChucDanh, TimKiemChucDanh } from 'src/app/models/danh-muc/chuc-danh/chuc-danh';

@Component({
    templateUrl: './chuc-danh.component.html',
    styleUrls: ['./chuc-danh.component.scss'],
    providers: [MessageService],
})
export class ChucDanhComponent implements OnInit {
    breadcrumbItems: MenuItem[] = [];
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    chucDanh: ChucDanh = {};
    cacChucDanh: ChucDanh[] = [];

    timKiem: Search = {};
    dauVaoTimKiem = {
        keyWord: '',
        nam: 0,
        tuNgay: new Date(),
        denNgay: new Date(),
    };

    duLieuNhapChucDanh = {
        id: 0,
        tenChucDanh: '',
        thuTu: 0,
        ghiChu: '',
        hienThi: true,
        donViId: 0,
        created: new Date(),
        createdBy: 0,
        lastModified: new Date(),
        lastModifiedBy: 0,
    };

    productDialog: boolean = false;
    submitted: boolean = false;
    deleteProductDialog: boolean = false;

    idChucDanh: number;
    header: string;
    valCheck: string[] = [];
    msgs: Message[] = [];

    constructor(
        private messageService: MessageService,
        private chucDanhService: ChucDanhService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.breadcrumbItems = [];
        this.breadcrumbItems.push({ label: 'Danh mục' });
        this.breadcrumbItems.push({ label: 'Quản trị chức danh' });

        this.TaiDuLieuCacChucDanh();
    }

    TaiDuLieuCacChucDanh() {
        this.chucDanhService.layCacBanGhi(this.dauVaoTimKiem).subscribe(
            (data) => {
                if (data.isError) {
                    this.msgs = [];
                    this.msgs.push({
                        severity: 'error',
                        detail: 'Dữ liệu không hợp lệ',
                    });
                } else {
                    this.cacChucDanh = data;
                }
            },
            (error) => {
                console.log('Error', error);
            }
        );
    }

    TimKiemChucDanh() {
        this.dauVaoTimKiem.keyWord = this.timKiem.keyWord ?? '';
        this.TaiDuLieuCacChucDanh();
    }

    ThemMoiChucDanh() {
        this.chucDanh = {};
        this.submitted = false;
        this.productDialog = true;
        this.header = 'Thêm mới chức danh';
    }

    TatPopup() {
        this.productDialog = false;
        this.submitted = false;
    }

    LuuDuLieuChucDanh() {
        this.submitted = true;

        if (this.chucDanh.tenChucDanh?.trim()) {
            this.duLieuNhapChucDanh.tenChucDanh = this.chucDanh.tenChucDanh;
            this.duLieuNhapChucDanh.thuTu = this.chucDanh.thuTu;
            this.duLieuNhapChucDanh.ghiChu = this.chucDanh.ghiChu;

            if (this.chucDanh.id) {
                this.duLieuNhapChucDanh.lastModified = new Date();
                this.duLieuNhapChucDanh.lastModifiedBy = Number(
                    this.authService.GetDonViLamViec()
                );
                this.chucDanhService
                    .capNhat(this.duLieuNhapChucDanh, this.chucDanh.id)
                    .subscribe((data) => {
                        this.TaiDuLieuCacChucDanh();
                        if (data.isError) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Lỗi',
                                detail: data.title,
                                life: 3000,
                            });
                        } else {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: data.title,
                                life: 3000,
                            });
                        }
                    });
            } else {
                this.duLieuNhapChucDanh.donViId = Number(
                    this.authService.GetDonViLamViec()
                );
                this.duLieuNhapChucDanh.createdBy = Number(
                    this.authService.GetDonViLamViec()
                );
                this.chucDanhService
                    .themMoi(this.duLieuNhapChucDanh)
                    .subscribe((data) => {
                        this.TaiDuLieuCacChucDanh();
                        if (data.isError) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Lỗi',
                                detail: data.title,
                                life: 3000,
                            });
                        } else {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: data.title,
                                life: 3000,
                            });
                        }
                    });
            }
            this.productDialog = false;
            this.chucDanh = {};
        }
    }

    CapNhatChucDanh(id: number) {
        this.header = 'Cập nhật chức danh';
        this.submitted = false;
        this.productDialog = true;
        this.chucDanhService.layMotBanGhi(id).subscribe((data) => {
            this.chucDanh = data;
        });
    }

    XoaChucDanh(id: number) {
        this.deleteProductDialog = true;
        this.idChucDanh = id;
    }
}

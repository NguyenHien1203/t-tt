import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyDatLaiMatKhauService } from 'src/app/demo/service/he-thong/quan-ly-dat-lai-mat-khau.service';
import { TimKiemQuanLyDatLaiMatKhau } from 'src/app/models/he-thong/quan-ly-dat-lai-mat-khau';

@Component({
    selector: 'app-quan-ly-dat-lai-mat-khau',
    templateUrl: './quan-ly-dat-lai-mat-khau.component.html',
    styleUrls: ['./quan-ly-dat-lai-mat-khau.component.scss'],
    providers: [MessageService],
})
export class QuanLyDatLaiMatKhauComponent {
    constructor(
        private service: QuanLyDatLaiMatKhauService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
    }

    lstDatLaiMatKhau: any;
    loading: boolean = false;
    public id: string = '1';
    public userName: string = '1';
    public hienThiXuLy: boolean = false;
    timChinhXac: boolean = false;
    idDonViLamViec: number = Number(this.authService.GetDonViLamViec());
    timKiemDanhSach: TimKiemQuanLyDatLaiMatKhau = {
        keyWord: '',
        tenDonVi: '',
        tenPhongBan: '',
        timChinhXac: 0,
    };
    public home = { icon: 'pi pi-home', routerLink: '/' };
    public items = [
        { label: 'Hệ thống' },
        { label: 'Quản lý đặt lại mật khẩu' },
    ];

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service.getDanhSach(this.timKiemDanhSach).then((data) => {
            this.lstDatLaiMatKhau = data;
        });
    }

    public CheckedHt(): void {
        this.timChinhXac = !this.timChinhXac;
    }

    public XuLy(id: string, userName: string) {
        this.id = id;
        this.userName = userName;
        this.hienThiXuLy = true;
    }

    public Thoat(itemHt: any, loai: string) {
        if (loai == 'XL') this.hienThiXuLy = false;
        this.LoadDanhSach();
    }
}

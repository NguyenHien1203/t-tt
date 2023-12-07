import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { XuLyCongViecService } from 'src/app/demo/service/cong-viec/xu-ly-cong-viec.service';
import { TimKiemXuLyCongViec } from 'src/app/models/cong-viec/xu-ly-xong-viec';
import { modelOptions } from 'src/app/models/option-model';

@Component({
    selector: 'app-xu-ly-cong-viec',
    templateUrl: './xu-ly-cong-viec.component.html',
    styleUrls: ['./xu-ly-cong-viec.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class XuLyCongViecComponent {
    constructor(
        private messageService: MessageService,
        private service: XuLyCongViecService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private router: Router,
        private cd: ChangeDetectorRef
    ) {}

    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    lstNam: modelOptions[] = [];
    lstThang: modelOptions[] = [];
    lstTrangThai: modelOptions[] = [
        { text: 'Tất cả', value: 6 },
        { text: 'Đang xử lý', value: 1 },
        { text: 'Đến hạn', value: 2 },
        { text: 'Quá hạn', value: 3 },
        { text: 'Xử lý xong', value: 4 },
        { text: 'Dừng xử lý', value: 7 },
    ];
    lstVaiTro: modelOptions[] = [
        { text: 'Tất cả', value: 0 },
        { text: 'Chỉ đạo', value: 1 },
        { text: 'Chủ trì', value: 2 },
        { text: 'Phối hợp', value: 3 },
        { text: 'Thông báo', value: 4 },
    ];
    timChinhXac: boolean = false;
    public id: string = '1';
    public cap: string = '1';
    public loai: string = '1';
    kiemTraQuyenNhomNguoiDung: boolean = false;
    hienThiLuongXuLy: boolean = false;
    hienThiHoSo: boolean = false;
    hienThiGiaoViec: boolean = false;
    hienThiBaoCao: boolean = false;
    loading: boolean = false;
    lstCongViec: any[] = [];
    items = [{ label: 'Công việc' }, { label: 'Xử lý công việc' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemXuLyCongViec = {
        noiDung: '',
        congViecPhatSinh: 1,
        nam: 0,
        thang: 0,
        userId: Number(this.idUser),
        phongBanId: Number(this.idPhongBan),
        donViId: Number(this.idDonViLamViec),
        vaiTro: 0,
        trangThai: 6,
        timChinhXac: 0,
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
        this.LoadDanhMuc();
        this.service
            .KiemTraUserThuocNhomNguoiDung(this.idUser, this.idDonViLamViec)
            .then((data) => (this.kiemTraQuyenNhomNguoiDung = data));
    }

    public LuongDuLieu(id: number, cap: string, loai: number) {
        this.router.navigate(['./cong-viec/xu-ly-cong-viec/luong-xu-ly'], {
            queryParamsHandling: 'merge',
            queryParams: { id: id, cap: cap, loai: loai },
        });
    }

    public ThemMoiHoSo(id, cap, loai) {
        this.hienThiHoSo = true;
        this.id = id;
        this.cap = cap;
        this.loai = loai;
    }

    public LoadDanhMuc() {
        const currentYear = new Date().getFullYear() + 1;
        for (let i = currentYear + 1; i >= currentYear - 5; i--) {
            this.lstNam.push({ text: 'Năm ' + i, value: i });
        }
        for (let i = 1; i <= 12; i++) {
            this.lstThang.push({ text: 'Tháng ' + i, value: i });
        }
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachXuLyCongViec(this.timKiemDanhSach)
            .then((data) => {
                console.log(data);
                this.lstCongViec = data;
            });
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'L') this.hienThiLuongXuLy = false;
        if (loai === 'H') this.hienThiHoSo = false;
        if (loai === 'G') this.hienThiGiaoViec = false;
        if (loai === 'B') this.hienThiBaoCao = false;
        this.LoadDanhSach();
    }

    public CheckedHt() {
        this.timChinhXac = !this.timChinhXac;
    }
}

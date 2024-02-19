import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DanhSachDeXuatCongViecService } from 'src/app/demo/service/cong-viec/danh-sach-de-xuat-cong-viec/danh-sach-de-xuat-cong-viec.service';
import { TimKiemDanhSachDXCV } from 'src/app/models/cong-viec/danh-sach-de-xuat-cong-viec';

@Component({
    selector: 'app-danh-sach-de-xuat-cong-viec',
    templateUrl: './danh-sach-de-xuat-cong-viec.component.html',
    styleUrls: ['./danh-sach-de-xuat-cong-viec.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class DanhSachDeXuatCongViecComponent {
    constructor(
        private service: DanhSachDeXuatCongViecService,
        private messageService: MessageService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private router: Router,
        private cd: ChangeDetectorRef
    ) {}

    hienThiThemMoi: boolean = false;
    hienThiCapNhat: boolean = false;
    // hienThiBanGiao: boolean = false;

    loaiVanBan: SelectItem[] = [];
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idPhonBan: string = this.authService.GetmUserInfo()?.phongBanLamViecId ?? '0';
    idDonVi: string = this.authService.GetmUserInfo()?.donViId ?? '0';

    yearOptions: SelectItem[] = [];
    monthOptions: SelectItem[] = [];
    timChinhXac: boolean = false;
    public id: string = '1';
    loading: boolean = false;
    traCuuDonGians: any[] = [];
    public home = { icon: 'pi pi-home', routerLink: '/' };
    public items = [
        { label: 'Quản lý công việc' },
        { label: 'Danh sách đề xuất công việc' },
    ];
    public timKiemDanhSach: TimKiemDanhSachDXCV = {
        noidung: '',
        cvphatsinh: 1,
        nam: 0,
        thang: 0,
        userID : Number(this.idUser),
        phongBanLamViecID: Number(this.idPhonBan),
        donViID: Number(this.idDonVi),
        loai: 0,
        trangThaiSearch: 0,
        iTimChinhXac: 0,
    };

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
        console.log('qưđưq', this.authService.GetmUserInfo().donViId);
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.iTimChinhXac = this.timChinhXac ? 1 : 0;
        this.service.getDanhSachDXCV(this.timKiemDanhSach).then((data) => {
            console.log(data);
            this.traCuuDonGians = data;
        });
    }

    public CheckedHt(): void {
        this.timChinhXac = !this.timChinhXac;
    }

    public ThemCongViec(): void {
        this.hienThiThemMoi = true;
    }

    public BanGiaoCongViec(id: string): void {
        this.router.navigate(
            ['./cong-viec/danh-sach-ban-giao-cong-viec/ban-giao-cong-viec'],
            { queryParamsHandling: 'merge', queryParams: { id: id } }
        );
    }
    public CapNhat(id: string): void {
        this.hienThiCapNhat = true;
        this.id = id;
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'T') this.hienThiThemMoi = false;
        // if (loai === 'B') this.hienThiBanGiao = false;
        else this.hienThiCapNhat = false;
        this.LoadDanhSach();
    }
}

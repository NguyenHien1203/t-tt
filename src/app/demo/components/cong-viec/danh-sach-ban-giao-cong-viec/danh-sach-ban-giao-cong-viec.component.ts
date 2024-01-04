import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DanhSachBanGiaoCongViecService } from 'src/app/demo/service/cong-viec/danh-sach-ban-giao-cong-viec/danh-sach-ban-giao-cong-viec.service';
import { TimKiemDanhSach } from 'src/app/models/cong-viec/danh-sach-ban-giao-cong-viec';

@Component({
    selector: 'app-danh-sach-ban-giao-cong-viec',
    templateUrl: './danh-sach-ban-giao-cong-viec.component.html',
    styleUrls: ['./danh-sach-ban-giao-cong-viec.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class DanhSachBanGiaoCongViecComponent {
    constructor(
        private service: DanhSachBanGiaoCongViecService,
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
    yearOptions: SelectItem[] = [];
    monthOptions: SelectItem[] = [];
    timChinhXac: boolean = false;
    public id: string = '1';
    hienThiPhanPhoi: boolean = false;
    hienThiGuiVanBan: boolean = false;
    loading: boolean = false;
    traCuuDonGians: any[] = [];
    public home = { icon: 'pi pi-home', routerLink: '/' };
    public items = [
        { label: 'Quản lý công việc' },
        { label: 'Danh sách bàn giao công việc' },
    ];
    public timKiemDanhSach: TimKiemDanhSach = {
        keyWord: '',
        nguoiBanGiao: '',
        nguoiNhanBanGiao: '',
        tuNgay: '1901-01-01',
        denngay: '9999-01-01',
        userId: Number(this.idUser),
        timChinhXac: 0,
    };

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
        console.log('qưđưq', this.authService.GetmUserInfo().donViId);
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service.getDanhSachBGCV(this.timKiemDanhSach).then((data) => {
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

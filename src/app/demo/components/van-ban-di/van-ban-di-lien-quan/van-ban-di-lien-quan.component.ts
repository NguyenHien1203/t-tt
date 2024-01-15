import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { VanBanDiLienQuanService } from 'src/app/demo/service/van-ban-di/van-ban-di-lien-quan.service';
import { TimKiemDanhSach } from 'src/app/models/van-ban-di/van-ban-di-lien-quan';

@Component({
    selector: 'app-van-ban-di-lien-quan',
    templateUrl: './van-ban-di-lien-quan.component.html',
    styleUrls: ['./van-ban-di-lien-quan.component.scss'],
    providers: [MessageService],
})
export class VanBanDiLienQuanComponent {
    constructor(
        private messageService: MessageService,
        private service: VanBanDiLienQuanService,
        private authService: AuthService,
        private cd: ChangeDetectorRef
    ) {}

    itemMenus = [
        { label: 'Tab 1', icon: 'pi pi-box', command: () => this.tabClick(0) },
        { label: 'Tab 2', icon: 'pi pi-box', command: () => this.tabClick(1) },
        { label: 'Tab 3', icon: 'pi pi-box', command: () => this.tabClick(2) },
    ];
    hienThiChiTiet: boolean = false;
    activeItem = this.itemMenus[0];

    tabClick(tabLabel: number): void {
        this.activeItem = this.itemMenus[tabLabel];
        console.log(`Clicked on ${tabLabel}`);
        // Additional logic for tab click
    }

    lstChucNang = [
        { label: 'Thu hồi', icon: 'pi pi-undo', action: 'thuhoi' },
        { label: 'Lấy lại', icon: 'pi pi-sign-in', action: 'laylai' },
    ];

    public id: string = '1';
    isShowSearch: boolean = false;
    idPhongBan: string = this.authService.GetDonViLamViec() ?? '0';
    idDonViLamViec: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    timChinhXac: boolean = false;
    loading: boolean = false;
    lstLoaiVanBan: any = [];
    lstVanBanDi: any[] = [];
    items = [{ label: 'Văn bản đi' }, { label: 'Tra cứu nâng cao' }];
    home = { icon: 'pi pi-home', routerLink: '/' };

    timKiemDanhSach: TimKiemDanhSach = {
        keyWord: '',
        donViId: Number(this.idDonViLamViec),
        phongBanId: Number(this.idPhongBan),
        lanhDaoKy: '',
        ngayGuiTuNgay: '1901-01-01',
        ngayGuiDenNgay: '1901-01-01',
        banHanhTuNgay: '1901-01-01',
        banHanhDenNgay: '1901-01-01',
        soKyHieu: '',
        trichYeu: '',
        timChinhXac: 0,
        idUserPP: this.authService.GetmUserInfo()?.userId ?? '0',
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachVanBanDiLienQuan(this.timKiemDanhSach)
            .then((data) => {
                this.lstVanBanDi = data;
            });
    }

    public ChiTiet(id: string) {
        this.hienThiChiTiet = true;
        this.id = id;
    }

    public CheckedHt() {
        this.timChinhXac = !this.timChinhXac;
    }

    public ShowSearch() {
        this.isShowSearch = !this.isShowSearch;
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'CT') this.hienThiChiTiet = false;
        this.LoadDanhSach();
    }
}

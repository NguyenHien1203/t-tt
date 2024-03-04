import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { VanBanDaTuChoiService } from 'src/app/demo/service/van-ban-den/van-ban-da-tu-choi/van-ban-da-tu-choi.service';
import { TimKiemDanhSachVBTC, TimKiemDanhSachVTC } from 'src/app/models/van-ban-den/van-ban-da-tu-choi';

@Component({
    selector: 'app-van-ban-da-tu-choi',
    templateUrl: './van-ban-da-tu-choi.component.html',
    styleUrls: ['./van-ban-da-tu-choi.component.scss'],
    providers: [MessageService],
})
export class VanBanDaTuChoiComponent {
    constructor(
        private messageService: MessageService,
        private service: VanBanDaTuChoiService,
        private authService: AuthService,
        private cd: ChangeDetectorRef
    ) {}

    itemMenus = [
        { label: 'Tab 1', icon: 'pi pi-box', command: () => this.tabClick(0) },
        { label: 'Tab 2', icon: 'pi pi-box', command: () => this.tabClick(1) },
        { label: 'Tab 3', icon: 'pi pi-box', command: () => this.tabClick(2) },
    ];

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

    isShowSearch: boolean = false;
    idDonViLamViec: string = this.authService.GetmUserInfo()?.donViId ?? '0';
    yearOptions: SelectItem[] = [];
    monthOptions: SelectItem[] = [];
    timChinhXac: boolean = false;
    loading: boolean = false;
    lstLoaiVanBan: any = [];
    lstVanBanTuChoi: any[] = [];
    items = [{ label: 'Văn bản đi' }, { label: 'Tra cứu nâng cao' }];
    home = { icon: 'pi pi-home', routerLink: '/' };

    timKiemDanhSach: TimKiemDanhSachVTC = {
        keyWord: '',
        donViId: Number(this.idDonViLamViec),
        NgayNhanVanBan: '1901-01-01',
        ngayBanHanh: '1901-01-01',
        nam: 0,
        thang: 0,
        soKyHieu: '',
        trichYeu: '',
        timChinhXac: 0,
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.GetDataMonthYear();
        this.LoadLoaiVanBan();
        this.loading = false;
        this.LoadDanhSach();
    }

    public GetDataMonthYear() {
        const currentYear = new Date().getFullYear();
        for (let i = currentYear + 1; i >= currentYear - 5; i--) {
            this.yearOptions.push({ label: 'Năm ' + i.toString(), value: i });
        }

        for (let i = 1; i <= 12; i++) {
            this.monthOptions.push({
                label: 'Tháng ' + i.toString(),
                value: i,
            });
        }
    }

    public LoadLoaiVanBan(): void {
        this.service.getDanhSachLoaiVanBan(this.idDonViLamViec).then((data) => {
            this.lstLoaiVanBan = data;
        });
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachTuChoi(this.timKiemDanhSach)
            .then((data) => {
                this.lstVanBanTuChoi = data;
                console.log(this.lstVanBanTuChoi)
            });
    }

    public CheckedHt() {
        this.timChinhXac = !this.timChinhXac;
    }

    public ShowSearch() {
        this.isShowSearch = !this.isShowSearch;
    }

    Thoat(item: any, type: string) {
        if (type === 'CT') {
          this.hienThiChiTiet = false;
        }
        this.LoadDanhSach();
      }
      
      
      hienThiChiTiet: boolean = false;
      idVanBanDi: string = '1';
    
      ChiTietVanBan(id: string) {
        this.hienThiChiTiet = true;
        this.idVanBanDi = id;
      }
}

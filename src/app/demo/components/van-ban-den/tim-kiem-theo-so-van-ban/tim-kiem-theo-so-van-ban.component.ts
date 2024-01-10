import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemTheoSoVanBanService } from 'src/app/demo/service/van-ban-den/tim-kiem-theo-so-van-ban/tim-kiem-theo-so-van-ban.service';
import { TimKiemDanhSachTheoSoVanBan } from 'src/app/models/van-ban-den/tim-kiem-theo-so-van-ban';

@Component({
    selector: 'app-tim-kiem-theo-so-van-ban',
    templateUrl: './tim-kiem-theo-so-van-ban.component.html',
    styleUrls: ['./tim-kiem-theo-so-van-ban.component.scss'],
    providers: [MessageService, ConfirmationService],

})
export class TimKiemTheoSoVanBanComponent {
    constructor(
        private messageService: MessageService,
        private service: TimKiemTheoSoVanBanService,
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
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    yearOptions: SelectItem[] = [];
    monthOptions: SelectItem[] = [];
    timChinhXac: boolean = false;
    loading: boolean = false;
    lstSoVanBan: any = [];
    lstCQBH: any = [];
    lstVanBanDi: any[] = [];
    items = [{ label: 'Văn bản đi' }, { label: 'Tìm kiếm theo sổ văn bản' }];
    home = { icon: 'pi pi-home', routerLink: '/' };

    timKiemDanhSach: TimKiemDanhSachTheoSoVanBan = {
        keyWord: '',
        soVanBanId: 0,
        vanBanId: 0,
        donViId: Number(this.idDonViLamViec),
        loaiVanBanId: 0,
        ngayGuiTuNgay: '1901-01-01',
        ngayGuiDenNgay: '1901-01-01',
        banHanhTuNgay: '1901-01-01',
        banHanhDenNgay: '1901-01-01',
        nam: new Date().getFullYear(),
        thang: 0,
        soKyHieu: '',
        soDi: null,
        trichYeu: '',
        timChinhXac: 0,
        trangThai: 1,
        cQBHId: 0,
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.GetDataMonthYear();
        this.LoadSoVanBan();
        this.LoadCQBH();
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

    public LoadSoVanBan(): void {
        this.service.getSoVanBan(this.idDonViLamViec).then((data) => {
            this.lstSoVanBan = data;
        });
    }

    public LoadCQBH(): void {
      this.service.getDanhSachCQBH().then((data) => {
          this.lstCQBH = data;
      });
  }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachSoVanBan(this.timKiemDanhSach)
            .then((data) => {
                this.lstVanBanDi = data;
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

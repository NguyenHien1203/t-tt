import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TraCuuNangCaoService } from 'src/app/demo/service/van-ban-di/tra-cuu-nang-cao.service';
import { TimKiemDanhSach } from 'src/app/models/van-ban-di/tra-cuu-nang-cao';

@Component({
  selector: 'app-tra-cuu-nang-cao',
  templateUrl: './tra-cuu-nang-cao.component.html',
  styleUrls: ['./tra-cuu-nang-cao.component.scss'],
  providers : [MessageService]
})
export class TraCuuNangCaoComponent {
  constructor(
    private messageService: MessageService,
    private service: TraCuuNangCaoService,
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
  this.activeItem= this.itemMenus[tabLabel];
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
lstLoaiVanBan: any = [];
lstVanBanDi: any[] = [];
items = [{ label: 'Văn bản đi' }, { label: 'Tra cứu nâng cao' }];
home = { icon: 'pi pi-home', routerLink: '/' };

timKiemDanhSach: TimKiemDanhSach = {
  keyWord: '',
    soVanBanId: 0,
    vanBanId: 0,
    donViId: Number(this.idDonViLamViec),
    mucDo: 0,
    loaiVanBanId: 0,
    lanhDaoKy: '',
    ngayGuiTuNgay: '1901-01-01',
    ngayGuiDenNgay: '1901-01-01',
    banHanhTuNgay: '1901-01-01',
    banHanhDenNgay: '1901-01-01',
    nam: new Date().getFullYear(),
    thang: 0,
    soKyHieu: '',
    lanhDaoKyId: 0,
    soDi: null,
    pageIndex: 0,
    pageSize: 0,
    trichYeu: '',
    timChinhXac: 0,
    trangThai : 1,
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
        this.yearOptions.push({ label: "Năm " + i.toString(), value: i });
    }

    for (let i = 1; i <= 12; i++) {
      this.monthOptions.push({ label: "Tháng " + i.toString(), value: i });
  }
}

public LoadLoaiVanBan(): void{
    this.service.getDanhSachLoaiVanBan(this.idDonViLamViec).then((data) => {
        this.lstLoaiVanBan = data;
    });
}

public LoadDanhSach(): void {
    this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
    this.service.getDanhSachTraCuuNangCao(this.timKiemDanhSach).then((data) => {
        this.lstVanBanDi = data;
    });
}

public CheckedHt() {
    this.timChinhXac = !this.timChinhXac;
}

public ShowSearch() {
    this.isShowSearch = !this.isShowSearch;
}
}

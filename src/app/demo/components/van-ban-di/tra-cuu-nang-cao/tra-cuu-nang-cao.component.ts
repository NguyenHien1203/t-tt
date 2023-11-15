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
  { label: 'Tab 1', icon: 'pi pi-fw pi-calendar', command: () => this.tabClick(0) },
  { label: 'Tab 2', icon: 'pi pi-fw pi-pencil', command: () => this.tabClick(1) },
  { label: 'Tab 3', icon: 'pi pi-fw pi-file', command: () => this.tabClick(2) },
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
lyDoLayLai: string = '';
idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
yearOptions: SelectItem[] = [];
timChinhXac: boolean = false;
loading: boolean = false;
lstLoaiVanBan: any = [];
capNhatMois: any[] = [];
items = [{ label: 'Văn bản đi' }, { label: 'Cập nhật mới' }];
home = { icon: 'pi pi-home', routerLink: '/' };

timKiemDanhSach: TimKiemDanhSach = {
  keyWord: '',
    soVanBanId: 0,
    vanBanId: 0,
    donViId: Number(this.idDonViLamViec),
    mucDo: 0,
    loaiVanBanId: 0,
    lanhDaoKy: '',
    ngayGuiVanBan: '1901-01-01',
    ngayBanHanhVanBan: '1901-01-01',
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
    this.GetDataYear();
    this.loading = false;
    this.LoadDanhSach();
}

public GetDataYear() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear + 1; i >= currentYear - 5; i--) {
        this.yearOptions.push({ label: i.toString(), value: i });
    }
}

public LoadDanhSach(): void {
    this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
    this.service.getDanhSachTraCuuNangCao(this.timKiemDanhSach).then((data) => {
        this.capNhatMois = data;
    });
}

public CheckedHt() {
    this.timChinhXac = !this.timChinhXac;
}

public ShowSearch() {
    this.isShowSearch = !this.isShowSearch;
}
}

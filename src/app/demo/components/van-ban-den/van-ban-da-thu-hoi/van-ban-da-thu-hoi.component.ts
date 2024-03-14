import { ChangeDetectorRef, Component } from '@angular/core';
import { isThisSecond } from 'date-fns';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { VanBanDaTuChoiService } from 'src/app/demo/service/van-ban-den/van-ban-da-tu-choi/van-ban-da-tu-choi.service';
import { TimKiemDanhSachDaThuHoi } from 'src/app/models/van-ban-den/van-ban-cho-thu-hoi';
import {
    TimKiemDanhSachVBTC,
    TimKiemDanhSachVTC,
} from 'src/app/models/van-ban-den/van-ban-da-tu-choi';

@Component({
    selector: 'app-van-ban-da-thu-hoi',
    templateUrl: './van-ban-da-thu-hoi.component.html',
    styleUrls: ['./van-ban-da-thu-hoi.component.scss'],
    providers: [MessageService],
})
export class VanBanDaThuHoiComponent {
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
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    yearOptions: SelectItem[] = [];
    monthOptions: SelectItem[] = [];
    timChinhXac: boolean = false;
    loading: boolean = false;
    lstLoaiVanBan: any = [];
    lstSoVanBan: any = [];
    lstVanBanDi: any[] = [];
    lstCoQuan: any = [];
    items = [{ label: 'Văn bản đi' }, { label: 'Tra cứu nâng cao' }];
    home = { icon: 'pi pi-home', routerLink: '/' };

    timKiemDanhSach: TimKiemDanhSachDaThuHoi = {
        keyWord: '',
        soVanBanId: 0,
        donViId: Number(this.idDonViLamViec),
        loaiVanBanId: 0,
        NgayNhanVanBan: '1901-01-01',
        ngayBanHanh: '1901-01-01',
        nam: new Date().getFullYear(),
        thang: 0,
        soKyHieu: '',
        soDi: null,
        trichYeu: '',
        cQBHId: 0,
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.GetDataMonthYear();
        this.LoadLoaiVanBan();
        this.loading = false;
        this.LoadDanhSach();
        this.GetSoVanBan();
        this.GetCoQuan();
    }

    public GetCoQuan() {
        this.service.getCoQuan().then((data) => {
            this.lstCoQuan = data;
        });
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

    public GetSoVanBan(): void {
        this.service.getSoVanBan(this.idDonViLamViec).then((data) => {
            this.lstSoVanBan = data;
        });
    }

    public LoadDanhSach(): void {
        this.service.getDanhSachThuHoi(this.timKiemDanhSach).then((data) => {
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

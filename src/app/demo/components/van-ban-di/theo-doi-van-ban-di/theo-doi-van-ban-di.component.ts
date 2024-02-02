import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TheoDoiVanBanDiService } from 'src/app/demo/service/van-ban-di/theo-doi-van-ban-di.service';
import { TimKiemDanhSachTheoDoiVanBan } from 'src/app/models/van-ban-di/theo-doi-van-ban-di';

@Component({
    selector: 'app-theo-doi-van-ban-di',
    templateUrl: './theo-doi-van-ban-di.component.html',
    styleUrls: ['./theo-doi-van-ban-di.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class TheoDoiVanBanDiComponent {
    constructor(
      private router : Router,
        private messageService: MessageService,
        private service: TheoDoiVanBanDiService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}

    hienThiChiTiet : boolean = false;
    isShowSearch: boolean = false;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    yearOptions: SelectItem[] = [];
    monthOptions: SelectItem[] = [];
    timChinhXac: boolean = false;
    public id: string = '1';
    hienThiTheoDoi: boolean = false;
    loading: boolean = false;
    lstLoaiVanBan: any = [];
    lstSoVanBan: any = [];
    lstTheoDoiVanBanDi: any[] = [];
    items = [{ label: 'Văn bản đi' }, { label: 'Theo dõi văn bản đi' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemDanhSachTheoDoiVanBan = {
        keyWord: '',
        soVanBanId: 0,
        vanBanId: 0,
        donViId: Number(this.idDonViLamViec),
        mucDo: 0,
        loaiVanBanId: 0,
        lanhDaoKy: '',
        banHanhTuNgay: '1901-01-01',
        banHanhDenNgay: '1901-01-01',
        ngayGuiTuNgay: '1901-01-01',
        ngayGuiDenNgay: '1901-01-01',
        nam: new Date().getFullYear(),
        thang: 0,
        soKyHieu: '',
        lanhDaoKyId: 0,
        soDi: 0,
        trichYeu: '',
        timChinhXac: 0,
        trangThai: 1,
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.GetDataMOnthYear();
        this.loading = false;
        this.LoadDanhSach();
        this.LoadSoVanBan();
    }

    public LoadSoVanBan() {
        this.service.getSoVanBan(this.idDonViLamViec).then((data) => {
            this.lstSoVanBan = data;
        });
    }

    public changeSoVanBan(event) {
        this.lstLoaiVanBan = [];
        if (event != null) {
            this.service
                .changeSoVanBan(event, this.idDonViLamViec)
                .then((data) => {
                    this.lstLoaiVanBan = data;
                });
        }
    }

    public GetDataMOnthYear() {
        const currentYear = new Date().getFullYear();
        for (let i = currentYear + 1; i >= currentYear - 5; i--) {
            this.yearOptions.push({ label:"Năm " + i.toString(), value: i });
        }

        for (let i = 1; i <= 12; i++) {
          this.monthOptions.push({ label:"Tháng " + i.toString(), value: i });
      }
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service.getDanhSachVanBanDi(this.timKiemDanhSach).then((data) => {
            this.lstTheoDoiVanBanDi = data;
        });
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'T') this.hienThiTheoDoi = false;
        if(loai == "CT") this.hienThiChiTiet = false;
        this.LoadDanhSach();
    }

    public TheoDoi(id: string) {
        this.hienThiTheoDoi = true;
        this.id = id;
    }

    public ChiTiet(id: string)
    {
        this.id = id;
        this.hienThiChiTiet = true;
    }

    public BaoCao(id: string) {
      this.router.navigate(['./van-ban-di/theo-doi-van-ban-di/bao-cao'], {
        queryParamsHandling: 'merge',
        queryParams: { id: id},
    });
  }

    public CheckedHt() {
        this.timChinhXac = !this.timChinhXac;
    }

    public ShowSearch() {
        this.isShowSearch = !this.isShowSearch;
    }
}

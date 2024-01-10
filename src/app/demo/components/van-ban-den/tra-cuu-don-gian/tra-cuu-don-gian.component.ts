import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TraCuuDonGianService } from 'src/app/demo/service/van-ban-den/tra-cuu-don-gian/tra-cuu-don-gian.service';
import { TimKiemDanhSach } from 'src/app/models/van-ban-den/tra-cuu-don-gian';

@Component({
    selector: 'app-tra-cuu-don-gian',
    templateUrl: './tra-cuu-don-gian.component.html',
    styleUrls: ['./tra-cuu-don-gian.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class TraCuuDonGianComponent {
    constructor(
        private service: TraCuuDonGianService,
        private messageService: MessageService,
        private authService: AuthService
    ) { }

    loaiVanBan: SelectItem[] = [];
    idDonViLamViec: string = this.authService.GetmUserInfo()?.donViId ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    yearOptions: SelectItem[] = [];
    monthOptions: SelectItem[] = [];
    timChinhXac: boolean = false;
    public id: string = '1';
    hienThiPhanPhoi: boolean = false;
    hienThiCapNhat: boolean = false;
    hienThiGuiVanBan: boolean = false;
    loading: boolean = false;
    traCuuDonGians: any[] = [];
    public home = { icon: 'pi pi-home', routerLink: '/' };
    public items = [{ label: 'Văn bản đến' }, { label: 'Tra cứu đơn giản' }];
    public timKiemDanhSach: TimKiemDanhSach = {
        keyWord: '',
        donViId: Number(this.idDonViLamViec),
        idloaivb: 0,
        nam: new Date().getFullYear(),
        thang: 0,
        phongBanId: Number(this.idPhongBan),
        userId: Number(this.idUser),
        timChinhXac: 0,
    };

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
        this.BindNamThang();
        this.BindLoaiVanBan();
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachTraCuuDonGian(this.timKiemDanhSach)
            .then((data) => {
                console.log(data)
                this.traCuuDonGians = data;
            });
    }

    public CheckedHt(): void {
        this.timChinhXac = !this.timChinhXac;
    }

    public BindNamThang() {
        const currentYear = new Date().getFullYear();
        for (let i = currentYear + 1; i >= currentYear - 5; i--) {
            this.yearOptions.push({ label: 'Năm ' + i.toString(), value: i });
        }

        for (let i = 1; i < 12; i++) {
            this.monthOptions.push({
                label: 'Tháng ' + i.toString(),
                value: i,
            });
        }
    }

    public BindLoaiVanBan(): void {
        this.service
            .getLoaiVanBan(this.authService.GetmUserInfo().donViId)
            .then((data) => {
                this.loaiVanBan = data;
                console.log(this.loaiVanBan)
            });
    }

    Thoat(item: any, type: string) {
        if (type === 'CT') {
            this.hienThiChiTiet = false;
        }
        this.BindLoaiVanBan();
    }


    hienThiChiTiet: boolean = false;
    idVanBanDi: string = '1';

    ChiTietVanBan(id: string) {
        this.hienThiChiTiet = true;
        this.idVanBanDi = id;
    }
}

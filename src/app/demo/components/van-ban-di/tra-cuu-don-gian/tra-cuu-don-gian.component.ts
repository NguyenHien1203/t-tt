import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TraCuuDonGianService } from 'src/app/demo/service/van-ban-di/tra-cuu-don-gian.service';
import { TimKiemDanhSach } from 'src/app/models/van-ban-di/tra-cuu-don-gian';

@Component({
    selector: 'app-tra-cuu-don-gian',
    templateUrl: './tra-cuu-don-gian.component.html',
    styleUrls: ['./tra-cuu-don-gian.component.scss'],
    providers: [MessageService],
})
export class TraCuuDonGianComponent {
    constructor(
        private service: TraCuuDonGianService,
        private messageService: MessageService,
        private authService: AuthService
    ) { }

    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? "0";
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? "0";
    idUser: string = this.authService.GetmUserInfo()?.userId ?? "0";
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
    public items = [{ label: 'Văn bản đi' }, { label: 'Tra cứu đơn gian' }];
    public timKiemDanhSach: TimKiemDanhSach = {
        keyWord: "",
        donViId: Number(this.idDonViLamViec),
        nam: new Date().getFullYear(),
        thang: 0,
        phongBanId: Number(this.idPhongBan),
        userId: Number(this.idUser),
        timChinhXac: 0
    };

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
        this.BindNamThang();
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachTraCuuDonGian(this.timKiemDanhSach)
            .then((data) => {
                this.traCuuDonGians = data;
            });
    }

    public CheckedHt(): void {
        this.timChinhXac = !this.timChinhXac;
    }

    public BindNamThang() {
        const currentYear = new Date().getFullYear();
        for (let i = currentYear + 1; i >= currentYear - 5; i--) {
            this.yearOptions.push({ label: "Năm " + i.toString(), value: i });
        }

        for (let i = 1; i < 12; i++) {
            this.monthOptions.push({ label: "Tháng " + i.toString(), value: i });
        }
    }
}

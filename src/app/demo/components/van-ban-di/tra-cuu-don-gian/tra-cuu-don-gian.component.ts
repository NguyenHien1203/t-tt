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
        private authService : AuthService
    ) {}

  idDonViLamViec: string = this.authService.GetDonViLamViec() ?? "0";
    yearOptions: SelectItem[] = [];
    timChinhXac: boolean = false;
    public id: string = '1';
    hienThiPhanPhoi: boolean = false;
    hienThiCapNhat: boolean = false;
    hienThiGuiVanBan: boolean = false;
    loading: boolean = false;
    lstLoaiVanBan: any = [];
    lstSoVanBan: any = [];
    capNhatMois: any[] = [];
    public home = { icon: 'pi pi-home', routerLink: '/' };
    public items = [{ label: 'Văn bản đi' }, { label: 'Tra cứu đơn gian' }];
    public timKiemDanhSach: TimKiemDanhSach = {
      keyWord: "",
      soVanBanId: 0,
      vanBanId: 0,
      donViId: Number(this.idDonViLamViec),
      mucDo: 0,
      loaiVanBanId: 0,
      lanhDaoKy: "",
      ngayGuiVanBan: "1901-01-01",
      ngayBanHanhVanBan: "1901-01-01",
      nam: new Date().getFullYear(),
      thang: 0,
      trangThai: 0,
      soKyHieu: "",
      lanhDaoKyId: 0,
      soDi: null,
      pageIndex: 0,
      pageSize: 0,
      trichYeu: "",
      timChinhXac: 0
    };
    lstThongBao: SelectItem[] = [
        { label: 'Chọn trạng thái', value: 3 },
        { label: 'Còn hiệu lực', value: 2 },
        { label: 'Không còn hiệu lực', value: 1 },
    ];
    lstHienThi: SelectItem[] = [
        { label: 'Chọn hình thức', value: 3 },
        { label: 'Hiển thị', value: 1 },
        { label: 'Không hiển thị', value: 0 },
    ];
    quanLyThongBaos: any[] = [];

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachTraCuuDonGian(this.timKiemDanhSach)
            .then((data) => {
                this.quanLyThongBaos = data;
            });
    }

    public CheckedHt(): void {
        this.timChinhXac = !this.timChinhXac;
    }

    public changeSoVanBan(event) {
      if(event != null)
      {
        this.service.changeSoVanBan(event, this.idDonViLamViec).then(data => {
          this.lstLoaiVanBan = data;
        })
      }
    }
  
    public GetDataYear() {
      const currentYear = new Date().getFullYear();
      for (let i = currentYear + 1; i >= currentYear - 5; i--) {
        this.yearOptions.push({ label: i.toString(), value: i });
      }
    }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-di/cap-nhat-moi.service';
import { TimKiemDanhSach } from 'src/app/models/van-ban-di/cap-nhat-moi';

@Component({
  selector: 'app-cap-nhat-moi',
  templateUrl: './cap-nhat-moi.component.html',
  styleUrls: ['./cap-nhat-moi.component.scss'],
  providers: [MessageService]
})
export class CapNhatMoiComponent implements OnInit {

  constructor(private messageService: MessageService,
    private service: CapNhatMoiService,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef) {
  }



  idDonViLamViec: string = this.authService.GetDonViLamViec() ?? "0";
  yearOptions: SelectItem[] = [];
  timChinhXac: boolean = false;
  loading: boolean = false;
  lstLoaiVanBan: any = [];
  lstSoVanBan: any = [];
  capNhatMois: any[] = [];
  items = [{ label: 'Văn bản đi' }, { label: 'Cập nhật mới' }];
  home = { icon: 'pi pi-home', routerLink: '/' };
  timKiemDanhSach: TimKiemDanhSach = {
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
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.GetDataYear();
    this.loading = false;
    this.LoadDanhSach();
    this.LoadSoVanBan();
  }
  public LoadSoVanBan() {
    this.service.getSoVanBan(this.idDonViLamViec).then(data => {
      this.lstSoVanBan = data
    });
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

  public LoadDanhSach(): void {
    this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
    this.service.getDanhSachVanBanDi(this.timKiemDanhSach).then(data => { this.capNhatMois = data; })
  }

  public ThemMoi() {
    this.router.navigate(['./van-ban-di/cap-nhat-moi/them-moi']);
  }

  public CheckedHt() {

  }
}

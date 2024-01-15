import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DuyetBanGiaoCongViecService } from 'src/app/demo/service/cong-viec/duyet-ban-giao-cong-viec/duyet-ban-giao-cong-viec.service';
import { TimKiemDanhSachDBGCV } from 'src/app/models/cong-viec/duyet-ban-giao-cong-viec';

@Component({
  selector: 'app-duyet-ban-giao-cong-viec',
  templateUrl: './duyet-ban-giao-cong-viec.component.html',
  styleUrls: ['./duyet-ban-giao-cong-viec.component.scss']
})
export class DuyetBanGiaoCongViecComponent {
  constructor(
    private service: DuyetBanGiaoCongViecService,
    private messageService: MessageService,
    private authService: AuthService,
    private confirmService: ConfirmationService,
    private router: Router,
    private cd: ChangeDetectorRef
) {}

  loaiVanBan: SelectItem[] = [];
  idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
  yearOptions: SelectItem[] = [];
  monthOptions: SelectItem[] = [];
  timChinhXac: boolean = false;
  public id: string = '1';
  hienThiPhanPhoi: boolean = false;
  hienThiGuiVanBan: boolean = false;
  loading: boolean = false;
  traCuuDonGians: any[] = [];
  public home = { icon: 'pi pi-home', routerLink: '/' };
  public items = [
      { label: 'Quản lý công việc' },
      { label: 'Danh sách bàn giao công việc' },
  ];
  public timKiemDanhSach: TimKiemDanhSachDBGCV = {
      nguoiBanGiao: '',
      nguoiNhanBanGiao: '',
      noiDungBanGiao: '',
      tuNgay: '1901-01-01',
      denngay: '9999-01-01',
      nguoiNhanId: Number(this.idUser),
      timChinhXac: 0,
  };

  ngOnInit(): void {
      this.loading = false;
      this.LoadDanhSach();
      console.log('qưđưq', this.authService.GetmUserInfo().donViId);
  }

  public LoadDanhSach(): void {
      this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
      this.service.getDanhSachBGCV(this.timKiemDanhSach).then((data) => {
          console.log(data);
          this.traCuuDonGians = data;
      });
  }

}

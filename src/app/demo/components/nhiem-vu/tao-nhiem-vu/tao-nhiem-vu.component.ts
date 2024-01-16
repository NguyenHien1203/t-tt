import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TaoNhiemVuService } from 'src/app/demo/service/nhiem-vu/tao-nhiem-vu.service';
import { TimKiemDanhSach } from 'src/app/models/nhiem-vu/tao-nhiem-vu';

@Component({
  selector: 'app-tao-nhiem-vu',
  templateUrl: './tao-nhiem-vu.component.html',
  styleUrls: ['./tao-nhiem-vu.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class TaoNhiemVuComponent implements OnInit {
  items = [{ label: 'Nhiệm vụ' }, { label: 'Tạo nhiệm vụ' }];
  home = { icon: 'pi pi-home', routerLink: '/' };
  loading: boolean = true;
  timChinhXac: boolean = false;
  lstNhiemVu: any[] = [];
  deleteProductDialog: boolean = false;
  idXoa: any;

  ngOnInit(): void {
    this.loading = false;
    this.GetDataNhiemVu();
  }

  public timKiemDanhSach: TimKiemDanhSach = {
    iTimChinhXac: 0,
  }

  constructor(
    private messageService: MessageService,
    private service: TaoNhiemVuService,
    private confirmationService: ConfirmationService,
    private auth: AuthService,
    private router: Router,
  ) { }


  public CheckedHt(): void {
    this.timChinhXac = !this.timChinhXac;
  }

  public GetDataNhiemVu() {
    this.timKiemDanhSach.iTimChinhXac = this.timChinhXac ? 1 : 0;
    this.timKiemDanhSach.donvilamviecid = this.auth.GetmUserInfo().phongBanLamViecId.toString();
    this.service.GetDanhSachNhiemVu(this.timKiemDanhSach).subscribe(data => {
      if (data.isError) {
      } else {
        this.lstNhiemVu = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  public ThemMoi() {
    this.router.navigate(['/nhiem-vu/them-moi-nhiem-vu']);
  }

  public CapNhat(event: any) {
    this.router.navigate(['/nhiem-vu/cap-nhat-nhiem-vu', {id: event}]);
  }

  Xoa(id: any) {
    this.deleteProductDialog = true;
    this.idXoa = id;
  }

  TamDungXoa() {
    this.deleteProductDialog = false;
    this.idXoa = null;
  }

  XacNhanXoa() {
    this.deleteProductDialog = false;
    this.service.Xoa(this.idXoa).subscribe(
      data => {
        if (data.isError) {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
        } else {
          this.GetDataNhiemVu();
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
        }
      }
    )
  }
}

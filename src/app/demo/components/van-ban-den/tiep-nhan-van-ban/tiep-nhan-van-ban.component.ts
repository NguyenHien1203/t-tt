import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TiepNhanVanBanService } from 'src/app/demo/service/van-ban-den/tiep-nhan-van-ban/tiep-nhan-van-ban.service';
import { TimKiemDanhSach } from 'src/app/models/van-ban-den/cap-nhat-moi';

@Component({
  selector: 'app-tiep-nhan-van-ban',
  templateUrl: './tiep-nhan-van-ban.component.html',
  styleUrls: ['./tiep-nhan-van-ban.component.scss'],
  providers: [MessageService]

})
export class TiepNhanVanBanComponent implements OnInit {
  items: any[] = [];
  home: any;
  loading: boolean = true;
  public timChinhXac: boolean = false;

  LstTiepNhanVanBan: any[] = [];

  constructor(
    private messageService: MessageService,
    private service : TiepNhanVanBanService,
  ) { }


  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Văn bản đến' }, { label: 'Tiếp nhận văn bản' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.GetDanhSachCapNhatMoi();
  }

  public timKiemDanhSach: TimKiemDanhSach = {
    trichYeu: "",
    tuNgay: "",
    soKyHieu: "",
    timChinhXac: 0,
    DonViLamViec: ""
  }

  public CheckedHt(): void {
    this.timChinhXac = !this.timChinhXac;
  }

  /**
   * lấy dữ liệu bản ghi cập nhật mới
   */
  public GetDanhSachCapNhatMoi() {
    this.service.getDanhSachCapNhatMoi(this.timKiemDanhSach).subscribe(data => {
      if (data.isError) {

      } else {
        this.LstTiepNhanVanBan = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }
}

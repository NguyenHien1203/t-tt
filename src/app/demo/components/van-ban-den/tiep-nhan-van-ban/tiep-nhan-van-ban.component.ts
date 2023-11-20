import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  hienthiTiepNhan: boolean = false;
  hienthiTuChoi: boolean = false;
  id: any = "";

  constructor(
    private messageService: MessageService,
    private service: TiepNhanVanBanService,
    private cd: ChangeDetectorRef
  ) { }


  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Văn bản đến' }, { label: 'Tiếp nhận văn bản' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.GetDanhSachTiepNhanVanBan();
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

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  /**
   * lấy dữ liệu bản ghi cập nhật mới
   */
  public GetDanhSachTiepNhanVanBan() {
    this.service.getDanhSachTiepNhanVanBan(this.timKiemDanhSach).subscribe(data => {
      if (data.isError) {
      } else {
        this.LstTiepNhanVanBan = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  /**
   * TiepNhan
   */
  public TiepNhan(idVanBan: string) {
    this.hienthiTiepNhan = true;
    this.id = idVanBan;
  }

  /**
   * TiepNhan
   */
  public TuChoi(idVanBan: string) {
    this.hienthiTuChoi = true;
    this.id = idVanBan;
  }

  public Thoat(itemHt: any, loai: string): void {
    if (loai === 'T')
      this.hienthiTiepNhan = false;

      if (loai === 'C')
      this.hienthiTuChoi = false;
    this.GetDanhSachTiepNhanVanBan();
  }
}

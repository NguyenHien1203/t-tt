import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ButPheVanBanService } from 'src/app/demo/service/van-ban-den/but-phe-van-ban/but-phe-van-ban.service';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-den/cap-nhat-moi/cap-nhat-moi.service';
import { TimKiemDanhSach } from 'src/app/models/van-ban-den/but-phe-van-ban';

@Component({
  selector: 'app-but-phe-van-ban',
  templateUrl: './but-phe-van-ban.component.html',
  styleUrls: ['./but-phe-van-ban.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class ButPheVanBanComponent implements OnInit {
  items: any[] = [];
  home: any;
  loading: boolean = true;
  yearOptions: SelectItem[] = [];
  monthOptions: SelectItem[] = [];
  SoVanBan = [];
  LoaiVanBan = [];
  isShowSearch: boolean = false;
  lstButPhe: any[] = [];

  constructor(
    private messageService: MessageService,
    private service: ButPheVanBanService,
    private cnmsvice: CapNhatMoiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef
  ) { }

  public timKiemDanhSach: TimKiemDanhSach = {
    thongtinvb: "",
    ngaybanhanh: "",
    ngaynhan: "",
    sokihieu: "",
    sovanbanid: "",
    loaivbid: "",
    soden: "",
    tencqbh: "",
    trichyeu: "",
    nam: new Date().getFullYear(),
    thang: "",
    DonViLamViec: ""
  }

  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Văn bản đến' }, { label: 'Bút phê văn bản' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.GetDataYear();
    this.GetDataMonth();
    this.GetDataSoVanBan();

    this.GetDanhSachButPhe();
  }

  public GetDataSoVanBan() {
    this.cnmsvice.GetDataSoVanBan().subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.SoVanBan = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  /**
     * onChange LoaiVanBan
     */
  public onChangeLoaiVanBan(event: any) {
    var IdSoVanBan = event.value;
    this.cnmsvice.GetDataLoaiVanBanByIdSoVanBan(IdSoVanBan).subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.LoaiVanBan = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }


  /**
  * Load Năm tìm kiếm
  */
  public GetDataYear() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 5; i--) {
      this.yearOptions.push({ label: i.toString(), value: i });
    }
  }

  /**
  * Load Năm tìm kiếm
  */
  public GetDataMonth() {
    for (let i = 1; i <= 12; i++) {
      this.monthOptions.push({ label: "Tháng" + i.toString(), value: i });
    }
  }

  public ShowSearch() {
    this.isShowSearch = !this.isShowSearch;
  }

  /**
   * GetDanhSachButPhe
   */
  public GetDanhSachButPhe() {
    this.service.getDataButPhe(this.timKiemDanhSach).subscribe(data => {
      if (data.isError) {
      } else {
        this.lstButPhe = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

}

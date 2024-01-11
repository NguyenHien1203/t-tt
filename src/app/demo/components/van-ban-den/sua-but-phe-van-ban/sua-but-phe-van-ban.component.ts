import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ButPheVanBanService } from 'src/app/demo/service/van-ban-den/but-phe-van-ban/but-phe-van-ban.service';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-den/cap-nhat-moi/cap-nhat-moi.service';
import { SuaButPheVanBanService } from 'src/app/demo/service/van-ban-den/sua-but-phe-van-ban/sua-but-phe-van-ban.service';
import { TimKiemDanhSach } from 'src/app/models/van-ban-den/but-phe-van-ban';

@Component({
  selector: 'app-sua-but-phe-van-ban',
  templateUrl: './sua-but-phe-van-ban.component.html',
  styleUrls: ['./sua-but-phe-van-ban.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class SuaButPheVanBanComponent  implements OnInit {
  items: any[] = [];
  home: any;
  loading: boolean = true;
  yearOptions: SelectItem[] = [];
  monthOptions: SelectItem[] = [];
  SoVanBan = [];
  LoaiVanBan = [];
  isShowSearch: boolean = false;
  lstButPhe: any[] = [];

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

  constructor(
    private messageService: MessageService,
    private service: ButPheVanBanService,
    private suaButPheSv: SuaButPheVanBanService,
    private cnmsvice: CapNhatMoiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Văn bản đến' }, { label: 'Sửa bút phê văn bản' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.GetDataYear();
    this.GetDataMonth();
    this.GetDataSoVanBan();
    this.GetDanhSachSuaButPhe();
  }

  hienThiChiTiet: boolean = false;
  idVanBanDi: string = '1';

  ChiTietVanBan(id: string) {
    this.hienThiChiTiet = true;
    this.idVanBanDi = id;
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
  public GetDanhSachSuaButPhe() {
    if (this.timKiemDanhSach.ngaybanhanh !== "" && this.timKiemDanhSach.ngaybanhanh !== null)
    this.timKiemDanhSach.ngaybanhanh = format(new Date(this.timKiemDanhSach.ngaybanhanh), 'dd/MM/yyyy');

  if (this.timKiemDanhSach.ngaynhan !== "" && this.timKiemDanhSach.ngaynhan !== null)
    this.timKiemDanhSach.ngaynhan = format(new Date(this.timKiemDanhSach.ngaynhan), 'dd/MM/yyyy');

    this.suaButPheSv.getDataSuaButPhe(this.timKiemDanhSach).subscribe(data => {
      if (data.isError) {
      } else {
        this.lstButPhe = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  public SuaCongViec(idVanBan: string) {
    this.router.navigate(['/van-ban-den/sua-cong-viec'], {
      queryParamsHandling: 'merge',
      queryParams: { idVanBan: idVanBan },
    });
  }

  Thoat(item: any, type: string) {
    if (type === 'CT') {
      this.hienThiChiTiet = false;
    }
    this.GetDanhSachSuaButPhe();
  }
  
}

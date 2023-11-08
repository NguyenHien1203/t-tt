import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-den/cap-nhat-moi/cap-nhat-moi.service';
import { TimKiemDanhSach } from 'src/app/models/van-ban-den/cap-nhat-moi';


@Component({
  selector: 'app-cap-nhat-moi',
  templateUrl: './cap-nhat-moi.component.html',
  styleUrls: ['./cap-nhat-moi.component.scss'],
  providers: [MessageService]
})

export class CapNhatMoiComponent implements OnInit {
  items: any[] = [];
  home: any;
  //Khai báo sổ văn bản option
  SoVanBan = [];
  //Khai báo loại văn bản option
  LoaiVanBan = [];
  //Khai báo cơ quan ban hành
  CoQuanBanHanh = [];
  loading: boolean = true;
  yearOptions: SelectItem[] = [];
  public timChinhXac: boolean = false;
  LstCapNhatMoi : any[] = [];

  TrangThaiPhanPhoi = "";

  public timKiemDanhSach: TimKiemDanhSach = {
    trichYeu: "",
    tuNgay: "",
    denNgay: "",
    soVBId: "",
    loaiVBId: "",
    nam: new Date().getFullYear(),
    soDen: "",
    soKyHieu: "",
    lanhDaoKy: "",
    coQuanBanHanh: "",
    timChinhXac: 0,
    DonViLamViec:""
  }


  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Văn bản đến' }, { label: 'Cập nhật mới' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.GetDataSoVanBan();
    this.GetDataYear();
    this.GetDataCoQuanBanHanh();

    this.GetDanhSachCapNhatMoi();
  }

  constructor(
    private messageService: MessageService,
    private capnhatmoiService: CapNhatMoiService,
  ) { }

  public CheckedHt(): void {
    this.timChinhXac = !this.timChinhXac;
  }

  /**
   * lấy dữ liệu bản ghi cập nhật mới
   */
  public GetDanhSachCapNhatMoi() {
    console.log('this.timKiemDanhSach',this.timKiemDanhSach)
    this.capnhatmoiService.getDanhSachCapNhatMoi(this.timKiemDanhSach).subscribe(data => {
      if (data.isError) {
       
      } else {
        this.LstCapNhatMoi = data.objData;
        console.log(this.LstCapNhatMoi)
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  public GetDataSoVanBan() {
    this.capnhatmoiService.GetDataSoVanBan().subscribe(data => {
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
    this.capnhatmoiService.GetDataLoaiVanBanByIdSoVanBan(IdSoVanBan).subscribe(data => {
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
   * GetDataCoQuanBanHanh
   */
  public GetDataCoQuanBanHanh() {
    this.capnhatmoiService.GetDataCoQuanBanHanh().subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.CoQuanBanHanh = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  /**
   * ThemMoi
   */
  public ThemMoi() {
    
  }

}

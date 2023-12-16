import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-den/cap-nhat-moi/cap-nhat-moi.service';
import { TimKiemDanhSach } from 'src/app/models/van-ban-den/cap-nhat-moi';



@Component({
  selector: 'app-cap-nhat-moi',
  templateUrl: './cap-nhat-moi.component.html',
  styleUrls: ['./cap-nhat-moi.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class CapNhatMoiComponent implements OnInit {
  //Khai báo biến cho phần phân phối
  hienThiPhanPhoi: boolean = false;
  hienThiCapNhat: boolean = false;

  id: any = "";


  //Khai báo phần thêm mới văn bản
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
  LstCapNhatMoi: any[] = [];

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
    DonViLamViec: ""
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

  
  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  constructor(
    private messageService: MessageService,
    private capnhatmoiService: CapNhatMoiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef
  ) { }

  public CheckedHt(): void {
    this.timChinhXac = !this.timChinhXac;
  }

  /**
   * lấy dữ liệu bản ghi cập nhật mới
   */
  public GetDanhSachCapNhatMoi() {
    this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
    this.capnhatmoiService.getDanhSachCapNhatMoi(this.timKiemDanhSach).subscribe(data => {
      if (data.isError) {

      } else {
        this.LstCapNhatMoi = data.objData;
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
    this.router.navigate(['/van-ban-den/them-moi']);
  }

  public updateVanBan(idVanBan: string) {
    console.log(idVanBan)
    this.hienThiCapNhat = true;
    this.id = idVanBan;
  }

  /**
   * Xóa văn bản
   */
  public deleteVanBan(idVanBan: string) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa văn bản?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.capnhatmoiService.DeleteVanBan(idVanBan).subscribe(data => {
          if (data.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
            this.GetDanhSachCapNhatMoi();
          }
        }, (error) => {
          console.log('Error', error);
        })
      },
      reject: () => {

      }
    });
  }

  public Thoat(itemHt: any, loai: string): void {
    if (loai === 'C')
      this.hienThiCapNhat = false;
    if (loai === 'P')
      this.hienThiPhanPhoi = false;
    this.GetDanhSachCapNhatMoi();
  }

  /**
   * phanphoiVanBan
   */
  public phanphoiVanBan(idVanBan: string) {
    this.hienThiPhanPhoi = true;
    this.id = idVanBan;
  }
}

import { Component, OnInit } from '@angular/core';
import {  MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { DonViService } from 'src/app/demo/service/danh-muc/don-vi/don-vi.service';
import { DmDonVi, TimKiemModel } from 'src/app/models/danh-muc/don-vi/donvi.model';

@Component({
  templateUrl: './don-vi.component.html',
  styleUrls: ['./don-vi.component.scss'],
  providers: [MessageService],
})

export class DonViComponent  implements OnInit {

  //Trả ra thanh trang chủ
  breadcrumbItems: MenuItem[] = [];
  items: any[] = [];
  home: any;
  loading: boolean = true;
  // hết

  danhmuc: DmDonVi[] = [];
  phongBans: DmDonVi[] = [];
  msgs: Message[] = [];

  //Dữ liệu truyền để tìm kiếm 
  timChinhXac: boolean = false;
  timkiems: TimKiemModel = {
    MaDonVi: "",
    TenDonVi: "",
    chkTimChinhXac: 0
  };
  // hết

  //Check vào thêm mới hay cập nhật
  id: string = "";
  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;

  //Angular thực hiện phân trang
  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  //Hết 

  constructor(private messageService: MessageService, private dmPhongBanService: DonViService) { }

  ngOnInit(): void {

    this.items = [{ label: 'Danh mục' }, { label: 'đơn vị' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.loading = false;
    //Trỏ đến get danh sách
    this.getDanhSachDonVi(this.timkiems);
  }

  //Thay đổi giá trị checkbox tìm kiếm
  public CheckChinhXac(): void {
    this.timChinhXac = !this.timChinhXac;
  }

  //#region 
  //Thêm mới đơn vị
  public ThemMoi(): void {
    this.hienThiThemMoi = true;
  }
 //#endregion

  //#region 
  //Cập nhật đơn vị
  public CapNhatDonVi(id: string): void {
    this.id = id;
    this.hienThiCapNhat = true;
  }
  //#endregion

  //#region 
  //Nút thoát
  public Thoat(itemHt: any, loai: string): void {
    if (loai === 'T')
      this.hienThiThemMoi = false;
    else
      this.hienThiCapNhat = false;
  }
  //#endregion

  //#region 
  // Get List Phong Ban
  public getDanhSachDonVi(timkiems: TimKiemModel) {
    this.timkiems.chkTimChinhXac = this.timChinhXac ? 1 : 0;
    this.dmPhongBanService.getDanhSachDonVi(timkiems).then(data => { this.phongBans = data; console.log(data) }
    )
  };
  //#endregion
}


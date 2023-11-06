import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { DmPhongBan, TimKiemModel } from 'src/app/demo/api/danh-muc/phong-ban';
import { PhongbanService } from 'src/app/demo/service/danh-muc/phong-ban/phongban.service';

@Component({
  templateUrl: './phong-ban.component.html',
  styleUrls: ["./phong-ban.component.scss"],
  providers: [MessageService, ConfirmationService]
})
export class PhongBanComponent implements OnInit {

  //Trả ra thanh trang chủ
  breadcrumbItems: MenuItem[] = [];
  items: any[] = [];
  home: any;
  loading: boolean = true;
  // hết

  danhmuc: DmPhongBan[] = [];
  phongBans: DmPhongBan[] = [];
  msgs: Message[] = [];

  //Dữ liệu truyền để tìm kiếm 
  timChinhXac: boolean = false;
  timkiems: TimKiemModel = {
    MaPhongBan: "",
    TenPhongBan: "",
    DonViId: 0,
    chkTimChinhXac: 0
  };
  // hết
  id: string = "";

  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;

  //Angular thực hiện phân trang
  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  //Hết 

  constructor(private messageService: MessageService, private dmPhongBanService: PhongbanService, private confirmationService: ConfirmationService,) { }

  ngOnInit(): void {

    this.items = [{ label: 'Danh mục' }, { label: 'Phòng ban' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.loading = false;
    //Trỏ đến get danh sách
    this.getDanhSachPhongBan(this.timkiems);
  }

  //Thay đổi giá trị checkbox tìm kiếm
  public CheckChinhXac(): void {
    this.timChinhXac = !this.timChinhXac;
  }

  //#region 
  //Thêm mới phòng ban
  public ThemMoi(): void {
    this.hienThiThemMoi = true;
  }
 //#endregion

  //#region 
  //Cập nhật phòng ban
  public CapNhatPhongBan(id: string): void {
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
  public getDanhSachPhongBan(timkiems: TimKiemModel) {
    this.timkiems.chkTimChinhXac = this.timChinhXac ? 1 : 0;
    this.dmPhongBanService.getDanhSachPhongBan(timkiems).then(data => { this.phongBans = data }
    )
  };

  // public GetTenDonVi(Id: string){
  //   this.dmPhongBanService.getDanhSachPhongBan(timkiems).then(data => { this.phongBans = data }
  // }

  //#endregion

 //#region 
  // Xóa du lieu Phong Ban
  public Xoa(id: string) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn xác nhận xóa liên kết?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.dmPhongBanService.xoaPhongBan(id).subscribe(data => {
          if (data.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
          }
        }, (error) => {
          console.log('Error', error);
        })
      },
      reject: () => {
      }
    });
  }
   //#endregion 
}

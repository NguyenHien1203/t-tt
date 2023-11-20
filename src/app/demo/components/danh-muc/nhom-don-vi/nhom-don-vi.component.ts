import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NhomDonViService } from 'src/app/demo/service/danh-muc/nhom-don-vi/nhom-don-vi.service';
import { NhomDonVi, TimKiemModel } from 'src/app/models/danh-muc/nhom-don-vi/nhom-don-vi';

@Component({
  selector: 'app-nhom-don-vi',
  templateUrl: './nhom-don-vi.component.html',
  styleUrls: ['./nhom-don-vi.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class NhomDonViComponent implements OnInit {
  constructor(private service: NhomDonViService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  //Khai báo biến gọi ra ngoài trang chủ 
  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;
  hienThiThemmDonVi: boolean = false;

  items: any[] = [{ label: 'Danh mục' }, { label: '' }];
  id: string = "";
  home: any = { icon: 'pi pi-home', routerLink: '/' };
  lienKetDialog: boolean = false;
  loading: boolean = true;
  //hết

  //Dữ liệu truyền vào để tìm kiếm
  timChinhXac: boolean = false;
  timKiem: TimKiemModel = {
    KeyWord: '',
    MoTa: '',
    TimChinhXac: 0,
  }

  nhomDonVis: NhomDonVi[] = [];
  //hết

  //hàm load danh sách
  ngOnInit(): void {
    this.items = [{ label: 'Danh mục' }, { label: 'nhóm đơn vị' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.loading = false;
    //Trỏ đến get danh sách
    this.LoadDanhSach(this.timKiem);
  }

  //Thay đổi giá trị checkbox tìm kiếm
  public CheckChinhXac(): void {
    this.timChinhXac = !this.timChinhXac;
  }


  //#region 
  // Get List Phong Ban
  public LoadDanhSach(timkiems: TimKiemModel) {
    this.timKiem.TimChinhXac = this.timChinhXac ? 1 : 0;
    this.service.getDanhSachNhomDonVi(timkiems).then(data => { this.nhomDonVis = data; console.log(data) }
    )
  };
  //#endregion

  //#region Themmoi, capnhat, Xoa ,thoat
  public ThemMoi(): void {
    this.hienThiThemMoi = true;
  }

  public CapNhat(id: string): void {
    this.hienThiCapNhat = true;
    this.id = id;
  }

  public Thoat(itemHt: any, loai: string): void {
    if (loai === 'T')
      this.hienThiThemMoi = false;
      if (loai === 'Z')
      this.hienThiThemmDonVi = false;
    else
      this.hienThiCapNhat = false;
    this.LoadDanhSach(this.timKiem);
  }


  public Xoa(id: string) {
    console.log("id", id)
    this.confirmationService.confirm({
      message: 'Đồng ý xóa nhóm đơn vị?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.xoaNhomDonVi(id).subscribe(data => {
          if (data.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
          } else {
            this.LoadDanhSach(this.timKiem);
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


  //Thêm đơnvị vào form
  public ThemDonVi(id: string): void {
    this.hienThiThemmDonVi = true;
    this.id = id;
  }
}

import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoQuanBanHanhService } from 'src/app/demo/service/danh-muc/co-quan-ban-hanh/co-quan-ban-hanh.service';
import { CoQuanBanHanh, TimKiemModel } from 'src/app/models/danh-muc/co-quan-ban-hanh/co-quan-ban-hanh.model';
import { CoQuanBanHanhModule } from './co-quan-ban-hanh.module';

@Component({
  selector: 'app-co-quan-ban-hanh',
  templateUrl: './co-quan-ban-hanh.component.html',
  styleUrls: ['./co-quan-ban-hanh.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CoQuanBanHanhComponent implements OnInit {

  constructor(private service: CoQuanBanHanhService
    , private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;
  items: any[] = [{ label: 'Danh mục' }, { label: 'cơ quan ban hành' }];
  id: string = "";
  home: any = { icon: 'pi pi-home', routerLink: '/' };
  lienKetDialog: boolean = false;

  //Dữ liêu truyền vào để tìm kiếm
  timChinhXac: boolean = false;
  timKiem: TimKiemModel = {
    KeyWord: '',
    GhiChu: '',
    KyHieu: '',
    TimChinhXac: 0,
  }

  coQuanBanHanhs: CoQuanBanHanh[] = [];
  selectedState: any = null;
  loading: boolean = true;

  ngOnInit(): void {
    this.items = [{ label: 'Danh mục' }, { label: 'Đơn vị' }];
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
    this.service.getDanhSachCoQuan(timkiems).then(data => { this.coQuanBanHanhs = data; console.log(data) }
    )
  };
  //#endregion

  public ThemMoi(): void {
    this.hienThiThemMoi = true;
  }

  public CapNhat(id: string): void {
    this.hienThiCapNhat = true;
    this.id = id;
  }

  public Xoa(id: string) {
    console.log("id", id)
    this.confirmationService.confirm({
      message: 'Đồng ý xóa cơ quan?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.xoaCoQuan(id).subscribe(data => {
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

  public Thoat(itemHt: any, loai: string): void {
    if (loai === 'T')
      this.hienThiThemMoi = false;
    else
      this.hienThiCapNhat = false;
    this.LoadDanhSach(this.timKiem);
  }

}

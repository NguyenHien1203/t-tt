import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaiNhiemVuService } from 'src/app/demo/service/danh-muc/loai-nhiem-vu/loai-nhiem-vu.service';
import { TimKiemDanhSach } from 'src/app/models/danh-muc/loai-nhiem-vu/loai-nhiem-vu';

@Component({
  selector: 'app-loai-nhiem-vu',
  templateUrl: './loai-nhiem-vu.component.html',
  styleUrls: ['./loai-nhiem-vu.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class LoaiNhiemVuComponent implements OnInit {
  constructor(private service: LoaiNhiemVuService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }
  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [{ label: 'Danh mục' }, { label: 'Loại nhiệm vụ' }];
    this.loading = false;
    this.LoadDanhSach(this.timKiemDanhSach);
  }
  timChinhXac: boolean = false;
  timKiemDanhSach: TimKiemDanhSach = {
    keyWord: "",
    moTa: "",
    timChinhXac: 0,
    donViId: 0
  };
  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;
  loading: boolean = true;
  loaiNhiemVus: any[] = [];
  home: any;
  items: any[] = [];
  id: string = "";

  LoadDanhSach(timKiemDanhSach: TimKiemDanhSach) {
    this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
    console.log(this.timKiemDanhSach.timChinhXac)

    this.service.getDanhSachLoaiNhiemVu(timKiemDanhSach).then(data => { this.loaiNhiemVus = data })
  }

  public Thoat(itemHt: any, loai: string): void {
    if (loai === 'T')
      this.hienThiThemMoi = false;
    else
      this.hienThiCapNhat = false;
    this.LoadDanhSach(this.timKiemDanhSach);
  }

  public ThemMoi(): void {
    this.hienThiThemMoi = true;
  }

  public CapNhat(id: string): void {
    this.hienThiCapNhat = true;
    this.id = id;
  }

  public CheckedHt(): void {
    this.timChinhXac = !this.timChinhXac;
  }

  public Xoa(id: string) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn xác nhận xóa loại nhiệm vụ?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.xoaLoaiNhiemVu(id).subscribe(data => {
          if (data.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
          } else {
            this.LoadDanhSach(this.timKiemDanhSach);
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
}

import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { QuanLyBangLuongService } from 'src/app/demo/service/thong-tin-khac/quan-ly-bang-luong.service';
import { TimKiemDanhSach } from 'src/app/models/thong-tin-khac/quan-ly-bang-luong';
import {saveAs} from 'file-saver';
import { AuthService } from 'src/app/common/auth.services';

@Component({
  selector: 'app-quan-ly-bang-luong',
  templateUrl: './quan-ly-bang-luong.component.html',
  styleUrls: ['./quan-ly-bang-luong.component.scss'],
  providers : [MessageService, ConfirmationService]
})
export class QuanLyBangLuongComponent implements OnInit {
  constructor(private service: QuanLyBangLuongService
    , private messageService: MessageService
    , private authService : AuthService
    , private confirmService: ConfirmationService) { }

  quanLyBangLuongs : any ;
  loading : boolean = false;
  public id: string = "1";
  public hienThiThemMoi: boolean = false;
  public hienThiCapNhat: boolean = false;
  

  ngOnInit(): void {
    this.loading = false;
    this.LoadDanhSach();
  }

  public downloadFile(id : string, fileName : string) {
    this.service.getFile(id).subscribe((data) => {
      if(data)
      {
        const blob = new Blob([data], { type: 'application/octet-stream' });

        // Sử dụng saveAs để tải tệp xuống với tên cụ thể.
        saveAs(blob, fileName);
      }
    });
  }

  timChinhXac : boolean = false;
  idDonViLamViec : number = Number(this.authService.GetDonViLamViec());
  timKiemDanhSach : TimKiemDanhSach= {
    keyWord : "",
    noiDung: "",
    donViId : this.idDonViLamViec ?? 0,
    timChinhXac : 0
  };
  public home = { icon: 'pi pi-home', routerLink: '/' };
  public items = [{ label: 'Thông tin khác' }, { label: 'Quản lý bảng lương' }];

  public ThemMoi(): void {
    this.hienThiThemMoi = true;
  }

  public CapNhat(id: string): void {
    this.hienThiCapNhat = true;
    this.id = id;
  }

  public Xoa(id: string) {
    this.confirmService.confirm({
      message: 'Bạn có chắc chắn xác nhận xóa bảng lương?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.xoaQuanLyBangLuong(id).subscribe(data => {
          if (data.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
          } else {
            this.LoadDanhSach();
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
    if (loai === 'C')
      this.hienThiCapNhat = false;
    this.LoadDanhSach();
  }

  public LoadDanhSach(): void {
    this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
    this.service.getDanhSachQuanLyBangLuong(this.timKiemDanhSach).then(data => { this.quanLyBangLuongs = data;})
  }

  public CheckedHt(): void {
    this.timChinhXac = !this.timChinhXac;
  }
}

import { Component, OnInit } from '@angular/core';
import { Message, MessageService, ConfirmationService } from 'primeng/api';
import { TaiKhoanService } from '../../../service/he-thong/tai-khoan.service';
import { TaiKhoan, TaiKhoanTimKiem } from '../../../../models/he-thong/tai-khoan';

@Component({
  selector: 'app-tai-khoan',
  templateUrl: './tai-khoan.component.html',
  providers: [MessageService, ConfirmationService]
})
export class TaiKhoanComponent implements OnInit {
  msgs: Message[] = [];
  items: any[] = [];
  home: any;
  taikhoantimkiem: TaiKhoanTimKiem = {
    TuKhoa: '',
    TenPhongBan: '',
    TenChucDanh: '',
  }

  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;

  valGioiTinh: string = '';
  TuKhoa: string = '';
  TenPhongBan: string = '';
  TenChucDanh: string = '';

  taikhoans: TaiKhoan[] = [];

  taikhoan: TaiKhoan = {};

  selectedTaiKhoans: TaiKhoan[] = [];

  taikhoanDialog: boolean = false;

  deleteTaiKhoansDialog: boolean = false;

  deleteTaiKhoanDialog: boolean = false;

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(

    private messageService: MessageService,
    private taikhoanService: TaiKhoanService,
    private confirmationService: ConfirmationService
  ) { }
  mUserInfo: any;
  ngOnInit() {

    this.items = [{ label: 'Hệ thống' }, { label: 'Quản trị tài khoản' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    ``
    this.GetDanhSachTaiKhoan();
  }

  public GetDanhSachTaiKhoan() {
    this.taikhoantimkiem.TenChucDanh = this.TenChucDanh;
    this.taikhoantimkiem.TenPhongBan = this.TenPhongBan;
    this.taikhoantimkiem.TuKhoa = this.TuKhoa;

    this.taikhoanService.GetDanhSachTaiKhoan(this.taikhoantimkiem).subscribe(data => {
      if (data.isError) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
      } else {
        this.taikhoans = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  public ThemMoi(): void {
    this.hienThiThemMoi = true;
  }

  public Thoat(itemHt: any, loai: string): void {
    if (loai === 'T')
      this.hienThiThemMoi = false;
    else
      this.hienThiCapNhat = false;
    this.GetDanhSachTaiKhoan();
  }

  public openNew() {
    this.taikhoan = {};
    this.submitted = false;
    this.taikhoanDialog = true;
  }

  // public editTaiKhoan(id: string): void {
  //   this.hienThiCapNhat = true;
  //   this.id = id;
  // }



  hideDialog() {
    this.taikhoanDialog = false;
    this.submitted = false;
  }


  public deleteTaiKhoan(id: string) {

    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa tài khoản?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.taikhoanService.DeleteTaiKhoan(id).subscribe(data => {
          if (data.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
          } else {
            this.GetDanhSachTaiKhoan();
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



import { ChucDanhService } from './../../../service/danh-muc/chuc-danh/chuc-danh.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { ChucDanh } from 'src/app/models/danh-muc/chuc-danh';
import { Search } from 'src/app/models/danh-muc/search.model';
import { AuthService } from 'src/app/common/auth.services';

@Component({
  templateUrl: './chuc-danh.component.html',
  styleUrls: ['./chuc-danh.component.scss'],
  providers: [MessageService]
})
export class ChucDanhComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];

  cols: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  listTitle: ChucDanh = {};

  listTitles: ChucDanh[] = [];

  search: Search = {};

  dataSearch = {
    "keyWord": "",
    "nam": 0,
    "tuNgay": new Date(),
    "denNgay": new Date()
  };

  dataTitle = {
    "id": 0,
    "tenChucDanh": "",
    "thuTu": 0,
    "ghiChu": "",
    "hienThi": true,
    "donViId": 0,
    "created": new Date(),
    "createdBy": 0,
    "lastModified": new Date(),
    "lastModifiedBy": 0,
  }

  productDialog: boolean = false;

  submitted: boolean = false;

  deleteProductDialog: boolean = false;

  idTitle: number;

  header: string;

  valCheck: string[] = [];

  msgs: Message[] = [];

  constructor(private messageService: MessageService, private chucDanhService: ChucDanhService, private authService: AuthService) { }

  ngOnInit() {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Danh mục' });
    this.breadcrumbItems.push({ label: 'Quản trị chức danh' });

    this.LoadListTitles();
    console.log(this.authService.GetmUserInfo());
    console.log(this.authService.GetDonViLamViec());
  }

  LoadListTitles() {
    this.chucDanhService.getListTitles(this.dataSearch)
      .subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
        } else {
          this.listTitles = data;
        };
      }, (error) => {
        console.log('Error', error);
      })
  }

  searchTitle() {
    this.dataSearch.keyWord = this.search.keyWord ?? "";
    this.LoadListTitles();
  }

  openNew() {
    this.listTitle = {};
    this.submitted = false;
    this.productDialog = true;
    this.header = "Thêm mới chức danh";
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveTitle() {
    this.submitted = true;

    if (this.listTitle.tenChucDanh?.trim()) {
      this.dataTitle.tenChucDanh = this.listTitle.tenChucDanh;
      this.dataTitle.thuTu = this.listTitle.thuTu;
      this.dataTitle.ghiChu = this.listTitle.ghiChu;

      if (this.listTitle.id) {
        this.dataTitle.lastModified = new Date();
        this.dataTitle.lastModifiedBy = 0;
        this.chucDanhService.updateTitle(this.dataTitle, this.listTitle.id).subscribe(data => {
          console.log(data);
          this.LoadListTitles();
          if (data.code == 200) {
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công', life: 3000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Cập nhật không thành công', life: 3000 });
          }
        })
      } else {
        this.chucDanhService.createTitle(this.dataTitle).subscribe(data => {
          console.log(data);
          this.LoadListTitles();
          if (data.code == 200) {
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Tạo mới thành công', life: 3000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tạo mới không thành công', life: 3000 });
          }
        });
      }
      this.productDialog = false;
      this.listTitle = {};
    }
  }

  editTitle(id: number) {
    this.header = "Cập nhật chức danh"
    this.submitted = false;
    this.productDialog = true;
    this.chucDanhService.getIdTitle(id).subscribe(data => {
      this.listTitle = data;
    });
  }

  deleteTitle(id: number) {
    this.deleteProductDialog = true;
    this.idTitle = id;
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.chucDanhService.deleteTitle(this.idTitle).subscribe(data => {
      console.log(data)
      this.LoadListTitles();
      if (data.code == 200) {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa bản ghi thành công', life: 3000 });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Không thể xóa bản ghi', life: 3000 });
      }
    });
    this.listTitle = {};
  }
}

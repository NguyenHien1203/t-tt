import { ChucDanhService } from './../../../service/danh-muc/chuc-danh/chuc-danh.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';

import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Message, MessageService } from 'primeng/api';
import { ChucDanh } from 'src/app/models/danh-muc/chuc-danh';
import { Search } from 'src/app/models/danh-muc/search.model';

@Component({
  templateUrl: './chuc-danh.component.html',
  styleUrls: ['./chuc-danh.component.scss'],
  providers: [MessageService]
})
export class ChucDanhComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];

  cols: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  listField: ChucDanh = {};

  listFields: ChucDanh[] = [];

  search: Search = {};

  dataSearch = {
    "keyWord": "",
    "nam": 0,
    "tuNgay": new Date(),
    "denNgay": new Date()
  };

  dataField = {
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

  idField: number;

  header: string;




  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  statuses: any[] = [];

  valCheck: string[] = [];

  msgs: Message[] = [];

  constructor(private productService: ProductService, private messageService: MessageService, private chucDanhService: ChucDanhService) { }

  ngOnInit() {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Danh mục' });
    this.breadcrumbItems.push({ label: 'Quản trị chức danh' });

    this.cols = [
      { field: 'tenChucDanh', header: 'tenChucDanh' },
      { field: 'thuTu', header: 'thuTu' },
    ];

    this.LoadListField();
  }

  LoadListField() {
    this.chucDanhService.getListFields(this.dataSearch)
      .subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
        } else {
          this.listFields = data;
        };
      }, (error) => {
        console.log('Error', error);
      })
  }

  searchField() {
    this.dataSearch.keyWord = this.search.keyWord ?? "";
    this.LoadListField();
  }

  openNew() {
    this.listField = {};
    this.submitted = false;
    this.productDialog = true;
    this.header = "Thêm mới chức danh";
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveField() {
    this.submitted = true;

    if (this.listField.tenChucDanh?.trim()) {
      this.dataField.tenChucDanh = this.listField.tenChucDanh;
      this.dataField.thuTu = this.listField.thuTu;
      this.dataField.ghiChu = this.listField.ghiChu;

      if (this.listField.id) {
        this.dataField.lastModified = new Date();
        this.dataField.lastModifiedBy = 0;
        this.chucDanhService.updateField(this.dataField, this.listField.id).subscribe(data => {
          console.log(data);
          this.LoadListField();
          if (data.code == 200) {
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công', life: 3000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Cập nhật không thành công', life: 3000 });
          }
        })
      } else {
        this.chucDanhService.createField(this.dataField).subscribe(data => {
          console.log(data);
          this.LoadListField();
          if (data.code == 200) {
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Tạo mới thành công', life: 3000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tạo mới không thành công', life: 3000 });
          }
        });
      }
      this.productDialog = false;
      this.product = {};
    }
  }

  editField(id: number) {
    this.header = "Cập nhật chức danh"
    this.submitted = false;
    this.productDialog = true;
    this.chucDanhService.getIdField(id).subscribe(data => {
      this.listField = data;
      console.log(data);
    });
  }

  deleteField(id: number) {
    this.deleteProductDialog = true;
    this.idField = id;
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.chucDanhService.deleteField(this.idField).subscribe(data => {
      console.log(data)
      this.LoadListField();
      if (data.code == 200) {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa bản ghi thành công', life: 3000 });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Không thể xóa bản ghi', life: 3000 });
      }
    });
    this.listField = {};
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}

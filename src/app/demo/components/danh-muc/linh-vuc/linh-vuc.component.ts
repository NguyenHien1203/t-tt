import { Component, OnInit } from '@angular/core';
import { LinhVucService } from 'src/app/demo/service/danh-muc/linh-vuc/linh-vuc.service';
import { LinhVuc } from 'src/app/models/danh-muc/linh-vuc';
import { MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { Search } from 'src/app/models/danh-muc/search.model';

@Component({
  selector: 'app-linh-vuc',
  templateUrl: './linh-vuc.component.html',
  styleUrls: ['./linh-vuc.component.scss'],
  providers: [MessageService]
})

export class LinhVucComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];

  cols: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  listField: LinhVuc = {};

  listFields: LinhVuc[] = [];

  search: Search = {};

  dataSearch = {
    "keyWord": "",
    "nam": 0,
    "tuNgay": new Date(),
    "denNgay": new Date()
  };

  dataField = {
    "id": 0,
    "vietTat": "",
    "tenLinhVuc": "",
    "thuTu": 0,
    "hienThi": true,
    "ghiChu": "",
    "donViId": 0,
    "phongBanId": 0,
    "parentId": 0,
    "soHshienTai": 0,
    "soHstruoc": 0,
    "created": new Date(),
    "createdBy": 0,
    "lastModified": new Date(),
    "lastModifiedBy": 0,
    "donViIdPhongban": 0
  }

  productDialog: boolean = false;

  submitted: boolean = false;

  deleteProductDialog: boolean = false;

  idField: number;

  header: string;

  valCheck: string[] = [];

  msgs: Message[] = [];

  showCreated: boolean = false;

  constructor(private messageService: MessageService, private linhVucService: LinhVucService) { }

  ngOnInit() {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Danh mục' });
    this.breadcrumbItems.push({ label: 'Quản trị lĩnh vực' });

    this.cols = [
      { field: 'tenChucDanh', header: 'tenChucDanh' },
      { field: 'thuTu', header: 'thuTu' },
    ];

    this.LoadListFields();
  }

  LoadListFields() {
    this.linhVucService.getListFields(this.dataSearch)
      .subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
        } else {
          console.log(data);
          
          this.listFields = data;
        };
      }, (error) => {
        console.log('Error', error);
      })
  }

  searchField() {
    this.dataSearch.keyWord = this.search.keyWord ?? "";
    this.LoadListFields();
  }

  openNew() {
    this.showCreated = true;
  }

  public closePopup(item: any, type: string): void {
    if (type === 'C')
      this.showCreated = false;
    else
      this.showCreated = false;
    this.LoadListFields();
  }

  // hideDialog() {
  //   this.productDialog = false;
  //   this.submitted = false;
  // }

  saveField() {
    this.submitted = true;

    if (this.listField.tenLinhVuc?.trim()) {
      this.dataField.tenLinhVuc = this.listField.tenLinhVuc;
      this.dataField.thuTu = this.listField.thuTu;
      this.dataField.ghiChu = this.listField.ghiChu;

      if (this.listField.id) {
        this.dataField.lastModified = new Date();
        this.dataField.lastModifiedBy = 0;
        this.linhVucService.updateField(this.dataField, this.listField.id).subscribe(data => {
          console.log(data);
          this.LoadListFields();
          if (data.code == 200) {
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công', life: 3000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Cập nhật không thành công', life: 3000 });
          }
        })
      } else {
        this.linhVucService.createField(this.dataField).subscribe(data => {
          console.log(data);
          this.LoadListFields();
          if (data.code == 200) {
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Tạo mới thành công', life: 3000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tạo mới không thành công', life: 3000 });
          }
        });
      }
      this.productDialog = false;
      this.listField = {};
    }
  }

  editField(id: number) {
    this.header = "Cập nhật chức danh"
    this.submitted = false;
    this.productDialog = true;
    this.linhVucService.getIdField(id).subscribe(data => {
      this.listField = data;
    });
  }

  deleteField(id: number) {
    this.deleteProductDialog = true;
    this.idField = id;
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.linhVucService.deleteField(this.idField).subscribe(data => {
      console.log(data)
      this.LoadListFields();
      if (data.code == 200) {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa bản ghi thành công', life: 3000 });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Không thể xóa bản ghi', life: 3000 });
      }
    });
    this.listField = {};
  }
}

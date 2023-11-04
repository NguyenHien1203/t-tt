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

  submitted: boolean = false;

  deleteProductDialog: boolean = false;

  idField: string = '1';

  idDelete: Number;

  header: string;

  valCheck: string[] = [];

  msgs: Message[] = [];

  showCreated: boolean = false;

  showUpdated: boolean = false;

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

  editField(id: string) {
    this.showUpdated = true;
    this.idField = id;
  }

  public closePopup(item: any, type: string): void {
    if (type === 'C')
      this.showCreated = false;
    else
      this.showUpdated = false;
    this.LoadListFields();
  }

  deleteField(id: number) {
    this.deleteProductDialog = true;
    this.idDelete = id;
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.linhVucService.deleteField(this.idDelete).subscribe(data => {
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

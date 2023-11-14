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

  linhVuc: LinhVuc = {};
  cacLinhVuc: LinhVuc[] = [];

  timKiem: Search = {};
  dataSearch = {
    "keyWord": "",
    "nam": 0,
    "tuNgay": new Date(),
    "denNgay": new Date()
  };

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

    this.GetDanhSachLinhVuc();
  }

  GetDanhSachLinhVuc() {
    this.linhVucService.getDanhSachLinhVuc(this.dataSearch)
      .subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
        } else {
          this.cacLinhVuc = data;
        };
      }, (error) => {
        console.log('Error', error);
      })
  }

  TimKiemLinhVuc() {
    this.dataSearch.keyWord = this.timKiem.keyWord ?? "";
    this.GetDanhSachLinhVuc();
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
    this.GetDanhSachLinhVuc();
  }

  deleteField(id: number) {
    this.deleteProductDialog = true;
    this.idDelete = id;
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.linhVucService.xoa(this.idDelete).subscribe(data => {
      this.GetDanhSachLinhVuc();
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
      }
    });
    this.linhVuc = {};
  }
}

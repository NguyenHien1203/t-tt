import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { LoaiHoSoService } from 'src/app/demo/service/danh-muc/loai-ho-so/loai-ho-so.service';
import { LoaiHoSo } from 'src/app/models/danh-muc/loai-ho-so';
import { Search } from 'src/app/models/danh-muc/search.model';

@Component({
  selector: 'app-loai-ho-so',
  templateUrl: './loai-ho-so.component.html',
  styleUrls: ['./loai-ho-so.component.scss'],
  providers: [MessageService]
})

export class LoaiHoSoComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  search: Search = {};
  dataSearch = {
    "keyWord": "",
    "nam": 0,
    "tuNgay": new Date(),
    "denNgay": new Date()
  };

  listRecords: LoaiHoSo[] = [];
  listRecord: LoaiHoSo = {};

  idRecord: any;

  valCheck: String[] = [];
  deleteProductDialog: boolean = false;
  msgs: Message[] = [];

  showCreated: boolean = false;

  constructor(private messageService: MessageService, private loaiHoSoService: LoaiHoSoService) { }

  ngOnInit() {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Danh mục' });
    this.breadcrumbItems.push({ label: 'Quản trị loại hồ sơ công việc' });
    this.ListRecords();
  }

  openNew() {
    this.showCreated = true;
  }

  closePopup(item: any, type: string) {
    if (type === 'C') {
      this.showCreated = false;
    }
    this.ListRecords();
  }

  searchRecord() {
    this.dataSearch.keyWord = this.search.keyWord ?? "";
    this.ListRecords();
  }

  enterSearchRecord(event: any) {
    if (event.key === "Enter") {
      this.searchRecord();
    }
  }

  deleteRecord(id: any) {
    this.deleteProductDialog = true;
    this.idRecord = id;
  }

  cancelDelete() {
    this.deleteProductDialog = false;
    this.idRecord = null;
  }

  ListRecords() {
    this.loaiHoSoService.getListRecords(this.dataSearch)
      .subscribe(data => {
        if (data.idError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
        } else {
          this.listRecords = data
        }
      }, (error) => {
        console.log("Error:" + error);
      })
  }
}

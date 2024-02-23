import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { LoaiHoSoService } from 'src/app/demo/service/danh-muc/loai-ho-so/loai-ho-so.service';
import { LoaiHoSo, TimKiemLoaiHoSo } from 'src/app/models/danh-muc/loai-ho-so';

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

  search: TimKiemLoaiHoSo = {
    keyWord: "",
    ma: "",
    timChinhXac: 0
  };

  listRecords: LoaiHoSo[] = [];
  listRecord: LoaiHoSo = {};

  idRecord: any;

  timChinhXac: boolean = false;
  deleteProductDialog: boolean = false;
  msgs: Message[] = [];

  showCreated: boolean = false;
  hienThiCapNhat: boolean = false;
  idLoaiHoSo: string = '1';

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

  checkCX() {
    this.timChinhXac = !this.timChinhXac;
  }

  closePopup(item: any, type: string) {
    if (type === 'C') {
      this.showCreated = false;
    } else {
      this.hienThiCapNhat = false;
    }
    this.ListRecords();
  }

  searchRecord() {
    this.search.keyWord = this.search.keyWord ?? "";
    this.ListRecords();
  }

  enterSearchRecord(event: any) {
    if (event.key === "Enter") {
      this.searchRecord();
    }
  }

  editRecord(id: string) {
    this.hienThiCapNhat = true;
    this.idLoaiHoSo = id;
  }

  deleteRecord(id: any) {
    this.deleteProductDialog = true;
    this.idRecord = id;
  }

  cancelDelete() {
    this.deleteProductDialog = false;
    this.idRecord = null;
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.loaiHoSoService.xoaLoaiHoSo(this.idRecord).subscribe(data => {
      this.ListRecords();
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
      }
    });
  }

  ListRecords() {
    this.search.timChinhXac = this.timChinhXac ? 1 : 0;
    console.log(this.search);
    
    this.loaiHoSoService.getDanhSachLoaiHoSo(this.search)
      .subscribe(data => {
        console.log(data);
        
        if (data.isError) {
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

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LuongKySoService } from 'src/app/demo/service/ky-so/luong-ky-so/luong-ky-so.service';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
})
export class ThemMoiComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();

  cols: any[] = [];

  dataTables: any[] = [{
    stt: 1,
    nhomQuyenId: 0,
    chucNangId: 0,
  }];

  lstNhomQuyen: any[] = [];
  lstChucNang: any[] = [];

  public formThemMoi = this.formBuilder.group({
    id: [0, []],
    tenCauHinh: ['', [Validators.required]],
    moTa: ['', []],
    donViId: [0, []],
    createdBy: [0, []],
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private luongKySoService: LuongKySoService
  ) { }

  ngOnInit(): void {
    this.GetNhomQuyen();
    this.GetChuCNang();
    console.log(this.dataTables);
    
  }

  GetNhomQuyen() {
    this.luongKySoService.danhSachNhomQuyen().subscribe(data => {
      this.lstNhomQuyen = data;
    })
  }

  GetChuCNang() {
    this.lstChucNang.push({ 'text': 'Trình', 'value': 1 });
    this.lstChucNang.push({ 'text': 'Duyệt', 'value': 2 });
    this.lstChucNang.push({ 'text': 'Ký', 'value': 3 });
  }

  AddRow() {
    this.dataTables.push({ 'stt': this.dataTables.length + 1 });
  }

  DelRow(id: any) {
    this.dataTables.splice(this.dataTables.indexOf(id), id)
  }

  ThemMoi() {
    this.submitted = true;
    const itemData = this.formThemMoi.value;
    let luongKySo = {
      id: 0,
      tenCauHinh: itemData.tenCauHinh,
      donViId: this.authService.GetDonViLamViec(),
      moTa: itemData.moTa,
      createdBy: this.authService.GetmUserInfo().userId,
      lstLuongKySo: this.dataTables,
    }
    console.log(luongKySo);
    
    if (this.formThemMoi.valid) {
      this.submitted = true;
      this.luongKySoService.themMoi(luongKySo).subscribe(
        data => {
          let resData = data;
          if (resData.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resData.title });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: resData.title });
            this.TatPopup();
          }
        });
    }
  }

  TatPopup() {
    this.show = false;
    this.close.emit(this.show);
    this.formThemMoi.reset();
    this.submitted = false;
  }
}

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LuongKySoService } from 'src/app/demo/service/ky-so/luong-ky-so/luong-ky-so.service';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss']
})
export class CapNhatComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Input() id: string;

  lstNhomQuyen: any[] = [];
  lstChucNang: any[] = [];

  public formCapNhat = this.formBuilder.group({
    id: [0, []],
    tenCauHinh: ['', [Validators.required]],
    moTa: ['', []],
    donViId: [0, []],
    createdBy: [0, []],
  });
  submitted = false;

  cols: any[] = [];
  dataTables: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private luongKySoService: LuongKySoService
  ) { }

  ngOnInit(): void {
    this.GetNhomQuyen();
    this.GetChuCNang();
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

  TatPopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
    this.dataTables = [];
    this.formCapNhat.reset();
  }

  GetLuongSoKy() {
    this.luongKySoService.getLuongKySo(this.id).subscribe(
      data => {
        console.log(data.objLuongKySo);
        
        const lstLKS = data.objLuongKySo
        this.formCapNhat.patchValue({
          tenCauHinh: lstLKS.tenCauHinh,
          moTa: lstLKS.mota
        });        

        for (const item of data.lstcauHinhLuongKySoChiTiet) {
          this.dataTables.push({
            'stt': item.thuTu,
            'nhomQuyenId': item.nhomQuyenId,
            'chucNangId': item.chucNang
          });
        }
      }
    )
  }

  CapNhat() {
    this.submitted = true;
    const itemData = this.formCapNhat.value;
    let luongKySo = {
      id: this.id,
      tenCauHinh: itemData.tenCauHinh,
      donViId: this.authService.GetDonViLamViec(),
      moTa: itemData.moTa,
      lstLuongKySo: this.dataTables,
    }

    if (this.formCapNhat.valid) {
      this.submitted = true;
      this.luongKySoService.capNhat(luongKySo).subscribe(
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
}

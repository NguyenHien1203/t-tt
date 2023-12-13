import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LuongKySoService } from 'src/app/demo/service/ky-so/luong-ky-so/luong-ky-so.service';

@Component({
  selector: 'app-chi-tiet',
  templateUrl: './chi-tiet.component.html',
  styleUrls: ['./chi-tiet.component.scss']
})
export class ChiTietComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Input() id: string;

  cols: any[] = [];
  dataTables: any[] = [];

  tenCauHinh: any;
  moTa: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private luongKySoService: LuongKySoService
  ) { }

  ngOnInit(): void {

  }

  GetLuongSoKy() {
    this.luongKySoService.getLuongKySo(this.id).subscribe(
      data => {
        console.log(data);

        this.tenCauHinh = data.objLuongKySo.tenCauHinh;
        this.moTa = data.objLuongKySo.mota;

        // const lstLKS = data.objLuongKySo
        // this.formCapNhat.patchValue({
        //   tenCauHinh: lstLKS.tenCauHinh,
        //   moTa: lstLKS.mota
        // });        

        for (const a of data.lstcauHinhLuongKySoChiTiet) {
          for (const b of data.lstCHLKSCT) {
            if (a.Id == b.Id) {
              this.dataTables.push({
                'stt': a.thuTu,
                'chucNangId': a.chucNang,
                'tenNhomQUyen': b.ten
              });
            }
          }
        }
        console.log(this.dataTables);
      }
    )
  }

  TatPopup() {
    this.show = false;
    this.close.emit(this.show);
    this.dataTables = [];
  }
}

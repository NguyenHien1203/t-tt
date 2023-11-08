import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { XemThongBaoService } from 'src/app/demo/service/thong-tin-khac/xem-thong-bao.service';

@Component({
  selector: 'app-chi-tiet',
  templateUrl: './chi-tiet.component.html',
  styleUrls: ['./chi-tiet.component.scss']
})
export class ChiTietComponent {
  @Input() show: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  @Input() id: string = '1';

  constructor(private service: XemThongBaoService
    , private messageService: MessageService
    , private cd: ChangeDetectorRef
    , private fb : FormBuilder) { };

    public formCapNhat = this.fb.group({
      id: [0, []],
      tieuDe: ["", [Validators.required]],
      ngayBatDau: [, []],
      ngayKetThuc: [, []],
      donViId: [0, []],
      noiDung: ["", []],
      hienThi: [, []],
      created: [0, []],
      trangThai: [0, []],
      fileName: [0, []],
      filePath: [0, []],
    });

  public BindDataDialog(): void {
    this.service.getXemThongBaoId(this.id).subscribe(data => {
      data.ngayBatDau = new Date(data.ngayBatDau);
      data.ngayKetThuc = new Date(data.ngayKetThuc);
      this.formCapNhat.setValue(data);
    })
  }
  
  public Thoat(): void {
    this.show = false;
    this.tatPopup.emit(this.show);
    this.cd.detectChanges();
  }
}

import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { XemThongBaoService } from 'src/app/demo/service/thong-tin-khac/xem-thong-bao.service';
import { saveAs } from 'file-saver';

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
    , private fb: FormBuilder) { };

  xemThongBao: any;
  dataFile: any = {};

  public BindDataDialog(): void {
    this.service.getFile(this.id).subscribe(data => {
      this.dataFile = data;
      console.log(this.dataFile)
    })

    this.service.getXemThongBaoId(this.id).subscribe(data => {
      data.ngayBatDau = new Date(data.ngayBatDau);
      data.ngayKetThuc = new Date(data.ngayKetThuc);
      this.xemThongBao = {
        tieuDe: data.tieuDe,
        ngayBatDau: data.ngayBatDau,
        ngayKetThuc: data.ngayKetThuc,
        tenNguoiTao: data.tenNguoiTao,
        noiDung: data.noiDung,
        dataFileName : data.fileName
      };
    })

   
  }

  public downloadFile() {
    const blob = new Blob([this.dataFile], { type: 'application/octet-stream' });

    // Sử dụng saveAs để tải tệp xuống với tên cụ thể.
    saveAs(blob, this.xemThongBao.dataFileName);
  }

  public Thoat(): void {
    this.show = false;
    this.tatPopup.emit(this.show);
    this.cd.detectChanges();
  }
}

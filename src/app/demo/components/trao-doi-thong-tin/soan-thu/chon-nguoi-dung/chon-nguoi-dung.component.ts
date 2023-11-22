import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { SoanThuService } from 'src/app/demo/service/trao-doi-thong-tin/soan-thu.service';

@Component({
  selector: 'app-chon-nguoi-dung',
  templateUrl: './chon-nguoi-dung.component.html',
  styleUrls: ['./chon-nguoi-dung.component.scss']
})
export class ChonNguoiDungComponent {
  @Input() show: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  @Input() loai : number = 0;
  @Input() idSelected : string = "0";
  @Output() chonVanBan: EventEmitter<any> = new EventEmitter();

  constructor(
      private service: SoanThuService,
      private messageService: MessageService,
      private authService: AuthService
  ) {
      this.LoadDanhSach();
  }

  isCheckAll: boolean = false;
  lstSelectedNguoiDung: any[] = [];
  lstNguoiDung: any[] = [];
  submitted: boolean = false;

  public LoadDanhSach() {
    if(this.loai == 1)
    {
      this.service
      .getDanhSachUserThuocPhongBan(this.idSelected)
      .then((data) => {
          this.lstNguoiDung = data.map((dt) => {
              return { ...dt, checked: false };//gán checked để khởi tạo giá trị cho checkbox
          });
      });
    }
      
  }

  public ThoatChonNguoiDung(): void {
      this.show = false;
      this.tatPopup.emit(this.show);
  }

  public CheckAll(): void {
      this.isCheckAll = !this.isCheckAll;
      this.lstNguoiDung = this.lstNguoiDung.map((vb) => {
          return { ...vb, checked: this.isCheckAll };
      });
  }

  public ChonNguoiDung(): void {
      this.lstSelectedNguoiDung = this.lstNguoiDung
          .filter((vb) => vb.checked === true)
          .map((vb) => vb);
      this.chonVanBan.emit(this.lstSelectedNguoiDung);
      this.ThoatChonNguoiDung();
  }

  public CheckedItem(checked: boolean, idVanBan: string): void {
      checked = !checked;//checked những giá trị được đánh dấu ngoài danh sách
      this.lstNguoiDung = this.lstNguoiDung.map((vb) => {
          if (vb.id == idVanBan) return { ...vb, checked: checked };
          else {
              return { ...vb };
          }
      });
  }
}

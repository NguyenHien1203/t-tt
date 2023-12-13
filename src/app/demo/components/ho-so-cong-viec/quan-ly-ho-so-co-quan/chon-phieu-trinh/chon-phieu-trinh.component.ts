import { modelOptions } from 'src/app/models/option-model';
import { TimKiemPhieuTrinhDinhKem } from './../../../../../models/ho-so-cong-viec/quan-ly-ho-so-ca-nhan';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyHoSoCoQuanService } from 'src/app/demo/service/ho-so-cong-viec/quan-ly-ho-so-co-quan.service';

@Component({
  selector: 'app-chon-phieu-trinh',
  templateUrl: './chon-phieu-trinh.component.html',
  styleUrls: ['./chon-phieu-trinh.component.scss']
})
export class ChonPhieuTrinhComponent {
  @Input() show: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  @Output() chonPhieuTrinh: EventEmitter<any> = new EventEmitter();

  constructor(
      private service: QuanLyHoSoCoQuanService,
      private messageService: MessageService,
      private authService: AuthService
  ) {}

  lstPhieuTrinh: any[] = [];
  lstSelectedPhieuTrinh: any[] = [];
  lstTrangThai: modelOptions[] = [
      { text: 'Chờ duyệt', value: 0 },
      { text: 'Đã duyệt', value: 1 },
      { text: 'Đã ký', value: 2 },
      { text: 'Trả lại', value: 3 },
  ];
  submitted: boolean = false;
  idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
  userName = this.authService.GetmUserInfo()?.userName;
  userId = this.authService.GetmUserInfo()?.userId;
  userCap = this.authService.GetmUserInfo()?.cap;
  idPhongBan = this.authService.GetmUserInfo()?.phongBanId;
  timKiemDanhSach: TimKiemPhieuTrinhDinhKem = {
      keyWord: '',
      ngayTrinh: '1901-01-01',
      trangThai: 4,
      userId: Number(this.userId),
      donViId: Number(this.idDonViLamViec),
      phongBanId: Number(this.idPhongBan),
      timChinhXac: 0,
  };

  public LoadDanhSach() {
      this.service
          .getDanhSachChonPhieuTrinh(this.timKiemDanhSach)
          .then((data) => {
              if (data != null) {
                  this.lstPhieuTrinh = data.map((dt) => {
                      return { ...dt, checked: false }; //gán checked để khởi tạo giá trị cho checkbox
                  });
              }
          });
  }

  public BindDialogData() {
      this.LoadDanhSach();
  }

  public Thoat(): void {
      this.show = false;
      this.tatPopup.emit(this.show);
  }

  public ChonPhieuTrinh(): void {
      this.lstSelectedPhieuTrinh = this.lstPhieuTrinh
          .filter((vb) => vb.checked === true)
          .map((vb) => vb);
      this.chonPhieuTrinh.emit(this.lstSelectedPhieuTrinh);
      this.Thoat();
  }

  public CheckedItem(checked: boolean, idVanBan: string): void {
      checked = !checked; //checked những giá trị được đánh dấu ngoài danh sách
      this.lstPhieuTrinh = this.lstPhieuTrinh.map((vb) => {
          if (vb.id == idVanBan) return { ...vb, checked: checked };
          else {
              return { ...vb };
          }
      });
  }
}

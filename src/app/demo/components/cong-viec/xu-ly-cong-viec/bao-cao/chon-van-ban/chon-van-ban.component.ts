import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { XuLyCongViecService } from 'src/app/demo/service/cong-viec/xu-ly-cong-viec.service';
import { TimKiemChonVanBan } from 'src/app/models/cong-viec/xu-ly-cong-viec';

@Component({
    selector: 'app-chon-van-ban',
    templateUrl: './chon-van-ban.component.html',
    styleUrls: ['./chon-van-ban.component.scss'],
})
export class ChonVanBanComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Output() chonVanBan: EventEmitter<any> = new EventEmitter();

    constructor(
        private service: XuLyCongViecService,
        private messageService: MessageService,
        private authService: AuthService
    ) {
        this.LoadDanhSach();
    }

  
    isCheckAll: boolean = false;
    lstVanBanDaGui: any[] = [];
    lstDonViNhan: any[] = [];
    lstSelectedVanBan: any[] = [];
    submitted: boolean = false;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    userName = this.authService.GetmUserInfo()?.userName;
    userId = this.authService.GetmUserInfo()?.userId;
    idPhongBan = this.authService.GetmUserInfo()?.phongBanId;
    timKiemDanhSach: TimKiemChonVanBan = {
      soKyHieu: '',
      trichYeu: '',
      donViId: Number(this.idDonViLamViec),
  };
  
    public LoadDanhSach() {
        this.service
            .getDanhSachChonVanBan(this.timKiemDanhSach)
            .then((data) => {
                this.lstVanBanDaGui = data.map((dt) => {
                    return { ...dt, checked: false }; //gán checked để khởi tạo giá trị cho checkbox
                });
            });
    }

    public ThoatChonVanBan(): void {
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public CheckAll(): void {
        this.isCheckAll = !this.isCheckAll;
        this.lstVanBanDaGui = this.lstVanBanDaGui.map((vb) => {
            return { ...vb, checked: this.isCheckAll };
        });
    }

    public ChonVanBan(): void {
        this.lstSelectedVanBan = this.lstVanBanDaGui
            .filter((vb) => vb.checked === true)
            .map((vb) => vb);
        this.chonVanBan.emit(this.lstSelectedVanBan);
        this.ThoatChonVanBan();
    }

    public CheckedItem(checked: boolean, idVanBan: string): void {
        checked = !checked; //checked những giá trị được đánh dấu ngoài danh sách
        this.lstVanBanDaGui = this.lstVanBanDaGui.map((vb) => {
            if (vb.id == idVanBan) return { ...vb, checked: checked };
            else {
                return { ...vb };
            }
        });
    }
}
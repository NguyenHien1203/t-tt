import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyHoSoCaNhanService } from 'src/app/demo/service/ho-so-cong-viec/quan-ly-ho-so-ca-nhan.service';
import { TimKiemCongViecDinhKem } from 'src/app/models/ho-so-cong-viec/quan-ly-ho-so-ca-nhan';

@Component({
    selector: 'app-chon-cong-viec',
    templateUrl: './chon-cong-viec.component.html',
    styleUrls: ['./chon-cong-viec.component.scss'],
})
export class ChonCongViecComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Output() chonCongViec: EventEmitter<any> = new EventEmitter();

    constructor(
        private service: QuanLyHoSoCaNhanService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    lstCongViec: any[] = [];
    lstSelectedCongViec: any[] = [];
    submitted: boolean = false;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    userName = this.authService.GetmUserInfo()?.userName;
    userId = this.authService.GetmUserInfo()?.userId;
    userCap = this.authService.GetmUserInfo()?.cap;
    idPhongBan = this.authService.GetmUserInfo()?.phongBanId;
    timKiemDanhSach: TimKiemCongViecDinhKem = {
        keyWord: '',
        nam: 0,
        thang: 0,
        userId: Number(this.userId),
        trangThai: 6,
        donViId: Number(this.idDonViLamViec),
        phongBanId: Number(this.idPhongBan),
        vaiTro: 0,
    };

    public LoadDanhSach() {
        this.service
            .getDanhSachChonCongViec(this.timKiemDanhSach)
            .then((data) => {
                this.lstCongViec = data.map((dt) => {
                    return { ...dt, checked: false }; //gán checked để khởi tạo giá trị cho checkbox
                });
            });
    }

    public BindDialogData() {
        this.LoadDanhSach();
    }

    public Thoat(): void {
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public ChonCongViec(): void {
        this.lstSelectedCongViec = this.lstCongViec
            .filter((vb) => vb.checked === true)
            .map((vb) => vb);
        this.chonCongViec.emit(this.lstSelectedCongViec);
        this.Thoat();
    }

    public CheckedItem(checked: boolean, idVanBan: string): void {
        checked = !checked; //checked những giá trị được đánh dấu ngoài danh sách
        this.lstCongViec = this.lstCongViec.map((vb) => {
            if (vb.id == idVanBan) return { ...vb, checked: checked };
            else {
                return { ...vb };
            }
        });
    }
}

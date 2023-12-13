import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyHoSoCaNhanService } from 'src/app/demo/service/ho-so-cong-viec/quan-ly-ho-so-ca-nhan.service';
import { TimKiemCongViecDinhKem } from 'src/app/models/ho-so-cong-viec/quan-ly-ho-so-ca-nhan';
import { modelOptions } from 'src/app/models/option-model';

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
    ) {
        this.lstNam.push({ text: 'Chọn năm', value: 0 });
        this.lstThang.push({ text: 'Chọn tháng', value: 0 });
        const currentYear = new Date().getFullYear() + 1;
        for (let i = currentYear + 1; i >= currentYear - 5; i--) {
            this.lstNam.push({ text: 'Năm ' + i, value: i });
        }

        for (let i = 1; i <= 12; i++) {
            this.lstThang.push({ text: 'Tháng ' + i, value: i });
        }
    }

    lstVaiTro: modelOptions[] = [
        { text: 'Tất cả', value: 0 },
        { text: 'Chỉ đạo', value: 1 },
        { text: 'Chủ trì', value: 2 },
        { text: 'Phối hợp', value: 3 },
        { text: 'Thông báo', value: 4 },
    ];
    lstTrangThai: modelOptions[] = [
        { text: 'Tất cả', value: 0 },
        { text: 'Đang xử lý', value: 1 },
        { text: 'Đến hạn', value: 2 },
        { text: 'Quá hạn', value: 3 },
        { text: 'Xử lý xong', value: 4 },
        { text: 'Dừng xử lý', value: 7 },
    ];
    lstCongViec: any[] = [];
    lstSelectedCongViec: any[] = [];
    submitted: boolean = false;
    lstNam: modelOptions[] = [];
    lstThang: modelOptions[] = [];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    userName = this.authService.GetmUserInfo()?.userName;
    userId = this.authService.GetmUserInfo()?.userId;
    userCap = this.authService.GetmUserInfo()?.cap;
    idPhongBan = this.authService.GetmUserInfo()?.phongBanId;
    idNhomQuyen = this.authService.GetmUserInfo()?.nhomQuyenId;
    timKiemDanhSach: TimKiemCongViecDinhKem = {
        keyWord: '',
        userId: Number(this.userId),
        trangThai: 0,
        donViId: Number(this.idDonViLamViec),
        phongBanId: Number(this.idPhongBan),
        vaiTro: 0,
        nhomQuyenId: Number(this.idNhomQuyen),
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

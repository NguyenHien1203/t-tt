import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyHoSoCaNhanService } from 'src/app/demo/service/ho-so-cong-viec/quan-ly-ho-so-ca-nhan.service';
import { modelOptions } from 'src/app/models/option-model';

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
        private service: QuanLyHoSoCaNhanService,
        private messageService: MessageService,
        private authService: AuthService
    ) {
        this.LoadDanhSach();
        this.LoadDanhMuc();
    }

    lstVanBan: any[] = [];
    lstNam: modelOptions[] = [];
    lstThang: modelOptions[] = [];
    lstLoaiDiDen: modelOptions[] = [
        { text: 'Văn bản đến', value: 0 },
        { text: 'Văn bản đi', value: 1 },
    ];
    lstSelectedVanBan: any[] = [];
    submitted: boolean = false;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    userName = this.authService.GetmUserInfo()?.userName;
    userId = this.authService.GetmUserInfo()?.userId;
    userCap = this.authService.GetmUserInfo()?.cap;
    idPhongBan = this.authService.GetmUserInfo()?.phongBanId;
    timKiemDanhSach: any = {
        keyWord: '',
        nam: 0,
        thang: 0,
        loaiDiDen: 0,
        donViId: Number(this.idDonViLamViec),
    };

    public LoadDanhSach() {
        this.service
            .getDanhSachChonVanBan(this.timKiemDanhSach)
            .then((data) => {
                this.lstVanBan = data.map((dt) => {
                    return { ...dt, checked: false }; //gán checked để khởi tạo giá trị cho checkbox
                });
            });
    }

    public LoadDanhMuc() {
        const year = new Date().getFullYear() + 1;
        for (let i = year; i >= year - 5; i--) {
            this.lstNam.push({ text: 'Năm ' + i, value: i });
        }

        for (let i = 1; i <= 12; i++) {
            this.lstThang.push({ text: 'Tháng ' + i, value: i });
        }
    }

    public Thoat(): void {
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public ChonVanBan(): void {
        this.lstSelectedVanBan = this.lstVanBan
            .filter((vb) => vb.checked === true)
            .map((vb) => vb);
        this.chonVanBan.emit(this.lstSelectedVanBan);
        this.Thoat();
    }

    public CheckedItem(checked: boolean, idVanBan: string): void {
        checked = !checked; //checked những giá trị được đánh dấu ngoài danh sách
        this.lstVanBan = this.lstVanBan.map((vb) => {
            if (vb.id == idVanBan) return { ...vb, checked: checked };
            else {
                return { ...vb };
            }
        });
    }
}

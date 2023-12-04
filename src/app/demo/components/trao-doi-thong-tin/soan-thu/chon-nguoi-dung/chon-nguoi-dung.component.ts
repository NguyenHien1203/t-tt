import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { SoanThuService } from 'src/app/demo/service/trao-doi-thong-tin/soan-thu.service';

@Component({
    selector: 'app-chon-nguoi-dung',
    templateUrl: './chon-nguoi-dung.component.html',
    styleUrls: ['./chon-nguoi-dung.component.scss'],
})
export class ChonNguoiDungComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() lstNguoiDung: any[] = [];
    @Output() chonNguoiDung: EventEmitter<any> = new EventEmitter();

    constructor(
        private service: SoanThuService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    isCheckAll: boolean = false;
    lstSelectedNguoiDung: any[] = [];
    submitted: boolean = false;

    public BindDialogData() {
        this.lstNguoiDung = this.lstNguoiDung.map((dt) => {
            return { ...dt, checked: false }; //gán checked để khởi tạo giá trị cho checkbox
        });
    }

    public ThoatChonNguoiDung(): void {
        this.isCheckAll = false;
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
            .map((vb) => vb.userName);
        this.chonNguoiDung.emit(this.lstSelectedNguoiDung);
        this.ThoatChonNguoiDung();
    }

    public CheckedItem(checked: boolean, idVanBan: string): void {
        checked = !checked; //checked những giá trị được đánh dấu ngoài danh sách
        this.lstNguoiDung = this.lstNguoiDung.map((vb) => {
            if (vb.id == idVanBan) return { ...vb, checked: checked };
            else {
                return { ...vb };
            }
        });
    }
}

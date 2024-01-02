import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { ChiTietNhomTaiKhoanService } from 'src/app/demo/service/he-thong/chi-tiet-nhom-tai-khoan.service';

@Component({
    selector: 'app-chi-tiet-nhom-tai-khoan',
    templateUrl: './chi-tiet-nhom-tai-khoan.component.html',
    styleUrls: ['./chi-tiet-nhom-tai-khoan.component.scss'],
    providers: [MessageService],
})
export class ChiTietNhomTaiKhoanComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() id: string = '1';

    constructor(
        private service: ChiTietNhomTaiKhoanService,
        private messageService: MessageService,
        private cd: ChangeDetectorRef,
        private authService: AuthService,
        private router: Router
    ) {}

    lstCaNhanTrongNhom: any[] = [];
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    public async BindDialogData() {
        this.lstCaNhanTrongNhom =
            await this.service.getDanhSachNguoiDungTrongNhom(this.id);
    }

    public ThoatChiTiet(): void {
        this.show = false;
        this.tatPopup.emit(this.show);
        this.cd.detectChanges();
    }
}

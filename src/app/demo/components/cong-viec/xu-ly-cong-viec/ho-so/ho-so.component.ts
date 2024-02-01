import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { XuLyCongViecService } from 'src/app/demo/service/cong-viec/xu-ly-cong-viec.service';

@Component({
    selector: 'app-ho-so',
    templateUrl: './ho-so.component.html',
    styleUrls: ['./ho-so.component.scss'],
})
export class HoSoComponent {
    @Input() id: string = '1';
    @Input() cap: string = '1';
    @Input() loai: string = '1';
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private service: XuLyCongViecService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    loading: boolean = true;
    submitted: boolean = false;
    lstHoSoCongViec: any[] = [];
    hoSoCongViecOptions: any[] = [
        { text: 'Hồ sơ công việc cá nhân', value: 1 },
        { text: 'Hồ sơ công việc cơ quan', value: 2 },
    ];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';

    ngOnInit() {
        this.loading = false;
    }

    public async BindDialogData() {
        try {
            const timKiemDanhSach = {};
            this.lstHoSoCongViec = await this.service.getDanhSachHoSoCongViec(
                timKiemDanhSach
            );
        } catch (error) {
            console.log(error);
            
        }
    }

    public ChangeHoSoCongViec(event) {}

    public Thoat(): void {
        this.lstHoSoCongViec = [];
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public ChonHoSo() {
        this.submitted = true;
    }
}

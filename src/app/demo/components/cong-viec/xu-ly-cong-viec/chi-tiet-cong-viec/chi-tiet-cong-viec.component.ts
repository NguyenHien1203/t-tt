import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { XuLyCongViecService } from 'src/app/demo/service/cong-viec/xu-ly-cong-viec.service';
import { ChiTietCongViec } from 'src/app/models/cong-viec/xu-ly-cong-viec';

@Component({
    selector: 'app-chi-tiet-cong-viec',
    templateUrl: './chi-tiet-cong-viec.component.html',
    styleUrls: ['./chi-tiet-cong-viec.component.scss']
})
export class ChiTietCongViecComponent {
    @Input() id: string = '1';
    @Input() cap: string = '1';
    @Input() loai: string = '1';
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();

    TenTaiKhoan: string = this.authService.GetmUserInfo().userName;

    constructor(
        private service: XuLyCongViecService,
        private messageService: MessageService,
        private authService: AuthService
    ) { }

    chiTietCongViecs: ChiTietCongViec = {
        soKiHieu: '',
        trichYeu: '',
        noiDungCongViec: '',
        nguoiXuLy: '',
        tuNgay: new Date(),
        denNgay: new Date(),
        thoiGianDuKien: '',
        chiDao: '',
        chuTri: '',
        lstDongChiPhoiHop: [],
        lstDongChiThongBao: [],
        lstFileDinhKemVanBan: [],
        lstFileDinhKemCongViec: [],
        lstCaNhanXuLyCongViec: [],
    };

    loading: boolean = true;
    submitted: boolean = false;
    lstHoSoCongViec: any[] = [];
    lstTrangThai: any[] = [
        { text: 'Đang xử lý', value: 2 },
        { text: 'Xử lý xong', value: 3 },
    ];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';

    ngOnInit() {
        this.loading = false;
    }

    public async BindDialogData() {
        try {
            const data = await this.service.getDataViewChiTiet(
                this.id,
                this.cap,
                this.loai
            );

            if (data != null) {
                this.chiTietCongViecs = data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    public ChangeHoSoCongViec(event) { }

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

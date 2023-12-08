import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { XuLyCongViecService } from 'src/app/demo/service/cong-viec/xu-ly-cong-viec.service';
import {
    ThongTinNguoiXuLy,
    XuLyCongViec,
} from 'src/app/models/cong-viec/xu-ly-cong-viec';

@Component({
    selector: 'app-bao-cao',
    templateUrl: './bao-cao.component.html',
    styleUrls: ['./bao-cao.component.scss'],
})
export class BaoCaoComponent {
    @Input() id: string = '1';
    @Input() cap: string = '1';
    @Input() loai: string = '1';
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private service: XuLyCongViecService,
        private messageService: MessageService,
        private authService: AuthService
    ) { }

    hienThiChonVanBan: boolean = false;
    baoCaoTienDos: XuLyCongViec = {
        soKiHieu: '',
        trichYeu: '',
        noiDungCongViec: '',
        nguoiXuLy: '',
        tuNgay: new Date(),
        denNgay: new Date(),
        thoiHanHoanThanh: new Date(),
        trangThaiDeXuat: '',
        chiDao: '',
        chuTri: '',
        lstDongChiPhoiHop: [],
        lstDongChiThongBao: [],
        countDongChiThongBao: 0,
        countDongChiPhoiHop: 0,
        ngayXuLy: new Date(),
        noiDungXuLy: '',
        trangThaiXuLy: '',
        fileDinhKem: '',
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

    public ThoatChonVanBan(itemHt: any, loai: string): void {
        if (loai === 'C') this.hienThiChonVanBan = false;
    }

    public ChonVanBan()
    {
        this.hienThiChonVanBan = true;
    }

    public async BindDialogData() {
        try {
            const data = await this.service.getDataBaoCaoTienDo(
                this.id,
                this.cap,
                this.loai
            );
            this.baoCaoTienDos = data;
            if (this.baoCaoTienDos.ngayXuLy === null)
                this.baoCaoTienDos.ngayXuLy = new Date();
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

    public UpdateNgayHt() {
        const formattedDate = this.baoCaoTienDos.thoiHanHoanThanh.toLocaleDateString('en-GB');

        this.service.UpdateNgayHt(this.id, formattedDate).subscribe(data => {
            if (data.isError) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
            } else {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
                setTimeout(() => {
                    this.Thoat();
                }, 1000);
            }
        }, (error) => {
            console.log('Error', error);
        })
    }
}

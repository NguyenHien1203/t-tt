import { saveAs } from 'file-saver';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { KyPhieuTrinhService } from 'src/app/demo/service/ho-so-cong-viec/ky-phieu-trinh.service';
import { TimKiemPhieuTrinh } from 'src/app/models/ho-so-cong-viec/them-moi-phieu-trinh';
import { modelOptions } from 'src/app/models/option-model';

@Component({
    selector: 'app-ky-phieu-trinh',
    templateUrl: './ky-phieu-trinh.component.html',
    styleUrls: ['./ky-phieu-trinh.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class KyPhieuTrinhComponent {
    constructor(
        private messageService: MessageService,
        private service: KyPhieuTrinhService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}

    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    timChinhXac: boolean = false;
    public id: string = '1';
    loading: boolean = false;
    hienThiXuLy: boolean = false;
    hienThiChiTiet: boolean = false;
    lstTrangThai: modelOptions[] = [
        { text: 'Chọn trạng thái', value: 4 },
        { text: 'Chờ duyệt', value: 0 },
        { text: 'Đã duyệt', value: 1 },
        { text: 'Đã ký', value: 2 },
        { text: 'Trả lại', value: 3 },
    ];
    lstNguoiTrinh: modelOptions[] = [];
    lstPhieuTrinh: any[] = [];
    items = [{ label: 'Hồ sơ công việc' }, { label: 'Ký phiếu trình' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemPhieuTrinh = {
        keyWord: '',
        ngayTrinh: '1901-01-01',
        lanhDaoDuyet: 0,
        lanhDaoKy: Number(this.idUser),
        trangThai: 1,
        donViId: Number(this.idDonViLamViec),
        phongBanId: Number(this.idPhongBan),
        nguoiTao: 0,
        timChinhXac: 0,
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.loading = false;
        this.service.getDanhSachNguoiTrinh(this.idDonViLamViec).then((data) => {
            this.lstNguoiTrinh = data;
        });
        this.LoadDanhSach();
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachPhieuTrinhChoXuLy(this.timKiemDanhSach)
            .then((data) => {
                this.lstPhieuTrinh = data;
            });
    }

    public XuLy(id: string) {
        this.id = id;
        this.hienThiXuLy = true;
    }
    
    public ChiTiet(id: string) {
        this.id = id;
        this.hienThiChiTiet = true;
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai == 'X') this.hienThiXuLy = false;
        if (loai == 'CT') this.hienThiChiTiet = false;
        this.LoadDanhSach();
    }

    public CheckedHt() {
        this.timChinhXac = !this.timChinhXac;
    }

    
}

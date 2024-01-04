import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DanhSachBanGiaoCongViecService } from 'src/app/demo/service/cong-viec/danh-sach-ban-giao-cong-viec/danh-sach-ban-giao-cong-viec.service';
import { TimKiemHSCV } from 'src/app/models/cong-viec/danh-sach-ban-giao-cong-viec';

@Component({
    selector: 'app-ho-so-cong-viec-ca-nhan',
    templateUrl: './ho-so-cong-viec-ca-nhan.component.html',
    styleUrls: ['./ho-so-cong-viec-ca-nhan.component.scss'],
})
export class HoSoCongViecCaNhanComponent {
    constructor(
        private route: ActivatedRoute,
        private Service: DanhSachBanGiaoCongViecService,
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private authService: AuthService,
    ) {}
    //Lấy dữ liệu đầu vào
    @Input() id: string = '';
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    submitted = false;
    loading: boolean = false;

    dsSelectHSCV: any = [];
    public formHSCV = this.formBuilder.group({});

    luaChonNam: SelectItem[] = []; // Lựa chọn năm
    luaChonThang: SelectItem[] = []; // Lựa chọn tháng
    userId: string = this.authService.GetmUserInfo().userId ?? '0';
    donViId: string = this.authService.GetmUserInfo().donViId ?? '0';
    phongBanLamViecId = this.authService.GetmUserInfo().phongBanLamViecId ?? '0';    

    timKiem: TimKiemHSCV = {
        keyWord: '',
        nam: 0,
        thang: 0,
        maHS: '',
        tieude: '',
        nguoiLap: Number(this.userId),
        donVi: Number(this.donViId),
        loaihs: 0,
        phongban: Number(this.phongBanLamViecId),
        trangthai: 0,
        mahs_pb: '',
        linhvucid: 0,
        timChinhXacSearch: 0,
    };

    ngOnInit() {
        this.GetNam();
        this.GetThang();
        this.TimKiem(this.timKiem);
        this.loading = false;
    }

    // Lấy dữ liệu số năm cho phép lựa chọn
    GetNam() {
        this.luaChonNam.push({ label: '--Chọn năm--', value: 0 });
        const soNam = new Date().getFullYear();
        for (let i = soNam + 1; i >= soNam - 5; i--) {
            this.luaChonNam.push({ label: i.toString(), value: i });
        }
    }

    //Lấy dữ liệu số tháng lựa chọn
    GetThang() {
        this.luaChonThang.push({ label: '--Chọn tháng--', value: 0 });
        for (let i = 1; i <= 12; i++) {
            this.luaChonThang.push({
                label: 'Tháng ' + i.toString(),
                value: i,
            });
        }
    }

    // Tìm kiếm danh sách
    public TimKiem(timkiems: TimKiemHSCV) {
        this.Service.getLstSelectHSCV(timkiems).then((data) => {
            this.dsSelectHSCV = data;
        });
    }

    //Hàm đóng pop up
    public Thoat(): void {
        this.show = false;
        this.submitted = false;
        this.tatPopup.emit(this.show);
    }
}

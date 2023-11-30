import { Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { CauHoiThuongGapService } from 'src/app/demo/service/thong-tin-khac/cau-hoi-thuong-gap.service';
import { QuanLyCauHoiThươngGapService } from 'src/app/demo/service/thong-tin-khac/quan-ly-cau-hoi-thương-gap.service';
import { TimKiemCauHoiThuongGap } from 'src/app/models/thong-tin-khac/quan-ly-cau-hoi-thuong-gap';

@Component({
  selector: 'app-cau-hoi-thuong-gap',
  templateUrl: './cau-hoi-thuong-gap.component.html',
  styleUrls: ['./cau-hoi-thuong-gap.component.scss'],
  providers : [MessageService]
})
export class CauHoiThuongGapComponent {
  constructor(
    private service: CauHoiThuongGapService,
    private quanLyCauHoiService: QuanLyCauHoiThươngGapService,
    private messageService: MessageService,
    private authService: AuthService
) {}

public hienThiChiTiet: boolean = false;
public id: string = '1';
public idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
public loading: boolean = true;
public home = { icon: 'pi pi-home', routerLink: '/' };
public items = [
    { label: 'Thông tin khác' },
    { label: 'Quản lý câu hỏi thường gặp' },
];
public timChinhXac: boolean = false;
public timKiemDanhSach: TimKiemCauHoiThuongGap = {
    keyWord: '',
    chuyenMucId: 0,
    trangThai: 3,
    donViId: Number(this.idDonViLamViec),
    timChinhXac: 0,
};
lstChuyenMuc: any[] = [];
lstTrangThai: SelectItem[] = [
    { label: 'Chọn trạng thái', value: 3 },
    { label: 'Chưa trả lời', value: 0 },
    { label: 'Đã trả lời', value: 1 },
];
lstCauHoiThuongGap: any[] = [];

ngOnInit(): void {
    this.loading = false;
    this.LoadDanhSach();
    this.LoadChuyenMuc();
}

public ChiTiet(id: string): void {
    this.id = id;
    this.hienThiChiTiet = true;
}

public Thoat(itemHt: any, loai: string): void {
    if (loai === 'CT') this.hienThiChiTiet = false;
    this.LoadDanhSach();
}

public LoadChuyenMuc() {
    this.quanLyCauHoiService.getChuyenMucCauHoi(this.idDonViLamViec).then((data) => {
        this.lstChuyenMuc = data;
    });
}

public LoadDanhSach(): void {
    this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
    this.service
        .getDanhSachQuanLyCauHoiThuongGap(this.timKiemDanhSach)
        .then((data) => {
            this.lstCauHoiThuongGap = data;
        });
}

public CheckedHt(): void {
    this.timChinhXac = !this.timChinhXac;
}
}

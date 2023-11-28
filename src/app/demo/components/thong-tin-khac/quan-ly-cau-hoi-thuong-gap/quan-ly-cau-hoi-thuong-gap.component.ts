import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyCauHoiThươngGapService } from 'src/app/demo/service/thong-tin-khac/quan-ly-cau-hoi-thương-gap.service';
import { TimKiemCauHoiThuongGap } from 'src/app/models/thong-tin-khac/quan-ly-cau-hoi-thuong-gap';

@Component({
    selector: 'app-quan-ly-cau-hoi-thuong-gap',
    templateUrl: './quan-ly-cau-hoi-thuong-gap.component.html',
    styleUrls: ['./quan-ly-cau-hoi-thuong-gap.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class QuanLyCauHoiThuongGapComponent {
    constructor(
        private service: QuanLyCauHoiThươngGapService,
        private messageService: MessageService,
        private confirmService: ConfirmationService,
        private authService: AuthService
    ) {}

    public hienThiThemMoi: boolean = false;
    public hienThiCapNhat: boolean = false;
    public hienThiTraLoi: boolean = false;
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

    public ThemMoi(): void {
        this.hienThiThemMoi = true;
    }

    public CapNhat(id: string): void {
        this.id = id;
        this.hienThiCapNhat = true;
    }

    public TraLoi(id: string): void {
        this.id = id;
        this.hienThiTraLoi = true;
    }

    public Xoa(id: string) {
        this.confirmService.confirm({
            message: 'Bạn có chắc chắn xác nhận xóa câu hỏi thường gặp?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service.xoaCauHoiThuongGap(id).subscribe(
                    (data) => {
                        if (data.isError) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: data.title,
                            });
                        } else {
                            this.LoadDanhSach();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: data.title,
                            });
                        }
                    },
                    (error) => {
                        console.log('Error', error);
                    }
                );
            },
            reject: () => {},
        });
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'T') this.hienThiThemMoi = false;
        if (loai === 'C') this.hienThiCapNhat = false;
        if (loai === 'TL') this.hienThiTraLoi = false;
        if (loai === 'CT') this.hienThiChiTiet = false;
        this.LoadDanhSach();
    }

    public LoadChuyenMuc() {
        this.service.getChuyenMucCauHoi(this.idDonViLamViec).then((data) => {
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

    public ChiTiet(id: string)
    {
        this.id = id;
        this.hienThiChiTiet = true;
    }

    public CheckedHt(): void {
        this.timChinhXac = !this.timChinhXac;
    }
}

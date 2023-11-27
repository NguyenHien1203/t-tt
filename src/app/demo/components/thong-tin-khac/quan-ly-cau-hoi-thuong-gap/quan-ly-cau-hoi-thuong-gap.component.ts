import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
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
        private confirmService: ConfirmationService
    ) {}

    public hienThiThemMoi: boolean = false;
    public hienThiCapNhat: boolean = false;
    public hienThiTraLoi: boolean = false;
    public id: string = '1';
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
        trangThai: 0,
        donViId: 0,
        timChinhXac: 0,
    };
    lstChuyenMuc: any[] = [];
    lstTrangThai: SelectItem[] = [
        { label: 'Chọn trạng thái', value: 7 },
        { label: 'Chưa trả lời', value: 8 },
        { label: 'Đã trả lời', value: 9 },
    ];
    quanLyThongBaos: any[] = [];

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
    }

    public ThemMoi(): void {
        this.hienThiThemMoi = true;
    }

    public CapNhat(id: string): void {
        this.hienThiCapNhat = true;
        this.id = id;
    }

    public TraLoi(id: string): void {
        this.hienThiTraLoi = true;
        this.id = id;
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
        this.LoadDanhSach();
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachQuanLyCauHoiThuongGap(this.timKiemDanhSach)
            .then((data) => {
                this.quanLyThongBaos = data;
            });
    }

    public CheckedHt(): void {
        this.timChinhXac = !this.timChinhXac;
    }
}

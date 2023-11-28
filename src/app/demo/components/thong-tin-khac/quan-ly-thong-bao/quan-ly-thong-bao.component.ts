import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { QuanLyThongBaoService } from 'src/app/demo/service/thong-tin-khac/quan-ly-thong-bao.service';
import { TimKiemDanhSach } from 'src/app/models/thong-tin-khac/quan-ly-thong-bao';

@Component({
    selector: 'app-quan-ly-thong-bao',
    templateUrl: './quan-ly-thong-bao.component.html',
    styleUrls: ['./quan-ly-thong-bao.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class QuanLyThongBaoComponent implements OnInit {
    constructor(
        private service: QuanLyThongBaoService,
        private messageService: MessageService,
        private confirmService: ConfirmationService
    ) {}

    public hienThiThemMoi: boolean = false;
    public hienThiCapNhat: boolean = false;
    public hienThiGuiThongBao: boolean = false;
    public id: string = '1';
    public loading: boolean = true;
    public home = { icon: 'pi pi-home', routerLink: '/' };
    public items = [
        { label: 'Thông tin khác' },
        { label: 'Quản lý thông báo' },
    ];
    public timChinhXac: boolean = false;
    public timKiemDanhSach: TimKiemDanhSach = {
        keyWord: '',
        tuNgay: '1901-01-01',
        denNgay: '9999-01-01',
        donViId: 0,
        hienThi: 3,
        isHieuLuc: 3,
        timChinhXac: 0,
    };
    lstThongBao: SelectItem[] = [
        { label: 'Chọn trạng thái', value: 3 },
        { label: 'Còn hiệu lực', value: 2 },
        { label: 'Không còn hiệu lực', value: 1 },
    ];
    lstHienThi: SelectItem[] = [
        { label: 'Chọn hình thức', value: 3 },
        { label: 'Hiển thị', value: 1 },
        { label: 'Không hiển thị', value: 0 },
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

    public GuiThongBao(id: string): void {
        this.hienThiGuiThongBao = true;
        this.id = id;
    }

    public Xoa(id: string) {
        this.confirmService.confirm({
            message: 'Bạn có chắc chắn xác nhận xóa thông báo?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service.xoaQuanLyThongBao(id).subscribe(
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
        if (loai === 'G') this.hienThiGuiThongBao = false;
        this.LoadDanhSach();
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachQuanLyThongBao(this.timKiemDanhSach)
            .then((data) => {
                this.quanLyThongBaos = data;
            });
    }

    public CheckedHt(): void {
        this.timChinhXac = !this.timChinhXac;
    }
}

import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { XemThongBaoService } from 'src/app/demo/service/thong-tin-khac/xem-thong-bao.service';
import {
    TimKiemDanhSach,
    XemThongBao,
} from 'src/app/models/thong-tin-khac/xem-thong-bao';

@Component({
    selector: 'app-xem-thong-bao',
    templateUrl: './xem-thong-bao.component.html',
    styleUrls: ['./xem-thong-bao.component.scss'],
    providers: [MessageService],
})
export class XemThongBaoComponent implements OnInit {
    constructor(
        private service: XemThongBaoService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}
    
    public hienThiChiTiet: boolean = false;
    public id: string = '1';
    public loading: boolean = true;
    public home = { icon: 'pi pi-home', routerLink: '/' };
    public items = [{ label: 'Thông tin khác' }, { label: 'Xem thông báo' }];
    public timChinhXac: boolean = false;
    userId = this.authService.GetmUserInfo()?.userId;
    public timKiemDanhSach: TimKiemDanhSach = {
        keyWord: '',
        tuNgay: '1901-01-01',
        denNgay: '9999-01-01',
        xemId: this.userId ?? '0',
        timChinhXac: 0,
    };
    xemThongBaos: any[] = [];

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
    }

    public ChiTiet(id: string): void {
        this.hienThiChiTiet = true;
        this.id = id;
    }

    public Thoat(itemHt: any, loai: string): void {
        this.hienThiChiTiet = false;
        this.LoadDanhSach();
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachXemThongBao(this.timKiemDanhSach)
            .then((data) => {
                this.xemThongBaos = data;
            });
    }

    public CheckedHt(): void {
        this.timChinhXac = !this.timChinhXac;
    }
}

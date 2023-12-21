import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { BieuDoThongKeTheoLoaiNhiemVuService } from 'src/app/demo/service/thong-ke-nhiem-vu/bieu-do-thong-ke-theo-loai-nhiem-vu.service';
import { BieuDoThongKeTheoLoaiNhiemVu } from 'src/app/models/thong-ke-nhiem-vu/bieu-do-thong-ke-theo-loai-nhiem-vu';

@Component({
    selector: 'app-bieu-do-thong-ke-theo-loai-nhiem-vu',
    templateUrl: './bieu-do-thong-ke-theo-loai-nhiem-vu.component.html',
    styleUrls: ['./bieu-do-thong-ke-theo-loai-nhiem-vu.component.scss'],
    providers: [MessageService],
})
export class BieuDoThongKeTheoLoaiNhiemVuComponent {
    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private service: BieuDoThongKeTheoLoaiNhiemVuService,
        private cd: ChangeDetectorRef
    ) {}
    chartData: any;
    options: any;
    idDonVi: string = this.authService.GetmUserInfo()?.donViId ?? '0';
    items: any[] = [
        { label: 'Thống kê nhiệm vụ' },
        { label: 'Thống kê theo bảng' },
    ];
    home = { icon: 'pi pi-home', routerLink: '/' };
    objDataBieuDo: BieuDoThongKeTheoLoaiNhiemVu = null;
    id: string = '1';

    lstLoaiNhiemVu: any[] = [];
    lstDonVi: any[] = [];
    stThongKeLinhVuc: any[] = [];

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    async ngOnInit() {
        await this.LoadDanhSach();
    }

    // Tìm kiếm danh sách
    public async LoadDanhSach() {
        this.objDataBieuDo = await this.service.getDaTaBieuDo(this.idDonVi);
        console.log(this.objDataBieuDo);
    }

    getCountNhiemVu(nhiemVuId: number, donViId: number, loai: number): number {
        if (loai === 1) {
            const objData = this.objDataBieuDo?.lstThongKeLoaiNhiemVu.find(
                (s) => s.donViId === donViId
            );
            const countNhiemVu = objData?.data_NhiemVu.find(
                (s) => s.nhiemVuId === nhiemVuId
            );
            return countNhiemVu?.data_ThongKe || 0;
        }

        if (loai === 2) {
            const objData = this.objDataBieuDo?.lstThongKeLinhVuc.find(
                (s) => s.donViId === donViId
            );
            const countNhiemVu = objData?.data_NhiemVu.find(
                (s) => s.nhiemVuId === nhiemVuId
            );
            return countNhiemVu?.data_ThongKe || 0;
        }
        return 0;
    }

    getListThongKePhongBan(donViId: number): any[] {
        const lstThongKe = this.objDataBieuDo?.lstThongKeLoaiNhiemVu.filter(
            (s) => s.donViId === donViId
        );
        console.log();

        return lstThongKe;
    }

    getListThongKeLinhVuc(donViId: number): any[] {
        const lstThongKe = this.objDataBieuDo?.lstThongKeLinhVuc.filter(
            (s) => s.donViId === donViId
        );
        return lstThongKe;
    }

    getDanhSachTenLoaiNhiemVu(): string[] {
        return this.objDataBieuDo?.lstLoaiNhiemVu.map((data) => data.text);
    }
}

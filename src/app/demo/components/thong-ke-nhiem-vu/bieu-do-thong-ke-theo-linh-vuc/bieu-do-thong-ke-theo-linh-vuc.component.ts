import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { BieuDoThongKeTheoLinhVucService } from 'src/app/demo/service/thong-ke-nhiem-vu/bieu-do-thong-ke-theo-linh-vuc.service';
import { BieuDoThongKeTheoLinhVuc } from 'src/app/models/thong-ke-nhiem-vu/bieu-do-thong-ke-theo-linh-vuc';

@Component({
    selector: 'app-bieu-do-thong-ke-theo-linh-vuc',
    templateUrl: './bieu-do-thong-ke-theo-linh-vuc.component.html',
    styleUrls: ['./bieu-do-thong-ke-theo-linh-vuc.component.scss'],
    providers: [MessageService],
})
export class BieuDoThongKeTheoLinhVucComponent {
    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private service: BieuDoThongKeTheoLinhVucService,
        private cd: ChangeDetectorRef
    ) {}
    arrayLabel = [
        'Hoàn thành đúng hạn',
        'Hoàn thành quá hạn',
        'Đang thực hiện trong hạn',
        'Đang thực hiện quá hạn',
    ];
    chartData: any;
    options: any;
    idDonVi: string = this.authService.GetmUserInfo()?.donViId ?? '0';
    items: any[] = [
        { label: 'Thống kê nhiệm vụ' },
        { label: 'Thống kê theo lĩnh vực' },
    ];
    home = { icon: 'pi pi-home', routerLink: '/' };
    objDataBieuDo: BieuDoThongKeTheoLinhVuc = null;
    id: string = '1';

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    async ngOnInit() {
        await this.LoadDanhSach();
    }

    // Tìm kiếm danh sách
    public async LoadDanhSach(): Promise<void> {
        try {
            this.objDataBieuDo = await this.service.getDaTaBieuDo(this.idDonVi);
        } catch (error) {
            console.log(error);
        }
    }

    getCustomStyle(status: string): any {
        // Đặt mã màu cho từng trạng thái
        switch (status) {
            case 'Hoàn thành đúng hạn':
                return { color: '#02a0ff' };
            case 'Hoàn thành quá hạn':
                return { color: '#f7be31' };
            case 'Đang thực hiện trong hạn':
                return { color: '#23bf08' };
            case 'Đang thực hiện quá hạn':
                return { color: '#e15360' };
            default:
                return {};
        }
    }

    getValueByStatus(item: any, status: string): number {
        // Lấy giá trị tương ứng với mỗi trạng thái
        switch (status) {
            case 'Hoàn thành đúng hạn':
                return item?.daHoanThanhDungHan || 0;
            case 'Hoàn thành quá hạn':
                return item?.daHoanThanhQuaHan || 0;
            case 'Đang thực hiện trong hạn':
                return item?.dangXuLyDungHan || 0;
            case 'Đang thực hiện quá hạn':
                return item?.dangXuLyQuaHan || 0;
            default:
                return 0;
        }
    }

    getPercentageByStatus(item: any, status: string): number {
        // Lấy phần trăm tương ứng với mỗi trạng thái
        switch (status) {
            case 'Hoàn thành đúng hạn':
                return item?.percentDaHoanThanhDungHan || 0;
            case 'Hoàn thành quá hạn':
                return item?.percentDaHoanThanhQuaHan || 0;
            case 'Đang thực hiện trong hạn':
                return item?.percentDangXuLyDungHan || 0;
            case 'Đang thực hiện quá hạn':
                return item?.percentDangXuLyQuaHan || 0;
            default:
                return 0;
        }
    }
}

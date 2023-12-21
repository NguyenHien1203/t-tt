import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { BieuDoThongKeTheoTieuChiService } from 'src/app/demo/service/thong-ke-nhiem-vu/bieu-do-thong-ke-theo-tieu-chi.service';
import { BieuDoTheoTieuChiModel } from 'src/app/models/thong-ke-nhiem-vu/bieu-do-thong-ke-theo-tieu-chi';

@Component({
    selector: 'app-bieu-do-thong-ke-theo-tieu-chi',
    templateUrl: './bieu-do-thong-ke-theo-tieu-chi.component.html',
    styleUrls: ['./bieu-do-thong-ke-theo-tieu-chi.component.scss'],
    providers: [MessageService],
})
export class BieuDoThongKeTheoTieuChiComponent {
    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private service: BieuDoThongKeTheoTieuChiService,
        private cd: ChangeDetectorRef
    ) {}

    chartData: any;
    options: any;
    idDonVi: string = this.authService.GetmUserInfo()?.donViId ?? '0';
    items: any[] = [
        { label: 'Thống kê nhiệm vụ' },
        { label: 'Thống kê theo tiêu chí' },
    ];
    home = { icon: 'pi pi-home', routerLink: '/' };
    objDataBieuDo: BieuDoTheoTieuChiModel = null;
    id: string = '1';

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    async ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        await this.LoadDanhSach();
        this.chartData = {
            labels: this.objDataBieuDo?.label,
            datasets: [
                {
                    type: 'bar',
                    label: 'Hoàn thành đúng hạn: ' + this.objDataBieuDo?.hoanThanhDungHanCount,
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-500'),
                    data: this.objDataBieuDo?.hoanThanhDungHan,
                },
                {
                    type: 'bar',
                    label: 'Đang hoàn thành đúng hạn: '  + this.objDataBieuDo?.dangHoanThanhDungHanCount,
                    backgroundColor:
                        documentStyle.getPropertyValue('--blue-500'),
                    data: this.objDataBieuDo?.dangHoanThanhDungHan,
                },
                {
                    type: 'bar',
                    label: 'Hoàn thành quá hạn: ' + this.objDataBieuDo?.hoanThanhQuaHanCount,
                    backgroundColor:
                        documentStyle.getPropertyValue('--yellow-500'),
                    data: this.objDataBieuDo?.hoanThanhQuaHan,
                },
                {
                    type: 'bar',
                    label: 'Đang hoàn thành quá hạn: '  + this.objDataBieuDo?.dangHoanThanhQuaHanCount,
                    backgroundColor:
                        documentStyle.getPropertyValue('--red-500'),
                    data: this.objDataBieuDo?.dangHoanThanhQuaHan,
                },
            ],
        };

        this.options = {
            barPercentage: 0.4,
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Tổng số nhiệm vụ: ' + this.objDataBieuDo?.count,
                    font: {
                        size: 14,
                    },
                },
                datalabels: {
                    anchor: 'end', // Hiển thị dữ liệu ở cuối label
                    align: 'top', // Hiển thị dữ liệu ở trên label
                    display: function (context: any) {
                        return context.dataset.data[context.dataIndex];
                    },
                    font: {
                        weight: 'bold',
                    },
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    stacked: true,
                    max: this.objDataBieuDo.value, // Set the maximum value on the y-axis
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }

    // Tìm kiếm danh sách
    public async LoadDanhSach() {
        this.objDataBieuDo = await this.service.getDaTaBieuDo(this.idDonVi);
    }
}

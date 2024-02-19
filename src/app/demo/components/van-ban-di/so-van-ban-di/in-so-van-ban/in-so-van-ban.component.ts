import { Component, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AuthService } from 'src/app/common/auth.services';
import { TabCloseService } from 'src/app/demo/service/tab-close.service';
@Component({
    selector: 'app-in-so-van-ban',
    templateUrl: './in-so-van-ban.component.html',
    styleUrls: ['./in-so-van-ban.component.scss'],
})
export class InSoVanBanComponent {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private authService: AuthService,
        private tabCloseService: TabCloseService
    ) {}
    strTrichXuat: string = '';
    lstSoVanBanDi: any[] = [];
    fullName = this.authService.GetmUserInfo()?.fullName;

     ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            if (params['strTrichXuat'] != undefined) {
                this.strTrichXuat = params['strTrichXuat'];
                localStorage.setItem('strTrichXuat', this.strTrichXuat);
            }

            if (params['list'] != undefined) {
                const encodedData = JSON.parse(
                    decodeURIComponent(params['list'])
                );
                this.lstSoVanBanDi = encodedData;
                localStorage.setItem(
                    'listSoVanBanDi',
                    JSON.stringify(this.lstSoVanBanDi)
                );

                this.router.navigate(['/in-so-van-ban'], {
                    queryParams: { list: null },
                    queryParamsHandling: 'merge',
                    state: { target: '_blank' },
                });
            }

            if (localStorage.getItem('listSoVanBanDi')) {
                this.lstSoVanBanDi = JSON.parse(
                    localStorage.getItem('listSoVanBanDi')
                );
            }

            if (localStorage.getItem('strTrichXuat')) {
                this.strTrichXuat = localStorage.getItem('strTrichXuat');
            }
        });
        this.tabCloseService.tabClosed$.subscribe(() => {
            localStorage.removeItem('listSoVanBanDi');
            localStorage.removeItem('strTrichXuat');
        });
    }

    public Return() {
        this.router.navigate(['/van-ban-di/so-van-ban-di']);
    }

    public In() {
        const printContents = document.getElementById('formIn').innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        // const element = document.getElementById('formIn'); //  ID của phần bạn muốn in.
        // if (element) {
        //     html2canvas(element).then((canvas) => {
        //       // Chuyển đổi canvas thành URL dữ liệu
        //       const dataURL = canvas.toDataURL('image/png');

        //       // Tạo một đối tượng link để tải xuống
        //       const link = document.createElement('a');
        //       link.href = dataURL;
        //       link.download = 'captured-screen.png';

        //       // Bật chế độ tự động click để tải xuống
        //       document.body.appendChild(link);
        //       link.click();
        //       document.body.removeChild(link);
        //     });
        //   }

        // const canvasWidth = 1080;
        // // Lấy chiều rộng của table
        // const tableWidth = element.offsetWidth;
        // // Tính toán tỉ lệ để điều chỉnh chiều rộng của table
        // const scale = canvasWidth / tableWidth;
        // element.style.transform = `scale(${scale})`;

        // if (element) {
        //     html2canvas(element, {
        //         width: canvasWidth,
        //         scale: 2, // Tăng tỷ lệ scale để tăng chất lượng,
        //     }).then((canvas) => {
        //         // Chuyển đổi canvas thành ảnh PNG
        //         const imgData = canvas.toDataURL('image/png');

        //         // Khởi tạo đối tượng jsPDF
        //         const pdf = new jsPDF();

        //         // Thêm ảnh vào tài liệu PDF
        //         pdf.addImage(
        //             imgData,
        //             'PNG',
        //             0,
        //             0,
        //             pdf.internal.pageSize.getWidth(),
        //             pdf.internal.pageSize.getHeight()
        //         );

        //         // Tải xuống dưới dạng PDF
        //         pdf.save('SoVanBanDi.pdf');
        //     });
        // }
    }
}

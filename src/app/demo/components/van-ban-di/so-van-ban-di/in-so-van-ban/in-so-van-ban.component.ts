import { Component, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-in-so-van-ban',
    templateUrl: './in-so-van-ban.component.html',
    styleUrls: ['./in-so-van-ban.component.scss'],
})
export class InSoVanBanComponent {
    isShow: boolean = true;
    lstSoVanBanDi: any[] = [];
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {}
    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            if (params['list']) {
                this.lstSoVanBanDi = JSON.parse(
                    decodeURIComponent(params['list'])
                );
                // Lấy giá trị từ state (đây là 'target')
                const target =
                    this.router.getCurrentNavigation()?.extras.state['target'];

                // Sử dụng decodedList và target theo nhu cầu của bạn
            }
        });
        // this.location.replaceState('/print');
    }
    public In() {
      // const element = document.getElementById('dt1'); // Thay 'your-element-id' bằng ID của phần bạn muốn in.

      // if (element) {
      //   html2canvas(element).then((canvas) => {
      //     // Chuyển đổi canvas thành URL dữ liệu
      //     const dataURL = canvas.toDataURL('image/png');
  
      //     // Tạo một đối tượng link để tải xuống
      //     const link = document.createElement('a');
      //     link.href = dataURL;
      //     link.download = 'captured-screen.png';
  
      //     // Bật chế độ tự động click để tải xuống
      //     document.body.appendChild(link);
      //     link.click();
      //     document.body.removeChild(link);
      //   });
      // }
    }
}

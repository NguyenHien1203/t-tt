import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { BieuDoThongKeTheoBangService } from 'src/app/demo/service/thong-ke-nhiem-vu/bieu-do-thong-ke-theo-bang.service';
import { BieuDoThongKeTheoBang } from 'src/app/models/thong-ke-nhiem-vu/bieu-do-thong-ke-theo-bang';

@Component({
    selector: 'app-bieu-do-thong-ke-theo-bang',
    templateUrl: './bieu-do-thong-ke-theo-bang.component.html',
    styleUrls: ['./bieu-do-thong-ke-theo-bang.component.scss'],
    providers : [MessageService]
})
export class BieuDoThongKeTheoBangComponent {
    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private service: BieuDoThongKeTheoBangService,
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
    lstData: BieuDoThongKeTheoBang[] = [];
    id: string = '1';

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    async ngOnInit() {
        await this.LoadDanhSach();
    }

    // Tìm kiếm danh sách
    public async LoadDanhSach() {
        this.lstData = await this.service.getDaTaBieuDo(this.idDonVi);
    }
}

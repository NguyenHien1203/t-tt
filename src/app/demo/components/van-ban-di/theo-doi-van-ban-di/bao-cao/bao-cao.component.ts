import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TheoDoiVanBanDiService } from 'src/app/demo/service/van-ban-di/theo-doi-van-ban-di.service';

@Component({
    selector: 'app-bao-cao',
    templateUrl: './bao-cao.component.html',
    styleUrls: ['./bao-cao.component.scss'],
    providers: [MessageService],
})
export class BaoCaoComponent implements OnInit {
    constructor(
        private service: TheoDoiVanBanDiService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private messageService: MessageService
    ) {}

    loading : boolean = false;
    lstBaoCao : any[] = [];
    items = [
        { label: 'Văn bản đi' },
        { label: 'Theo dõi văn bản đi' },
        { label: 'Báo cáo' },
    ];
    home = { icon: 'pi pi-home', routerLink: '/' };
    id: string = '1';
    ThongTinVanBan: any[] = [];
    fullName = this.authService.GetmUserInfo()?.fullName;

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            if (params['id'] != undefined) {
                this.id = params['id'];
            }
        });

        this.service.getVanBanById(this.id).then(
            (data) => {
                if (data.isError) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.title,
                    });
                } else {
                    this.ThongTinVanBan = data.objVanBan;
                    // this.ThongTinFile = data.lstFile;
                }
            },
            (error) => {
                console.log('Error', error);
            }
        );
    }
}

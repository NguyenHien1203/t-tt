import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { XuLyCongViecService } from 'src/app/demo/service/cong-viec/xu-ly-cong-viec.service';

@Component({
    selector: 'app-luong-xu-ly',
    templateUrl: './luong-xu-ly.component.html',
    styleUrls: ['./luong-xu-ly.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class LuongXuLyComponent implements OnInit {
    idCongViec: string = '0';
    idCap: string = '0';
    loai: string = '0';
    objLuongDuLieu: any = [];
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: XuLyCongViecService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) { }

    items = [
        { label: 'Công việc' },
        { label: 'Xử lý công việc' },
        { label: 'Luồng xử lý' },
    ];
    home = { icon: 'pi pi-home', routerLink: '/' };

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            if (params['id'] != undefined)
                this.idCongViec = params['id'];

            if (params['cap'] != undefined)
                this.idCap = params['cap'];

            if (params['loai'] != undefined)
                this.loai = params['loai'];
        });

        this.GetDataLuongDuLieu();
    }


    public QuayLai() {
        this.router.navigate(['./cong-viec/xu-ly-cong-viec']);
    }

    public GetDataLuongDuLieu() {
        this.service.getDataLuongDuLieu(this.idCap, this.idCongViec, this.loai).subscribe(data => {
            if (data.isError) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
            } else {
                this.objLuongDuLieu = data.objData;
                console.log(this.objLuongDuLieu);
            }
        }, (error) => {
            console.log('Error', error);
        })
    }

    public ViewDetailVanBan(idVanBan :string, idCongViec :string){

    }

    public ViewDetailCongViec(idCongViec :string, capId :string, loai :string){
        
    }
}

import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LuuTruCaNhanService } from 'src/app/demo/service/ho-so-cong-viec/luu-tru-ca-nhan.service';
import { TreeNode } from 'src/app/models/ho-so-cong-viec/danh-muc-ho-so-ca-nhan';

@Component({
    selector: 'app-luu-tru-ca-nhan',
    templateUrl: './luu-tru-ca-nhan.component.html',
    styleUrls: ['./luu-tru-ca-nhan.component.scss'],
    providers : [MessageService]
})
export class LuuTruCaNhanComponent {
    constructor(
        private messageService: MessageService,
        private service: LuuTruCaNhanService,
        private authService: AuthService,
        private cd: ChangeDetectorRef
    ) {}
    node: TreeNode = null;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    timChinhXac: boolean = false;
    public id: string = '1';
    hienThiCapNhat: boolean = false;
    hienThiThemMoi: boolean = false;
    loading: boolean = false;
    lstDmHoSo: TreeNode[] = [];
    items = [{ label: 'Hồ sơ công việc' }, { label: 'Lưu trữ hồ sơ cá nhân' }];
    home = { icon: 'pi pi-home', routerLink: '/' };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.loading = true;
        this.LoadDanhSach();
    }

    public LoadDanhSach(): void {
        this.service.getDanhSachLuuTruHoSoCaNhan(this.idUser).then((data) => {
            if (data.isError) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'error',
                    detail: data.title,
                });
            } else {
                this.lstDmHoSo = data;
                this.loading = false;
            }
        });
    }

    public CapNhat(id: string) {
        this.hienThiCapNhat = true;
        this.id = id;
    }

    public ThemMoi(node: TreeNode) {
        this.node = node;
        this.hienThiThemMoi = true;
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'C') this.hienThiCapNhat = false;
        if (loai === 'T') this.hienThiThemMoi = false;
        this.LoadDanhSach();
    }
}

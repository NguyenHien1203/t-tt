import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DanhMucHoSoCoQuanService } from 'src/app/demo/service/ho-so-cong-viec/danh-muc-ho-so-co-quan.service';
import { TimKiemDanhMucHoSoCoQuan } from 'src/app/models/ho-so-cong-viec/danh-muc-ho-so-co-quan';

@Component({
    selector: 'app-danh-muc-ho-so-co-quan',
    templateUrl: './danh-muc-ho-so-co-quan.component.html',
    styleUrls: ['./danh-muc-ho-so-co-quan.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class DanhMucHoSoCoQuanComponent {
    constructor(
        private messageService: MessageService,
        private service: DanhMucHoSoCoQuanService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private cd: ChangeDetectorRef,
    ) {}

    node : TreeNode = null;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    timChinhXac: boolean = false;
    public id: string = '1';
    hienThiCapNhat: boolean = false;
    hienThiThemMoi: boolean = false;
    loading: boolean = false;
    lstDmHoSo: TreeNode[] = [];
    items = [{ label: 'Hồ sơ công việc' }, { label: 'Danh mục hồ sơ cơ quan' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemDanhMucHoSoCoQuan = {};

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.loading = true;
        this.LoadDanhSach();
    }

    public LoadDanhSach(): void {
        this.service
            .getDanhSachDanhMucHoSoCoQuan(this.idDonViLamViec)
            .then((data) => {
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

    public Xoa(id: string) {
        this.confirmService.confirm({
            message: 'Bạn có chắc chắn xác nhận xóa hồ sơ?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service.xoaDanhMucHoSoCoQuan(id).subscribe(
                    (data) => {
                        if (data.isError) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: data.title,
                            });
                        } else {
                            this.LoadDanhSach();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: data.title,
                            });
                        }
                    },
                    (error) => {
                        console.log('Error', error);
                    }
                );
            },
            reject: () => {},
        });
    }
}



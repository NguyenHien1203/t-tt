import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyNhanService } from 'src/app/demo/service/he-thong/quan-ly-nhan.service';
import { NodeService } from 'src/app/demo/service/node.service';
import { TimKiemNhan } from 'src/app/models/he-thong/quan-ly-nhan';
import { modelOptions } from 'src/app/models/option-model';

@Component({
    selector: 'app-quan-ly-nhan',
    templateUrl: './quan-ly-nhan.component.html',
    styleUrls: ['./quan-ly-nhan.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class QuanLyNhanComponent {
    constructor(
        private messageService: MessageService,
        private service: QuanLyNhanService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private cd: ChangeDetectorRef,
    ) {}
    
    lstPhanLoai: modelOptions[] = [
        { text: 'Trao đổi thông tin', value: 0 },
        { text: 'Văn bản', value: 1 },
        { text: 'Hồ sơ', value: 2 },
        { text: 'Công việc', value: 3 },
    ];
    isShowSearch: boolean = false;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    timChinhXac: boolean = false;
    public id: string = '1';
    hienThiCapNhat: boolean = false;
    hienThiThemMoi: boolean = false;
    loading: boolean = false;
    lstNhan: any[] = [];
    files!: TreeNode[];
    items = [{ label: 'Hệ thống' }, { label: 'Quản lý nhãn' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemNhan = {
        tenNhan: '',
        phanLoai: 0,
        ghiChu: '',
        userId: Number(this.idUser),
        timChinhXac: 0,
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
    }
    //
    public async LoadDanhSach() {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.lstNhan = await this.service.getDanhSachNhan(this.timKiemDanhSach);
    }

    public ThemMoi() {
        this.hienThiThemMoi = true;
    }

    public CapNhat(id: string) {
        this.hienThiCapNhat = true;
        this.id = id;
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'C') this.hienThiCapNhat = false;
        if (loai === 'T') this.hienThiThemMoi = false;
        this.LoadDanhSach();
    }

    public Xoa(id: string) {
        this.confirmService.confirm({
            message: 'Bạn có chắc chắn xác nhận xóa nhãn?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service.xoaNhan(id).subscribe(
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

    public CheckedHt() {
        this.timChinhXac = !this.timChinhXac;
    }
}

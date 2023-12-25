import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyNhanService } from 'src/app/demo/service/he-thong/quan-ly-nhan.service';
import { TreeNode } from 'src/app/models/ho-so-cong-viec/danh-muc-ho-so-ca-nhan';
import { modelOptions } from 'src/app/models/option-model';

@Component({
    selector: 'app-them-moi',
    templateUrl: './them-moi.component.html',
    styleUrls: ['./them-moi.component.scss'],
})
export class ThemMoiComponent {
    @Input() id: string = '1';
    @Input() show: boolean = false;
    @Input() node: TreeNode = null;
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private service: QuanLyNhanService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    selectedLuuTru: boolean = false;
    selectedNodes: TreeNode = null;
    loading: boolean = true;
    submitted: boolean = false;
    lstNhanParent: TreeNode[] = [];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    lstPhanLoai: any[] = [
        { text: 'Trao đổi thông tin', value: '0' },
        { text: 'Văn bản', value: '1' },
        { text: 'Hồ sơ', value: '2' },
        { text: 'Công việc', value: '3' },
    ];
    public formThemMoi = this.formBuilder.group({
        id: [0, []],
        tenHienThi: ['', []],
        hienThi: [false, []],
        phanLoai: ['0', []],
        parentId: [0, []],
        ghiChu: ['', []],
        created: [new Date(), []],
        createdBy: [this.idUser, []],
    });

    public async BindDialogData() {
        this.lstNhanParent = await this.service.getDanhSachNhanCha(this.idUser);
    }

    public Thoat(): void {
        this.node = null;
        this.formThemMoi.reset();
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public ThemMoi() {
        this.submitted = true;

        if (this.formThemMoi.valid) {
            let itemData = this.formThemMoi.value;
            let nhan = {
                id: 0,
                tenHienThi: itemData.tenHienThi,
                hienThi: itemData.hienThi,
                phanLoai: itemData.phanLoai,
                parentId: this.selectedNodes != null ? this.selectedNodes.data : 0,
                ghiChu: itemData.ghiChu,
                created: new Date(),
                createdBy: this.idUser,
                userId: this.idUser,
            };
            this.service.themMoiNhan(nhan).subscribe(
                (data) => {
                    if (data.isError) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: data.title,
                        });
                    } else {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: data.title,
                        });
                        this.Thoat();
                    }
                },
                (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Có lỗi xảy ra',
                    });
                    return throwError(() => error);
                }
            );
        }
    }
}

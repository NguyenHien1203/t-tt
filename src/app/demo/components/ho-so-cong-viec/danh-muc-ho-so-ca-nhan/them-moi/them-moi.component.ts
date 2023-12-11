import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { DanhMucHoSoCaNhanService } from 'src/app/demo/service/ho-so-cong-viec/danh-muc-ho-so-ca-nhan.service';
import {
    TreeNode,
    loaiHoSoCongViec,
} from 'src/app/models/ho-so-cong-viec/danh-muc-ho-so-ca-nhan';

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
        private service: DanhMucHoSoCaNhanService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    selectedLuuTru: boolean = false;
    selectedNodes: TreeNode = null;
    loading: boolean = true;
    submitted: boolean = false;
    lstHoSoParent: TreeNode[] = [];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    public formThemMoi = this.formBuilder.group({
        id: [0, []],
        maHoSo: ['', []],
        tenHoSo: ['', []],
        parentId: [0, []],
        noiLuu: [0, []],
        ghiChu: ['', []],
        created: [new Date(), []],
        donViId: ['0', []],
        createdBy: ['0', []],
    });

    ngOnInit() {
        this.loading = false;
    }

    public LoadTreeNode() {
        this.service
            .getDanhSachDanhMucHoSoCaNhan(this.idUser)
            .then((data) => (this.lstHoSoParent = data));
    }

    public BindParent() {
        this.LoadTreeNode();
        this.selectedNodes = this.node;
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
            itemData.id = 0;
            itemData.donViId = this.idDonViLamViec;
            itemData.createdBy = this.idUser;
            itemData.created = new Date();
            itemData.parentId =
                this.selectedNodes != null ? this.selectedNodes.data : 0;
            itemData.noiLuu = this.selectedLuuTru
                ? loaiHoSoCongViec.hoSoCongViecCaNhan
                : 0;

            this.service.themMoiDanhMucHoSoCaNhan(itemData).subscribe(
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

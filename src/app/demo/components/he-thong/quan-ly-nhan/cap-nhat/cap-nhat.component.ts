import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyNhanService } from 'src/app/demo/service/he-thong/quan-ly-nhan.service';
import { TreeNode } from 'src/app/models/ho-so-cong-viec/danh-muc-ho-so-ca-nhan';

@Component({
    selector: 'app-cap-nhat',
    templateUrl: './cap-nhat.component.html',
    styleUrls: ['./cap-nhat.component.scss'],
})
export class CapNhatComponent {
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
    public formCapNhat = this.formBuilder.group({
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
        const data = await this.service.getNhanById(this.id);
        this.formCapNhat.patchValue({
            id : data.id,
            tenHienThi : data.tenHienThi,
            hienThi : data.hienThi,
            phanLoai : data.phanLoai,
            parentId : data.parentId,
            ghiChu : data.ghiChu,
            created : new Date(),
            createdBy : '0',
        });

        this.selectedNodes = this.findNodeByData(this.lstNhanParent, data.parentId);
    }

    findNodeByData(tree, searchData) {
        if (searchData === 0) {
            return null;
        }

        for (const node of tree) {
            if (node.data === searchData) {
                return node; // Trả về nếu tìm thấy nút
            }

            if (node.children && node.children.length > 0) {
                const foundInChild = this.findNodeByData(
                    node.children,
                    searchData
                );
                if (foundInChild) {
                    return foundInChild; // Trả về nếu tìm thấy trong các nút con
                }
            }
        }

        return null; // Trả về null nếu không tìm thấy
    }

    public Thoat(): void {
        this.node = null;
        this.formCapNhat.reset();
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public CapNhat() {
        this.submitted = true;

        if (this.formCapNhat.valid) {
            let itemData = this.formCapNhat.value;
            let nhan = {
                id: itemData.id,
                tenHienThi: itemData.tenHienThi,
                hienThi: itemData.hienThi,
                phanLoai: itemData.phanLoai,
                parentId:
                    this.selectedNodes != null ? this.selectedNodes.data : 0,
                ghiChu: itemData.ghiChu,
                created: new Date(),
                createdBy: this.idUser,
                userId: this.idUser,
            };
            this.service.capNhatNhan(nhan).subscribe(
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

import { MessageService } from 'primeng/api';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { TreeNode, loaiHoSoCongViec } from 'src/app/models/ho-so-cong-viec/danh-muc-ho-so-ca-nhan';
import { FormBuilder } from '@angular/forms';
import { DanhMucHoSoCaNhanService } from 'src/app/demo/service/ho-so-cong-viec/danh-muc-ho-so-ca-nhan.service';

@Component({
    selector: 'app-cap-nhat',
    templateUrl: './cap-nhat.component.html',
    styleUrls: ['./cap-nhat.component.scss'],
})
export class CapNhatComponent {
    @Input() id: string = '1';
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private service: DanhMucHoSoCaNhanService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    selectedNodes: TreeNode = null;
    loading: boolean = true;
    selectedLuuTru: boolean = false;
    submitted: boolean = false;
    lstHoSoParent: TreeNode[] = [];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    public formCapNhat = this.formBuilder.group({
        id: [0, []],
        maHoSo: ['', []],
        tenHoSo: ['', []],
        parentId: [0, []],
        noiLuu: [0, []],
        phanLoai: [0, []],
        ghiChu: ['', []],
        lastModified: [new Date(), []],
        lastModifiedBy: ['0', []],
    });

    public async BindDialogData() {
        try {
            const dataParent = await this.service.getDanhSachDanhMucHoSoCaNhan(
                this.idUser
            );
            this.lstHoSoParent = dataParent;

            const data = await this.service.getDanhMucHoSoCaNhanId(this.id);
            this.selectedNodes = this.findNodeByData(dataParent, data.parentId);
            this.formCapNhat.patchValue({
                id: data.id,
                maHoSo: data.maHoSo,
                tenHoSo: data.tenHoSo,
                noiLuu: data.noiLuu,
                phanLoai: data.phanLoai,
                ghiChu: data.ghiChu,
            });
            this.selectedLuuTru =
                data.noiLuu == loaiHoSoCongViec.hoSoCongViecCaNhan
                    ? true
                    : false;
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Có lỗi xảy ra:' + error,
            });
        }
    }

    public Thoat(): void {
        this.formCapNhat.reset();
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public CapNhat() {
        this.submitted = true;

        if (this.formCapNhat.valid) {
            let itemData = this.formCapNhat.value;
            itemData.lastModifiedBy = this.idUser;
            itemData.parentId =
                this.selectedNodes != null ? this.selectedNodes.data : 0;
            itemData.noiLuu = this.selectedLuuTru
                ? loaiHoSoCongViec.hoSoCongViecCaNhan
                : 0;
            this.service.capNhatDanhMucHoSoCaNhan(itemData).subscribe(
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
}

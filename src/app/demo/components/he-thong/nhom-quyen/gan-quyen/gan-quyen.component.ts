import { filter } from 'rxjs';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { NhomQuyenService } from 'src/app/demo/service/he-thong/nhom-quyen.service';
import { TimKiemNhomQuyen } from 'src/app/models/he-thong/nhom-quyen';

@Component({
    selector: 'app-gan-quyen',
    templateUrl: './gan-quyen.component.html',
    styleUrls: ['./gan-quyen.component.scss'],
    providers: [MessageService],
})
export class GanQuyenComponent {
    constructor(
        private messageService: MessageService,
        private service: NhomQuyenService,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    isCheckedAll: boolean = false;
    isShowAll: boolean = false;
    iconClass: string = 'pi pi-plus';
    tenNhomQuyen: string = '';
    checkAllItem: string = 'checkAllItem';
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    public id: string = '1';
    hienThiCapNhat: boolean = false;
    hienThiThemMoi: boolean = false;
    loading: boolean = false;
    lstQuyenChuaCap: any[] = [];
    lstQuyenDuocCap: any[] = [];
    items = [
        { label: 'Hệ thống' },
        { label: 'Nhóm quyền' },
        { label: 'Thêm quyền' },
    ];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemNhomQuyen = {
        keyWord: '',
    };

    toggleNode(id: string): void {
        //chuyển hoạt họa icon
        if (id === this.checkAllItem) {
            this.isShowAll = !this.isShowAll;
            this.iconClass = this.isShowAll ? 'pi pi-minus' : 'pi pi-plus';
        }
    }

    toggleAllNodes(): void {
        // Implement logic to expand/collapse all nodes
    }

    expandNode(node: any): void {
        // mở
        node.expanded = true;
    }

    collapseNode(node: any): void {
        //đóng
        node.expanded = false;
    }

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    handleCheckboxClick(event: Event): void {
        event.stopPropagation(); // Ngăn chặn sự kiện lan ra các phần tử cha
        this.isCheckedAll = !this.isCheckedAll;
        let checkAll = this.isCheckedAll; //checked toàn bộ danh sách
        this.lstQuyenChuaCap = this.lstQuyenChuaCap.map((data) => ({
            ...data,
            checked: checkAll,
            children: data.children.map((child) => ({
                ...child,
                checked: checkAll,
            })),
        }));
    }

    //checked node đang chọn và xử lý checked của parent node đang chọn
    public CheckedNode(itemHt: any) {
        if (itemHt?.loai == 1) {
            const foundElement = this.FindObjectById(
                // tìm node đang checked
                this.lstQuyenChuaCap,
                itemHt?.id
            );
            this.SetCheckedProperty(foundElement, itemHt?.checked); // chuyển toàn bộ object : checked của nó thành thuộc tính hiện tại

            if ((foundElement || {}).code?.length == 9) {
                const objParent = this.FindObjectByCode(
                    this.lstQuyenChuaCap,
                    foundElement?.code.slice(0, 6)
                );
                objParent.checked = objParent?.children?.every(
                    (child) => child.checked
                );
            } else if ((foundElement || {}).code?.length == 6) {
                const objParent = this.FindObjectByCode(
                    this.lstQuyenChuaCap,
                    foundElement?.code.slice(0, 3)
                );
                objParent.checked = objParent?.children?.every(
                    (child) => child.checked
                );
            }
        }

        if (itemHt?.loai == 2) {
            const foundElement = this.FindObjectById(
                // tìm node đang checked
                this.lstQuyenDuocCap,
                itemHt?.id
            );
            this.SetCheckedProperty(foundElement, itemHt?.checked); // chuyển toàn bộ object : checked của nó thành thuộc tính hiện tại

            if ((foundElement || {}).code?.length == 9) {
                const objParent = this.FindObjectByCode(
                    this.lstQuyenDuocCap,
                    foundElement?.code.slice(0, 6)
                );
                objParent.checked = objParent?.children?.every(
                    (child) => child.checked
                );
            } else if ((foundElement || {}).code?.length == 6) {
                const objParent = this.FindObjectByCode(
                    this.lstQuyenDuocCap,
                    foundElement?.code.slice(0, 3)
                );
                objParent.checked = objParent?.children?.every(
                    (child) => child.checked
                );
            }
        }
    }

    //tìm đến object đang chọn thông qua id hoặc code
    public FindObjectById(array, id) {
        for (let i = 0; i < array.length; i++) {
            const object = array[i];

            if (object.id === id) {
                return object;
            }

            if (object.children && object.children.length > 0) {
                const foundObject = this.FindObjectById(object.children, id);

                if (foundObject) {
                    return foundObject;
                }
            }
        }

        return null;
    }

    public FindObjectByCode(array, code) {
        for (let i = 0; i < array.length; i++) {
            const object = array[i];

            if (object.code === code) {
                return object;
            }

            if (object.children && object.children.length > 0) {
                const foundObject = this.FindObjectByCode(
                    object.children,
                    code
                );

                if (foundObject) {
                    return foundObject;
                }
            }
        }

        return null;
    }

    //Check hoặc Uncheck prop của current object
    public SetCheckedProperty(object, isCheck: boolean) {
        object.checked = isCheck;

        if (object.children && object.children.length > 0) {
            for (let i = 0; i < object.children.length; i++) {
                this.SetCheckedProperty(object.children[i], isCheck);
            }
        }
    }

    //Lấy toàn bộ danh sách quyền được chọn
    getAllCheckedNodes(node: any): any[] {
        // lấy toàn bộ những item được checked
        let result: any[] = [];

        if (node.checked) {
            // Nếu node hiện tại checked, thêm nó vào kết quả
            result.push({ ...node });
        }

        if (node.children) {
            // Nếu node có children, duyệt qua từng children và thêm vào kết quả
            node.children.forEach((child) => {
                result = result.concat(this.getAllCheckedNodes(child));
            });
        }

        return result;
    }

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
    }

    public async LoadDanhSach() {
        try {
            this.route.queryParams.subscribe(async (params) => {
                let idNhomQuyen = params['id'];
                this.id = idNhomQuyen;
                this.tenNhomQuyen = params['tenQuyen'];
                const dataQuyenChuaCap =
                    await this.service.getDanhSachQuyenChuaCap(idNhomQuyen);
                this.lstQuyenChuaCap = dataQuyenChuaCap.map((dt) => {
                    if (dt.children) {
                        // Nếu là node cha có children
                        return {
                            ...dt,
                            expanded: true,
                            children: dt.children.map((child) => {
                                // Cập nhật checked nếu node con cần cập nhật
                                return { ...child, expanded: true };
                            }),
                        };
                    } else {
                        // Nếu không có children
                        return { ...dt, expanded: true };
                    }
                });

                const dataQuyenDuocCap =
                    await this.service.getDanhSachQuyenDuocCap(idNhomQuyen);
                this.lstQuyenDuocCap = dataQuyenDuocCap.map((dt) => {
                    if (dt.children) {
                        // Nếu là node cha có children
                        return {
                            ...dt,
                            expanded: true,
                            children: dt.children.map((child) => {
                                // Cập nhật checked nếu node con cần cập nhật
                                return { ...child, expanded: true };
                            }),
                        };
                    } else {
                        // Nếu không có children
                        return { ...dt, expanded: true };
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    public QuayLai() {
        this.router.navigate(['./he-thong/nhom-quyen']);
    }

    FindCheckedObjects(tree, arrayChecked: any[]) {
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].checked === true) {
                arrayChecked.push(tree[i].id);
            }

            if (tree[i].children && tree[i].children.length > 0) {
                this.FindCheckedObjects(tree[i].children, arrayChecked);
            }
        }
        return arrayChecked;
    }

    public AddQuyen(): void {
        let lstQuyen = this.FindCheckedObjects(this.lstQuyenChuaCap, []);

        if (lstQuyen.length == 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Yêu cầu chọn quyền chưa cấp',
            });
            return;
        }

        let itemData = {
            nhomQuyenId: this.id,
            lstQuyenId: lstQuyen,
        };

        this.service.themQuyen(itemData).subscribe((data) => {
            this.messageService.add({
                severity: data.isError ? 'error' : 'success',
                summary: data.isError ? 'Error' : 'Success',
                detail: data.title,
            });
            if (!data.isError) this.LoadDanhSach();
        });
    }
    public AddAllQuyen(): void {
        this.service.themToanQuyen(this.id).subscribe((data) => {
            this.messageService.add({
                severity: data.isError ? 'error' : 'success',
                summary: data.isError ? 'Error' : 'Success',
                detail: data.title,
            });
            if (!data.isError) this.LoadDanhSach();
        });
    }
    public RemoveQuyen(): void {
        let lstQuyen = this.FindCheckedObjects(this.lstQuyenDuocCap, []);

        if (lstQuyen.length == 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Yêu cầu chọn quyền được cấp',
            });
            return;
        }

        let itemData = {
            nhomQuyenId: this.id,
            lstQuyenId: lstQuyen,
        };

        this.service.xoaQuyen(itemData).subscribe((data) => {
            this.messageService.add({
                severity: data.isError ? 'error' : 'success',
                summary: data.isError ? 'Error' : 'Success',
                detail: data.title,
            });
            if (!data.isError) this.LoadDanhSach();
        });
    }

    public RemoveAllQuyen(): void {
        this.service.xoaToanQuyen(this.id).subscribe((data) => {
            this.messageService.add({
                severity: data.isError ? 'error' : 'success',
                summary: data.isError ? 'Error' : 'Success',
                detail: data.title,
            });
            if (!data.isError) this.LoadDanhSach();
        });
    }
}

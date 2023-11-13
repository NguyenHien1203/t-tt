import { Component, EventEmitter, Input, Output } from '@angular/core';
import { throwError } from 'rxjs';
import { saveAs } from 'file-saver';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-di/cap-nhat-moi.service';
import { MessageService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/common/auth.services';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { options } from '@fullcalendar/core/preact';

@Component({
    selector: 'app-gui-van-ban',
    templateUrl: './gui-van-ban.component.html',
    styleUrls: ['./gui-van-ban.component.scss'],
})
export class GuiVanBanComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() id: string = '1';

    constructor(
        private service: CapNhatMoiService,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private uploadFileService: UploadFileService
    ) {
        this.GetDataNhomDonVi();
        this.GetTreeDonVi();
    }

    iconClass = 'pi pi-plus';
    checkAllItem = 'checkAllItem';
    showLinkedRisksOnly: any;
    ThongTinVanBan: any;
    treeData: any[] = [];
    ThongTinFile: any[] = [];
    lstPhongBan: any = [];
    lstPhongBanSelected: any = [];
    phongBans: any[] = [];
    lstNhomNguoiDung: [];
    isCheckedAll: boolean = false;
    isShowAll: boolean = false;
    phongBan: any;
    nhomNguoiDung: any;
    DsCaNhanDaChon: any[] = [];
    DsCaNhanNhan: any[] = [];
    lstUserNhanOld: any[];
    lstUserChange: any[] = [];
    lstUserChangeUnShow: any[] = [];
    lstDonViNhan: any[] = [];
    submitted: boolean = false;
    idDonViLamViec = this.authService.GetDonViLamViec() ?? '0';
    userName = this.authService.GetmUserInfo()?.userName;
    userId = this.authService.GetmUserInfo()?.userId;
    idPhongBan = this.authService.GetmUserInfo()?.phongBanId;
    public formPhanPhoi = this.formBuilder.group({
        id: ['', []],
    });

    public async BindDataDialog() {
        this.service.GetVanBanById(this.id).then(
            (data) => {
                if (data.isError) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.title,
                    });
                } else {
                    this.ThongTinVanBan = data.objVanBan;
                    this.ThongTinFile = data.lstFile;
                }
            },
            (error) => {
                console.log('Error', error);
            }
        );

        const selectedPhongBans = await this.service.getPhongBanSelected(
            this.id,
            this.idDonViLamViec
        );

        this.phongBans = this.phongBans.map((phongBan) => ({
            ...phongBan,
            check: selectedPhongBans.includes(Number(phongBan.value)),
        }));
        // this.isCheckedAll =
        //     this.phongBans.filter((x) => x.check == true).length ===
        //     this.phongBans.length;

        this.service
            .getDanhSachCaNhanDaPhanPhoi(this.id, this.idDonViLamViec) //bind cá nhân phòng ban đã gửi từ db
            .then((data) => {
                this.lstDonViNhan = data;
            });
    }

    //Chặn hành động click vào input sẽ cle hoặc exp
    handleCheckboxClick(event: Event): void {
        event.stopPropagation(); // Ngăn chặn sự kiện lan ra các phần tử cha
        this.isCheckedAll = !this.isCheckedAll;
        let checkAll = this.isCheckedAll;
        this.treeData = this.treeData.map((data) => ({
            ...data,
            checked: checkAll,
        }));
    }

    toggleNode(id: string): void {
        if (id === this.checkAllItem) {
            this.isShowAll = !this.isShowAll;
            this.iconClass = this.isShowAll ? 'pi pi-minus' : 'pi pi-plus';
        }
    }

    toggleAllNodes(): void {
        // Implement logic to expand/collapse all nodes
    }

    expandNode(node: any): void {
        node.expanded = true;
    }

    collapseNode(node: any): void {
        node.expanded = false;
    }
    public Thoat(): void {
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public DownloadFile(filepath: string, filename: string) {
        let urlDownLoad = '/VanBanDi/CapNhatMoi/DownloadFile';
        this.uploadFileService
            .downloadFile(filepath, filename, urlDownLoad)
            .subscribe(
                (data) => {
                    const blob = new Blob([data], {
                        type: 'application/octet-stream',
                    });
                    saveAs(blob, filename);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Tải tệp thành công',
                    });
                },
                (error: any) => {
                    if (error.status === 404) {
                        // Xử lý lỗi 404 (NotFound)
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Không tìm thấy đường dẫn file',
                        });
                        // Ví dụ: Hiển thị thông báo lỗi cho người dùng
                    } else {
                        // Xử lý các lỗi khác
                        console.error('Đã xảy ra lỗi', error);
                        // Thực hiện các hành động tương ứng
                    }
                    return throwError(() => error);
                }
            );
    }

    public GetDataNhomDonVi() {
        this.service
            .getNhomDonViTheoDinhNghia(this.userId, this.idDonViLamViec)
            .then((data) => {
                this.lstPhongBan = data;
                this.phongBans = data;
            });
    }

    public GetTreeDonVi() {
        this.service.getTreeDonVi('', '').then((data) => {
            this.treeData = data;
        });
    }

    public AddToSelected(): void {
        const lstSelected = this.treeData
            .filter((dt) => dt.checked == true)
            .map((dt) => dt);
        if (lstSelected === undefined || lstSelected.length === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Yêu cầu chọn đơn vị',
            });
            return;
        }

        this.lstDonViNhan = lstSelected.map((dt) => ({
            value: dt.id,
            text: dt.tenDonVi,
        }));
    }

    public RemoveFromSelected(): void {
        var lstSelectedOpts = this.DsCaNhanNhan as any[]; //Lấy cá nhân đã selected
        if (lstSelectedOpts === undefined || lstSelectedOpts.length === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Yêu cầu chọn cá nhân',
            });
            return;
            //trả ra toast lỗi nếu chưa chọn cá nhân
        }
        this.treeData = this.treeData.map((dt) => ({
            ...dt,
            checked: lstSelectedOpts.includes(Number(dt.id)),
        }));
        const tmp = this.lstDonViNhan;

        // this.t =  tmp.filter((dt) => {
        //         !lstSelectedOpts.includes(dt.value);
        //     })
        //     .map((dt) => dt);

    }

    public PhanPhoi(): void {
        this.submitted = true;

        let itemData: any = {
            idVanBan: this.id?.toString(),
            idDonViLamViec: this.authService.GetDonViLamViec(),
            lstDonViNhan: this.DsCaNhanNhan.map((phongBan) => phongBan.value),
        };

        this.service.PhanPhoi(itemData).subscribe(
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
            (error) => {
                console.log('Error', error);
            }
        );
    }

    public checkAll(event) {
        this.phongBans.forEach(function (val, key) {
            val.check = event;
        });
    }
}

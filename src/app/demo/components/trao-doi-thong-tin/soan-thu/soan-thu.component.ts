import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { SoanThuService } from 'src/app/demo/service/trao-doi-thong-tin/soan-thu.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';

@Component({
    selector: 'app-soan-thu',
    templateUrl: './soan-thu.component.html',
    styleUrls: ['./soan-thu.component.scss'],
    providers: [MessageService],
})
export class SoanThuComponent implements OnInit {
    @ViewChild('myEditor') myEditor: any;

    constructor(
        private messageService: MessageService,
        private service: SoanThuService,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private uploadfileService: UploadFileService,
        private router : Router,
        @Inject(DOCUMENT) private document: Document
    ) {}

    tieuDe: string = '';
    lstNguoiDungFilter: any[] = [];
    lstSelectedNguoiDung: any[] = [];
    filteredItems: any[] = [];
    nhomNguoiDungId: string = '';
    phongBanId: string = '';
    donViId: string = '';
    hienThiChonNguoiDung: boolean = false;
    items = [{ label: 'Trao đổi thông tin' }, { label: 'Soạn thư' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    lstNhanCaNhan: any[] = [];
    lstDonVi: any[] = [];
    lstPhongBan: any[] = [];
    lstNguoiDung: any[] = [];
    lstNhomNguoiDung: any[] = [];
    file: File | null = null;
    MenuItems = [];
    timChinhXac: boolean = false;
    selectedFiles: any[] = [];
    public id: string = '1';
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    Editor = ClassicEditor;
    filterItems(event: any) {
        //tìm kiếm người dùng
        const lstNguoiDungSelected = this.lstSelectedNguoiDung.map(
            (x) => x.text
        );
        const keyword = event.query.toLowerCase();
        this.filteredItems = this.lstNguoiDungFilter // lọc ra những người có tên hoặc username trùng với keyword, và không trùng với người dùng đã selected
            .filter(
                (item) =>
                    (item.userName.toLowerCase().includes(keyword) ||
                        item.hoTenDem.toLowerCase().includes(keyword)) &&
                    !lstNguoiDungSelected.includes(item.userName)
            )
            .map((data) => {
                return { ...data, text: data.userName };
            });
    }

    async ngOnInit() {
        await this.service //lấy danh sách nhãn cá nhân
            .getDanhSachNhanCaNhan(Number(this.authService.GetmUserInfo()?.userId))
            .then((data) => {
                this.lstNhanCaNhan = data.map((ncn) => {
                    return {
                        label: ncn.tenNhan,
                        icon: 'pi pi-tag',
                        routerLink: [
                            '/trao-doi-thong-tin/hop-thu-ca-nhan',
                            ncn.id, // Truyền ID vào đây
                        ],
                    };
                });
            });

        this.MenuItems = [
            {
                label: 'Soạn thư',
                icon: 'pi pi-file-edit',
                routerLink: ['/trao-doi-thong-tin/soan-thu'],
            },
            {
                label: 'Hộp thư đến',
                icon: 'pi pi-envelope',
                routerLink: ['/trao-doi-thong-tin/hop-thu-den'],
            },
            {
                label: 'Hộp thư đi',
                icon: 'pi pi-send',
                routerLink: ['/trao-doi-thong-tin/hop-thu-di'],
            },
            {
                label: 'Thư nháp',
                icon: 'pi pi-clone',
                routerLink: ['/trao-doi-thong-tin/hop-thu-nhap'],
            },
            {
                label: 'Thư quan trọng',
                icon: 'pi pi-flag-fill',
                routerLink: ['/trao-doi-thong-tin/hop-thu-quan-trong'],
            },
            {
                label: 'Nhãn trao đổi cá nhân',
                icon: 'pi pi-tags',
                items: this.lstNhanCaNhan,
            },
        ];

        this.LoadDanhMuc();
    }

    public LoadDanhMuc() {
        //Lấy danh sách đơn vị + nhóm người dùng
        this.service.getDanhSachDonVi().then((data) => {
            setTimeout(() => {
                this.lstDonVi = data;
            }, 300);
        });
        this.service
            .getDanhSachNhomNguoiDung(
                this.idUser,
                this.idPhongBan,
                this.idDonViLamViec
            )
            .then((data) => {
                this.lstNhomNguoiDung = data;
            });

        this.service.getDanhSachNguoiDungs().then((data) => {
            this.lstNguoiDungFilter = data;
        });
    }

    public onFileSelected(event: any) {
        const FileInput: File = event.target.files[0];

        if (FileInput) {
            this.file = FileInput;
            let urlSave = '/VanBanDi/CapNhatMoi/UpLoadFile';
            this.uploadfileService.uploadFiles(this.file, urlSave).subscribe({
                next: (data) => {
                    if (data.isError)
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Tải lên thất bại',
                        });
                    else {
                        this.messageService.add({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Tải lên thành công',
                        });
                        const fileReturn = {
                            fileName: data.objData.fileName,
                            filePath: data.objData.filePath,
                            isNew: true,
                            isDelete: false,
                        };
                        this.selectedFiles.push(fileReturn);
                    }
                },
                error: (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Có lỗi xảy ra' + error,
                    });
                    return throwError(() => error);
                },
            });
        }
    }

    public ChangeDonVi(event): void {
        this.lstNhomNguoiDung = [];
        if (event != null) {
            this.service.getDanhSachPhongBan(event).then((data) => {
                this.lstPhongBan = data;
            });
        }
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'C') {this.hienThiChonNguoiDung = false;
        this.phongBanId = null;
                this.nhomNguoiDungId = null;
            };
    }

    public ChonNguoiDung(event: any): void {
        //Chọn người dùng từ dialog
        const lstSelectedNgd = this.lstSelectedNguoiDung.map((dt) => dt.text);
        if (event != null) {
            const lstTmp = event
                .filter((dt) => !lstSelectedNgd.includes(dt))
                .map((dt) => {
                    return { text: dt };
                });
            this.lstSelectedNguoiDung =
                this.lstSelectedNguoiDung.concat(lstTmp);
                this.phongBanId = null;
                this.nhomNguoiDungId = null;
        }
    }

    public ChangePhongBan(event): void {
        //bind người dùng lên dialog
        this.nhomNguoiDungId = null;
        if (event != null) {
            this.service.getDanhSachUserThuocPhongBan(event).then((data) => {
                this.lstNguoiDung = data;
            });
            setTimeout(() => {
                this.hienThiChonNguoiDung = true;
            }, 500);
        } else {
            this.lstNguoiDung = []; // Xóa danh sách người dùng nếu không có giá trị được chọn
        }
    }

    public ChangeNhomNguoiDung(event): void {
        //bind người dùng lên dialog
        this.phongBanId = null;
        if (event != null) {
            this.service.getDanhSachUserThuocPhongBan(event).then((data) => {
                this.lstNguoiDung = data;
            });
            setTimeout(() => {
                this.hienThiChonNguoiDung = true;
            }, 500);
        } else {
            this.lstNguoiDung = []; // Xóa danh sách người dùng nếu không có giá trị được chọn
        }
    }

    public GuiDi(): void {
        if (this.lstSelectedNguoiDung.length == 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Yêu cầu chọn người nhận',
            });
        }

        if (this.tieuDe === '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Yêu cầu nhập tiêu đề',
            });
        }

        let itemData = {
            userId: this.idUser,
            listDiaChi: this.lstSelectedNguoiDung.map((data) => data.text),
            tieuDe: this.tieuDe,
            noiDung: this.myEditor.editorInstance.getData(),
            loaiHinhTraoDoi: '0',
            vanBanId: '',
            traoDoiId: '',
            listFile: this.selectedFiles,
        };

        this.service.guiDi(itemData).subscribe((data) => {
            this.messageService.add({
                severity: data.isError ? 'error' : 'success',
                summary: data.isError ? 'Error' : 'Success',
                detail: data.title,
            });

            setTimeout(() => {
                if (!data.isError) {
                    this.ResetForm();
                }
            }, 2000);
        });
    }

    public LuuNhap(): void {
        if (this.lstSelectedNguoiDung.length == 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Yêu cầu chọn người nhận',
            });
        }

        if (this.tieuDe === '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Yêu cầu nhập tiêu đề',
            });
        }

        let itemData = {
            userId: this.idUser,
            listDiaChi: this.lstSelectedNguoiDung.map((data) => data.text),
            tieuDe: this.tieuDe,
            noiDung: this.myEditor.editorInstance.getData(),
            loaiHinhTraoDoi: '0',
            vanBanId: '',
            traoDoiId: '',
            listFile: this.selectedFiles,
        };

        this.service.luuNhap(itemData).subscribe((data) => {
            this.messageService.add({
                severity: data.isError ? 'error' : 'success',
                summary: data.isError ? 'Error' : 'Success',
                detail: data.title,
            });

            setTimeout(() => {
                if (!data.isError) {
                    this.ResetForm();
                }
            }, 2000);
        });
    }

    public ResetForm(){
        this.donViId = null;
        this.phongBanId = null;
        this.nhomNguoiDungId = null;
        this.lstSelectedNguoiDung = [];
        this.selectedFiles = [];
        this.myEditor.editorInstance.setValue("")
    }
}

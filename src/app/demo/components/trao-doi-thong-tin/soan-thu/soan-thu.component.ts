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
        @Inject(DOCUMENT) private document: Document
    ) {}

    menuItems: any[] = [
        { text: 'Item 1' },
        { text: 'Item 2' },
        // Add more items as needed
    ];

    showAutoComplete: boolean = false;
    filteredItems: any[] = [];
    nguoiDungId : string = "";
    phongBanId : string = "";
    donViId : string = "";
    hienThiChonNguoiDung : boolean  = false;
    loai : number  = 0;
    idSelected : string  = "0";
    items = [{ label: 'Trao đổi thông tin' }, { label: 'Soạn thư' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    lstNhanCaNhan: any[] = [];
    lstDonVi: any[] = [];
    lstPhongBan: any[] = [];
    lstUserGui: any[] = [];
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
    timKiemDanhSach: any = {
        tenNhan: '',
        phanLoai: '1',
        ghiChu: '',
        nguoiTao: Number(this.authService.GetmUserInfo()?.userId),
        timChinhXac: 0,
    };

    filterItems(event: any) {
        const keyword = event.query.toLowerCase();
        this.filteredItems = this.menuItems.filter((item) =>
            item.text.toLowerCase().includes(keyword)
        );
    }

    public getToolBar(): any {
        const toolbar: any = {
            items: [
                'undo',
                'redo',
                '|',
                'heading',
                '|',
                'fontfamily',
                'fontsize',
                'fontColor',
                'fontBackgroundColor',
                '|',
                'bold',
                'italic',
                'strikethrough',
                'subscript',
                'superscript',
                'code',
                '|',
                'link',
                'uploadImage',
                'blockQuote',
                'codeBlock',
                '|',
                'alignment',
                '|',
                'bulletedList',
                'numberedList',
                'todoList',
                'outdent',
                'indent',
            ],
            shouldNotGroupWhenFull: true,
        };
        return toolbar;
    }

    async ngOnInit() {
        await this.service
            .getDanhSachNhanCaNhan(this.timKiemDanhSach)
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
        this.service.getDanhSachDonVi().then((data) => {
            this.lstDonVi = data;
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
    // this.quanLyThongBao.noiDung = this.myEditor.editorInstance.getData();
    public ChangeDonVi(event): void {
        this.lstNhomNguoiDung = [];
        if (event != null) {
            this.service.getDanhSachPhongBan(event).then((data) => {
                this.lstPhongBan = data;
                console.log(this.lstPhongBan)
            });
        }
    }

    public ChangePhongBan(event): void {
        if (event != null) {
            this.service.getDanhSachUserThuocPhongBan(event).then((data) => {
              this.lstUserGui = data;
            });
            setTimeout(() => {
                this.idSelected = event;
            this.loai = 0;
            this.hienThiChonNguoiDung = true;
            },500)
          } else {
            this.lstUserGui = []; // Xóa danh sách người dùng nếu không có giá trị được chọn
          }
    }


    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'C') this.hienThiChonNguoiDung = false;
    }


    public ChangeNhomNguoiDung(event): void {}
}

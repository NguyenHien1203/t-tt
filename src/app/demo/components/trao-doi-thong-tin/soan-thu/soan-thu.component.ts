import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { SoanThuService } from 'src/app/demo/service/trao-doi-thong-tin/soan-thu.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment.development';

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
        private route: ActivatedRoute
    ) {}

    editConTent: string = '';
    tieuDe: string = '';
    traoDoiId: string = '1';
    type: string = '0';
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
        try {
            const data = await this.service.getMenuNhanCaNhan(
                Number(this.authService.GetmUserInfo()?.userId ?? '0')
            );

            this.lstNhanCaNhan = this.BindRouterLinkForTree(data);

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
            this.XuLySoanThu();
        } catch (error) {
            console.log(error);
        }
    }

    onReady($event) {
        let urlSave = '/TraoDoiThongTin/SoanThu/UpLoadImageCkeditor';
        $event.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader, urlSave);
        };
    }

    public BindRouterLinkForTree(treeData: any[]) {
        for (const node of treeData) {
            node.routerLink = [
                '/trao-doi-thong-tin/hop-thu-ca-nhan',
                { ncn: node.id },
            ];
            if (node.items && node.items.length > 0) {
                this.BindRouterLinkForTree(node.items);
            } else {
                node.items = null;
            }
        }
        return treeData;
    }

    public XuLySoanThu(): void {
        this.route.params.subscribe((params) => {
            this.type = params['type'];
            this.traoDoiId = params['traoDoiId'];
            if (this.type !== undefined && this.traoDoiId !== undefined) {
                this.service
                    .getChiTietHopThuById(this.traoDoiId, this.idUser)
                    .then((data) => {
                        if (data != null) {
                            let itemData = data.objHopThu;
                            this.selectedFiles = data.lstFile.map((file) => {
                                return {
                                    ...file,
                                    isDelete: false,
                                    isNew: true,
                                };
                            }); //bind file
                            if (itemData != null) {
                                console.log(itemData);

                                if (this.type == LoaiHinhTraoDoi.Reply) {
                                    this.tieuDe = 'Reply: ' + itemData.tieuDe;
                                    this.lstSelectedNguoiDung = this.lstNguoiDungFilter
                                        .filter(
                                            (dt) =>
                                                dt.id == itemData?.nguoiGuiId
                                        )
                                        .map((dt) => {
                                            return { text: dt.userName };
                                        });
                                }

                                if (this.type == LoaiHinhTraoDoi.Forward) {
                                    this.tieuDe = 'Forward: ' + itemData.tieuDe;
                                    this.editConTent = itemData.noiDung;
                                }

                                if (this.type == LoaiHinhTraoDoi.SendDraf) {
                                    this.tieuDe = itemData.tieuDe;
                                    this.lstSelectedNguoiDung = (
                                        itemData.usersTraoDoi as string
                                    )
                                        .split(',')
                                        .filter((us) => us !== '')
                                        .map((us) => {
                                            return { text: us };
                                        });

                                    this.editConTent = itemData.noiDung;
                                }
                            }
                        }
                    });
            }
        });
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
            event.target.value = '';
            let urlSave = '/TraoDoiThongTin/SoanThu/UploadFile';
            this.uploadfileService.uploadFiles(FileInput, urlSave).subscribe({
                next: (data) => {
                    if (data.isError)
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: data.title,
                        });
                    else {
                        this.file = FileInput;
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

    public DownloadFile(filepath: string, filename: string) {
        let urlDownLoad = '/TraoDoiThongTin/SoanThu/DownloadFile';
        this.uploadfileService
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

    public ChangeDonVi(event): void {
        this.lstNhomNguoiDung = [];
        if (event != null) {
            this.service.getDanhSachPhongBan(event).then((data) => {
                this.lstPhongBan = data;
            });
        }
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'C') {
            this.hienThiChonNguoiDung = false;
            this.phongBanId = null;
            this.nhomNguoiDungId = null;
        }
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
            return;
        }

        if (this.tieuDe === '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Yêu cầu nhập tiêu đề',
            });
            return;
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

    public ResetForm() {
        this.donViId = null;
        this.phongBanId = null;
        this.nhomNguoiDungId = null;
        this.tieuDe = null;
        this.editConTent = '';
        this.lstSelectedNguoiDung = [];
        this.selectedFiles = [];
    }
}

export class MyUploadAdapter {
    xhr: any;
    loader: any;
    urlSave: any;

    constructor(loader, urlSave?) {
        // The file loader instance to use during the upload.
        this.loader = loader;
        this.urlSave = urlSave;
    }

    upload() {
        return this.loader.file.then(
            (file) =>
                new Promise((resolve, reject) => {
                    this._initRequest();

                    this._initListeners(resolve, reject, file);

                    this._sendRequest(file);
                })
        );
    }

    // Aborts the upload process.
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    _initRequest() {
        const xhr = (this.xhr = new XMLHttpRequest());
        xhr.open('POST', environment.baseUrlApi + this.urlSave, true);

        xhr.responseType = 'json';
    }

    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${file.name}.`;
        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;
            if (!response || response.error) {
                return reject(
                    response && response.error
                        ? response.error.message
                        : genericErrorText
                );
            }

            resolve({
                default: response.url,
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', (evt) => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    _sendRequest(file) {
        const data = new FormData();
        data.append('upload', file);
        this.xhr.send(data);
    }
}

const LoaiHinhTraoDoi = {
    Reply: '1',
    Forward: '2',
    SendDraf: '3',
};

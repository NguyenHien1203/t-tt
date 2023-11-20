import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { TheoDoiVanBanDiService } from 'src/app/demo/service/van-ban-di/theo-doi-van-ban-di.service';
import {saveAs} from 'file-saver';
import { throwError } from 'rxjs';

@Component({
    selector: 'app-bao-cao',
    templateUrl: './bao-cao.component.html',
    styleUrls: ['./bao-cao.component.scss'],
    providers: [MessageService],
})
export class BaoCaoComponent implements OnInit {
    constructor(
        private service: TheoDoiVanBanDiService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private messageService: MessageService,
        private uploadFileService : UploadFileService
    ) {}

    hienThiCapNhatKetQua: boolean = false;
    hienThiGuiCanhBao: boolean = false;
    countBaoCao: number = 0;
    countDaBaoCao: number = 0;
    lstFile: any[] = [];
    ThongTinFile: any[] = [];
    loading: boolean = false;
    lstBaoCao: any[] = [];
    items = [
        { label: 'Văn bản đi' },
        { label: 'Theo dõi văn bản đi' },
        { label: 'Báo cáo' },
    ];
    home = { icon: 'pi pi-home', routerLink: '/' };
    id: string = '1';
    idDonVi: string = '0';
    loaiBaoCao: number = 0;
    nhanId: string = '0';
    ThongTinVanBan: any[] = [];
    lstBaoCaoVanBanDi: any[] = [];
    fullName = this.authService.GetmUserInfo()?.fullName;

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            if (params['id'] != undefined) {
                this.id = params['id'];
            }
        });

        this.service.getVanBanById(this.id).then(
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

        this.service.getDanhSachBaoCaoVanBanDi(this.id).then((data) => {
            if (data != null) {
                this.lstBaoCaoVanBanDi = data;
                this.lstBaoCaoVanBanDi.forEach((element) => {
                    element.lstFile =
                        element.lstFile != null
                            ? JSON.parse(element.lstFile)
                            : null;
                });
            }
        });

        this.service.getDonViDaBaoCao(this.id).then((data) => {
            if (data != null) {
                this.countBaoCao = data.countDaBaoCao;
                this.countDaBaoCao = data.countDaBaoCao;
            }
        });
    }

    public LoadDanhSach() {
        this.route.queryParams.subscribe((params) => {
            if (params['id'] != undefined) {
                this.id = params['id'];
            }
        });
        this.service.getDanhSachBaoCaoVanBanDi(this.id).then((data) => {
            if (data != null) {
                this.lstBaoCaoVanBanDi = data;
                this.lstBaoCaoVanBanDi.forEach((element) => {
                    element.lstFile =
                        element.lstFile != null
                            ? JSON.parse(element.lstFile)
                            : null;
                });
            }
        });
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

    public CapNhatBaoCao(nhanId: string, loaiBaoCao: number): void {
        this.loaiBaoCao = loaiBaoCao;
        this.nhanId = nhanId;
        this.hienThiCapNhatKetQua = true;
    }

    public GuiCanhBao(id: string, idDonVi: string): void {
        this.idDonVi = idDonVi;
        this.id = id;
        this.hienThiGuiCanhBao = true;
    }

    public ThoatBaoCao(itemHt: any, loai: string): void {
        if (loai === 'C') this.hienThiCapNhatKetQua = false;
        if (loai === 'G') this.hienThiGuiCanhBao = false;
        this.LoadDanhSach();
    }

    public QuayLai() {
        // window.history.back();
        this.router.navigate(['/van-ban-di/theo-doi-van-ban-di']);
    }
}

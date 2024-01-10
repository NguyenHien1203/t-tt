import { saveAs } from 'file-saver';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { ChiTietVanBanService } from '../../service/chi-tiet-van-ban.service';
import { isThisSecond } from 'date-fns';
import { UploadFileService } from '../../service/upload-file.service';
import { throwError } from 'rxjs';
import { SuaButPheVanBanService } from '../../service/van-ban-den/sua-but-phe-van-ban/sua-but-phe-van-ban.service';

@Component({
    selector: 'app-chi-tiet-van-ban',
    templateUrl: './chi-tiet-van-ban.component.html',
    styleUrls: ['./chi-tiet-van-ban.component.scss'],
})
export class ChiTietVanBanComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() id: string = '';

    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    idNhomQuyen: string = this.authService.GetmUserInfo()?.nhomQuyenId ?? '0';
    objVanBan: any;
    objVanBanNhanGui: any;
    countVanBanDaGui: number = 0;
    countVanBanPhaiBaoCao: number = 0;
    countPhanPhoiCaNhan: number = 0;
    countPhanPhoiDonVi: number = 0;
    lstFileVanBan: any[] = [];
    lstFileKySo: any[] = [];
    lstVanBanDaGui: any[] = [];
    lstVanBanDaPhanPhoiCaNhan: any[] = [];
    lstVanBanDaPhanPhoiDonVi: any[] = [];
    lstVanBanLienQuan: any[] = [];
    checkPhanPhoi: boolean = false;
    ThongTinCongViec: any[] = [];

    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private service: ChiTietVanBanService,
        private fileService: UploadFileService,
        private serviceSuaButPhe: SuaButPheVanBanService,
    ) { }

    public async BindDialogData(): Promise<void> {
        try {
            const data = await this.service.getVanBanById(this.id);
            this.objVanBan = data?.objVanBan;
            this.lstFileVanBan = data?.lstFileVanBan;
            this.lstFileKySo = data?.lstFileKySo;
            this.objVanBanNhanGui =
                await this.service.getVanBanNhanGuiByVanBanId(
                    this.id,
                    this.idDonViLamViec
                );

            const dataVanBanDaGui = await this.service.getDanhSachVanBanDaGui(
                this.id
            );
            this.lstVanBanDaGui = dataVanBanDaGui?.lstVanBanDaGui;
            this.countVanBanDaGui = dataVanBanDaGui?.countVanBanDaGui;
            this.countVanBanPhaiBaoCao = dataVanBanDaGui?.countVanBanPhaiBaoCao;
            this.lstVanBanDaPhanPhoiCaNhan =
                await this.service.getDanhSachVanBanPhanPhoiCaNhan(
                    this.id,
                    this.idDonViLamViec
                );
            this.countPhanPhoiCaNhan = this.lstVanBanDaPhanPhoiCaNhan.length;
            this.lstVanBanDaPhanPhoiDonVi =
                await this.service.getDanhSachVanBanPhanPhoiDonVi(
                    this.id,
                    this.idDonViLamViec
                );
            this.countPhanPhoiDonVi = this.lstVanBanDaPhanPhoiDonVi.length;
            this.checkPhanPhoi = await this.service.GetKiemTraPhanPhoi(
                this.id,
                this.idDonViLamViec,
                this.idUser,
                this.idNhomQuyen,
                this.idPhongBan
            );
            this.lstVanBanLienQuan =
                await this.service.GetDanhSachVanBanLienQuan(
                    this.id,
                    this.idDonViLamViec
                );

            this.LoadDataDefault();
        } catch (error) { }
    }

    Thoat() {
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public DownloadFile(filepath: string, filename: string, loai) {
        let urlDownLoad =
            loai == 1
                ? '/VanBanDi/CapNhatMoi/DownloadFile'
                : '/VanBanDen/CapNhatMoiVanBanDen/DownloadFile';
        this.fileService
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


    public LoadDataDefault() {
        this.serviceSuaButPhe.LoadDataDefault(this.id).subscribe(data => {
            if (data.isError) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
            } else {
                this.ThongTinCongViec = data.objData;
            }
        }, (error) => {

        })
    }

    public GetDataParent(): any[] {
        return this.ThongTinCongViec.filter(s => s.idParent === "" || s.idParent === null);
    }

    /**
     * name
     */
    public GetDataChild(parentItem: any): any[] {
        return this.ThongTinCongViec.filter(s => s.idParent !== "" && s.idParent === parentItem.idChild);
    }
}

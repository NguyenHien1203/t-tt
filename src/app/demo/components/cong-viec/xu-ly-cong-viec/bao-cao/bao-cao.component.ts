import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { XuLyCongViecService } from 'src/app/demo/service/cong-viec/xu-ly-cong-viec.service';
import {
    ThongTinNguoiXuLy,
    XuLyCongViec,
} from 'src/app/models/cong-viec/xu-ly-cong-viec';

import { saveAs } from 'file-saver';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-den/cap-nhat-moi/cap-nhat-moi.service';

@Component({
    selector: 'app-bao-cao',
    templateUrl: './bao-cao.component.html',
    styleUrls: ['./bao-cao.component.scss'],
})
export class BaoCaoComponent {
    @Input() id: string = '1';
    @Input() cap: string = '1';
    @Input() loai: string = '1';
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private service: XuLyCongViecService,
        private messageService: MessageService,
        private authService: AuthService,
        private fileService: UploadFileService,
        private capnhatmoiService: CapNhatMoiService,
    ) { }

    hienThiChonVanBan: boolean = false;
    baoCaoTienDos: XuLyCongViec = {
        soKiHieu: '',
        trichYeu: '',
        noiDungCongViec: '',
        nguoiXuLy: '',
        tuNgay: new Date(),
        denNgay: new Date(),
        thoiHanHoanThanh: new Date(),
        trangThaiDeXuat: '',
        chiDao: '',
        chuTri: '',
        lstDongChiPhoiHop: [],
        lstDongChiThongBao: [],
        countDongChiThongBao: 0,
        countDongChiPhoiHop: 0,
        ngayXuLy: new Date(),
        noiDungXuLy: '',
        trangThaiXuLy: '',
        fileDinhKem: '',
        lstVanBanBaoCao: ''
    };

    lstVanBan: any[] = [];
    file: File | null = null; // Variable to store file
    selectedFiles: any[] = [];
    file_fomat: any[] = [];
    loading: boolean = true;
    submitted: boolean = false;
    lstHoSoCongViec: any[] = [];
    lstTrangThai: any[] = [
        { text: 'Đang xử lý', value: 2 },
        { text: 'Xử lý xong', value: 3 },
    ];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';

    ngOnInit() {
        this.loading = false;
    }

    public ThoatChonVanBan(itemHt: any, loai: string): void {
        if (loai === 'C') this.hienThiChonVanBan = false;
    }

    public ChonVanBan() {
        this.hienThiChonVanBan = true;
    }

    public async BindDialogData() {
        try {
            const data = await this.service.getDataBaoCaoTienDo(
                this.id,
                this.cap,
                this.loai
            );
console.log(data)
            this.baoCaoTienDos = data;
            // this.baoCaoTienDos.thoiHanHoanThanh = new Date(this.baoCaoTienDos.thoiHanHoanThanh);

            // this.file_fomat = data.fileDinhKem;
            // this.selectedFiles = this.file_fomat;
            // if (this.baoCaoTienDos.ngayXuLy === null)
            //     this.baoCaoTienDos.ngayXuLy = new Date();
            // else
            //     this.baoCaoTienDos.ngayXuLy = new Date(data.ngayXuLy);
            // this.baoCaoTienDos.trangThaiXuLy = data.trangThaiXuLy
            // this.lstVanBan = data.lstVanBan;
        } catch (error) {
            console.log(error);
        }
    }

    public ChangeHoSoCongViec(event) { }

    public Thoat(): void {
        this.lstHoSoCongViec = [];
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }


    public UpdateNgayHt() {
        const formattedDate = this.baoCaoTienDos.thoiHanHoanThanh.toLocaleDateString('en-GB');

        this.service.UpdateNgayHt(this.id, formattedDate).subscribe(data => {
            if (data.isError) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
            } else {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
                setTimeout(() => {
                    this.Thoat();
                }, 1000);
            }
        }, (error) => {
            console.log('Error', error);
        })
    }

    public onFileSelected(event: any) {
        const FileInput: File = event.target.files[0];

        if (FileInput) {
            this.file = FileInput;
            this.fileService.uploadMutipleFile_XLCV(this.file).subscribe({
                next: (data) => {
                    if (data.isError)
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Tải lên thất bại' });
                    else {
                        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Tải lên thành công' });
                        const fileReturn = {
                            name: data.objData.fileName,
                            path: data.objData.filePath,

                        };

                        this.file_fomat.push(fileReturn);

                        this.selectedFiles.push(fileReturn);
                        event.target.value = '';
                    }
                },
                error: (error: any) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });
                    return throwError(() => error);
                },
            });;
        }
    }

    public DownloadFile(filepath: string, filename: string) {
        let urlDownLoad = '/CongViec/XuLyCongViec/DownloadFile';
        this.capnhatmoiService
            .downloadFile(filepath, filename, urlDownLoad)
            .subscribe(
                (data) => {
                    const blob = new Blob([data], {
                        type: 'application/octet-stream',
                    });
                    saveAs(blob, filename);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success', detail: 'Tải lên thành công'
                    });
                },
                (error: any) => {
                    if (error.status === 404) {
                        // Xử lý lỗi 404 (NotFound)
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không tìm thấy đường dẫn file' });
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

    public XoaFile(fileName: string): void {
        this.selectedFiles.forEach((obj, index) => {
            if (obj.name === fileName) {
                this.selectedFiles.splice(index, 1); // Xóa đối tượng thỏa mãn điều kiện
            }
        });
    }

    public CapNhatTienDo() {

        this.submitted = true;
        this.baoCaoTienDos.fileDinhKem = JSON.stringify(this.file_fomat);
        this.baoCaoTienDos.lstVanBanBaoCao = JSON.stringify(this.lstVanBan);
        let itemData = {
            cap: this.cap,
            loai: this.loai.toString(),
            idCongViec: this.id.toString(),
            idDonViLamViec: this.authService.GetDonViLamViec().toString(),
            idNhomQuyenLamViec: this.authService.GetmUserInfo().nhomQuyenId.toString(),
            idUser: this.authService.GetmUserInfo().userId.toString(),
            idDonVi: this.authService.GetmUserInfo().donViId.toString(),
            noiDung: this.baoCaoTienDos.noiDungXuLy,
            ngayXuLy: this.formatDateToDDMMYY(new Date(this.baoCaoTienDos.ngayXuLy)),
            trangThai: this.baoCaoTienDos.trangThaiXuLy.toString(),
            fileDinhKem: this.baoCaoTienDos.fileDinhKem,
            lstVanBanChon: this.baoCaoTienDos.lstVanBanBaoCao
        }
        this.service.ThemMoiTienDoCongViec(itemData).subscribe(data => {
            if (data.isError) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
            } else {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
                setTimeout(() => {
                    this.Thoat();
                }, 1000);
            }
        }, (error) => {
            console.log('Error', error);
        })
    }

    formatDateToDDMMYY(date): string {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear().toString();
        return day + '/' + month + '/' + year;
    }

    public chonVanBan(itemHt: any[]) {
        for (let item of itemHt) {
            let vanban = {
                id: item.id,
                soKiHieu: item.soKiHieu,
                trichYeu: item.trichYeu
            }
            if (this.lstVanBan.length > 0) {
                let doesObjectExist = this.lstVanBan.some(obj => obj.id === vanban.id);
                if (doesObjectExist === false)
                    this.lstVanBan.push(vanban);

            } else
                this.lstVanBan.push(vanban);
        }
    }

    public XoaVanBan(vanban: any) {
        this.lstVanBan.forEach((obj, index) => {
            if (obj.id === vanban.id) {
                this.lstVanBan.splice(index, 1);
            }
        });
    }
}

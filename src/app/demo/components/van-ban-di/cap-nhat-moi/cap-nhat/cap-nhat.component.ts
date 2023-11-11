import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-di/cap-nhat-moi.service';
import { saveAs } from 'file-saver';

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
        private service: CapNhatMoiService,
        private fileService: UploadFileService,
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService
    ) {}
    items: any[] = [
        { label: 'Văn bản đi' },
        { label: 'Cập nhật mới' },
        { label: 'Thêm mới văn bản' },
    ];
    home: any = { icon: 'pi pi-home', routerLink: '/' };
    loading: boolean = true;
    selectedFiles: File[] = [];
    submitted: boolean = false;
    dataFile: any;
    file_fomat: any = [];
    vanBanDi: any = [];
    file: File | null = null;
    chkLienThong: boolean = false;
    chkHeThong: boolean = false;
    chkNoiBo: boolean = false;
    lstSoVanBan: any[] = [];
    lstLoaiVanBan: any[] = [];
    lstPhongBan: any[] = [];
    lstLanhDaoKy: any[] = [];
    lstMucDoVanBan: any[] = [
        { text: 'VB thường', value: 1 },
        { text: 'VB khẩn, hỏa tốc', value: 2 },
        { text: 'VB mật', value: 3 },
        { text: 'VB tuyệt mật', value: 4 },
        { text: 'VB tối mật', value: 5 },
    ];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    public formThongTinVanBan = this.formBuilder.group({
        id: [0, []],
        soVanBanId: ['', [Validators.required]],
        loaiVanBanId: ['', [Validators.required]],
        soHienTai: ['', [Validators.required]],
        soDi: ['', [Validators.required]],
        soKiHieu: ['', [Validators.required]],
        soBanBanHanh: ['', []],
        ngayBanHanh: [new Date(), [Validators.required]],
        ngayNhanVanBan: [new Date(), [Validators.required]],
        phongBanSoanThaoId: ['', [Validators.required]],
        lanhDaoKyId: ['', [Validators.required]],
        trichYeu: ['', [Validators.required]],
        noiNhanKhac: ['', []],
        mucDoVanBanId: [this.lstMucDoVanBan[0].value, []],
        donViId: ['', []],
        chkVanBanLienThong: [false, []],
        chkVanBanHeThong: [false, []],
        chkVanBanNoiBo: [false, []],
        fileUpLoad: ['', []],
    });

    ngOnInit() {
        this.loading = false;
        this.LoadSoVanBan();
        this.LoadPhongBanSoanThao();
        this.LoadLanhDaoKy();
    }

    public BindDialogData() {
        this.service.GetVanBanById(this.id).subscribe((data) => {
            let itemData = data.objVanBan;
            this.formThongTinVanBan.patchValue({
                id: itemData.id,
                soVanBanId: itemData.soVanBanId,
                loaiVanBanId: itemData.loaiVanBanId,
                soHienTai: itemData.soHienTai,
                soDi: itemData.soDi,
                soKiHieu: itemData.soKiHieu,
                soBanBanHanh: itemData.soBanBanHanh,
                ngayBanHanh: new Date(itemData.ngayBanHanh),
                ngayNhanVanBan: new Date(itemData.ngayNhanVanBan),
                phongBanSoanThaoId: itemData.phongBanSoanThaoId,
                lanhDaoKyId: itemData.lanhDaoKyId,
                trichYeu: itemData.trichYeu,
                noiNhanKhac: itemData.trichYeu,
                mucDoVanBanId: itemData.mucDoVanBanId,
                donViId: itemData.donViId,
                chkVanBanLienThong: itemData.chkVanBanLienThong,
                chkVanBanHeThong: itemData.chkVanBanLienThong,
                chkVanBanNoiBo: itemData.chkVanBanLienThong,
                fileUpLoad: itemData.fileUpLoad,
            });
        });
    }

    public LoadLanhDaoKy() {
        this.service.getDanhSachLanhDaoKy(this.idDonViLamViec).then((data) => {
            this.lstLanhDaoKy = data;
        });
    }

    public LoadPhongBanSoanThao() {
        this.service
            .getDanhSachPhongBan(
                this.idDonViLamViec,
                this.authService.GetmUserInfo()?.userName ?? ''
            )
            .then((data) => {
                this.lstPhongBan = data;
            });
    }

    public LoadSoVanBan() {
        this.service.getSoVanBan(this.idDonViLamViec).then((data) => {
            this.lstSoVanBan = data;
        });
    }

    public Thoat(): void {
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public ChangeSoVanBan(event) {
        this.service
            .getSoHienTai(
                event.toString(),
                this.formThongTinVanBan.value.ngayBanHanh,
                '0',
                this.formThongTinVanBan.value.soDi,
                '0'
            )
            .then((data) => {
                this.formThongTinVanBan.patchValue({
                    soHienTai: data,
                });
            })
            .then(() => {
                this.service
                    .getSoKiHieu(
                        event,
                        '0',
                        this.formThongTinVanBan.value.soHienTai
                    )
                    .then((data) => {
                        this.formThongTinVanBan.patchValue({
                            soKiHieu: data,
                        });
                    });
            });

        this.lstLoaiVanBan = [];
        this.service.changeSoVanBan(event, this.idDonViLamViec).then((data) => {
            this.lstLoaiVanBan = data;
        });
    }

    public ChangeLoaiVanBan(event) {
      if(event != null)
      {
      console.log(this.formThongTinVanBan.value)

        this.service
        .getSoKiHieu(
            this.formThongTinVanBan.value.soVanBanId,
            event,
            this.formThongTinVanBan.value.soHienTai
        )
        .then((data) => {
            this.formThongTinVanBan.patchValue({
                soKiHieu: data,
            });
        });
      }
    }

    public onFileSelected(event: any) {
        const FileInput: File = event.target.files[0];

        if (FileInput) {
            this.file = FileInput;
            let urlSave = '/VanBanDi/CapNhatMoi/UpLoadFile';
            this.fileService.uploadFiles(this.file, urlSave).subscribe({
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
                        };
                        this.file_fomat.push(fileReturn);
                        this.selectedFiles.push(FileInput);
                    }
                },
                error: (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Có lỗi xảy ra',
                    });
                    return throwError(() => error);
                },
            });
        }
    }

    public downloadFile(file: File) {
        this.dataFile = file;
        const blob = new Blob([this.dataFile], {
            type: 'application/octet-stream',
        });
        // Sử dụng saveAs để tải tệp xuống với tên cụ thể.
        saveAs(blob, file.name);
    }

    public XoaFile(fileName: string): void {
        this.selectedFiles.forEach((obj, index) => {
            if (obj.name === fileName) {
                this.selectedFiles.splice(index, 1); // Xóa đối tượng thỏa mãn điều kiện
            }
        });
    }

    public CheckVanBanLienThong(): void {
        this.chkLienThong = !this.chkLienThong;
    }

    public CheckVanBanTrongHeThong(): void {
        this.chkHeThong = !this.chkHeThong;
    }

    public CheckVanBanNoiBo(): void {
        this.chkNoiBo = !this.chkNoiBo;
    }

    public ThemMoi() {
        this.submitted = true;

        if (this.formThongTinVanBan.valid) {
            this.formThongTinVanBan.value.donViId =
                this.authService.GetDonViLamViec();
            this.vanBanDi = this.formThongTinVanBan.value;
            this.vanBanDi.chkVanBanLienThong = this.chkLienThong ? 1 : 0;
            this.vanBanDi.chkVanBanHeThong = this.chkHeThong ? 1 : 0;
            this.vanBanDi.chkVanBanNoiBo = this.chkNoiBo ? 1 : 0;
            this.vanBanDi.fileUpLoad = JSON.stringify(this.file_fomat);
            this.service.themMoiVanBanDi(this.vanBanDi).subscribe(
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
                        setTimeout(() => {
                            this.router.navigate(['/van-ban-di/cap-nhat-moi']);
                        });
                    }
                },
                (error: any) => {
                  this.messageService.add({
                      severity: 'error',
                      summary: 'Error',
                      detail: 'Có lỗi xảy ra',
                  });
                  return throwError(() => error);
              },
            );
        }
    }

    public NhapLai() {
        this.formThongTinVanBan.reset();
        this.submitted = false;
    }

    public ReturnTrangChu() {
        this.router.navigate(['/van-ban-di/cap-nhat-moi']);
    }
}

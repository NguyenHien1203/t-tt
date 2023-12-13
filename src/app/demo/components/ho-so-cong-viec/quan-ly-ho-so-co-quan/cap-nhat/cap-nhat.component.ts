import { saveAs } from 'file-saver';
import { Component } from '@angular/core';
import { format } from 'date-fns';
import { throwError } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { DanhMucHoSoCaNhanService } from 'src/app/demo/service/ho-so-cong-viec/danh-muc-ho-so-ca-nhan.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { QuanLyHoSoCoQuanService } from 'src/app/demo/service/ho-so-cong-viec/quan-ly-ho-so-co-quan.service';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss'],
  providers : [MessageService]
})
export class CapNhatComponent {
  constructor(
    private formBuilder: FormBuilder,
    private service: QuanLyHoSoCoQuanService,
    private danhMucHoSoCaNhanService: DanhMucHoSoCaNhanService,
    private fileService: UploadFileService,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
) {}

items: any[] = [
    { label: 'Hồ sơ công việc' },
    { label: 'Quản lý hồ sơ công việc cá nhân' },
    { label: 'Thêm mới' },
];
home: any = { icon: 'pi pi-home', routerLink: '/' };
loading: boolean = true;
hienThiChonVanBan: boolean = false;
hienThiChonCongViec: boolean = false;
hienThiChonPhieuTrinh: boolean = false;
selectedFiles: any[] = [];
selectedNodes: TreeNode = null;
lstDmHoSo: TreeNode[] = [];
lstLoaiHoSo: any[] = [];
lstVanBanLienQuan: any[] = [];
lstCongViecLienQuan: any[] = [];
lstPhieuTrinhLienQuan: any[] = [];
lstTrangThai: any[] = [
    { text: 'Chưa xử lý', value: 1 },
    { text: 'Đang xử lý', value: 2 },
    { text: 'Xử lý xong', value: 3 },
    { text: 'Quá hạn xử lý', value: 4 },
];
submitted: boolean = false;
idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
userFullName: string = this.authService.GetmUserInfo()?.fullName ?? '0';
phongBanName: string = this.authService.GetmUserInfo()?.tenDonVi ?? '0';
public formCapNhat = this.formBuilder.group({
    id: [0, []],
    danhMucHoSoId: [0, [Validators.required]],
    loaiHoSoId: [, [Validators.required]],
    maHoSo: ['', []],
    tieuDe: ['', [Validators.required]],
    ngayNhap: [new Date(), []],
    thoiHanBaoQuan: ['', []],
    ngayBatDau: [new Date(), []],
    ngayKetThuc: [new Date(), []],
    soKyHieu: ['', [Validators.required]],
    nguoiLap: ['', []],
    dacDiem: ['', []],
    trangThai: [1, []],
    ghiChu: ['', []],
    tongSoVanBan: ['', [Validators.required]],
    tongSoTrang: ['', [Validators.required]],
    lstFile: [, []],
});

ngOnInit() {
    this.loading = false;
    this.BindData();
}

async BindData() {
    try {
        await this.LoadDanhMuc();
        this.route.queryParams.subscribe(async (params) => {
            let id = params['id'];

            const data = await this.service.getHoSoCoQuanId(id);
            this.selectedNodes = this.findNodeByData(
                this.lstDmHoSo,
                data.danhMucHoSoId
            );
            
            this.formCapNhat.patchValue({
                id: data.id,
                loaiHoSoId: data.loaiHoSoId,
                maHoSo: data.maHoSo,
                tieuDe: data.tieuDe,
                ngayNhap: new Date(data.ngayNhap),
                thoiHanBaoQuan: data.thoiHanBaoQuan,
                ngayBatDau: new Date(data.ngayBatDau),
                nguoiLap: data.tenNguoiLap,
                soKyHieu: data.soKyHieu,
                dacDiem: data.dacDiem,
                trangThai: data.trangThai,
                ghiChu: data.ghiChu,
                tongSoVanBan: data.tongSoVanBan,
                tongSoTrang: data.tongSoTrang,
            });

            this.selectedFiles = data.lstFile.map((dt) => {
                return { ...dt, isNew: false, isDelete: false };
            });
            this.lstVanBanLienQuan = data.lstVanBanDinhKem;
            this.lstCongViecLienQuan = data.lstCongViecDinhKem;
            this.lstPhieuTrinhLienQuan = data.lstPhieuTrinhDinhKem;

            this.ChangeThoiHanBaoQuan();
        });
    } catch (error) {
        console.log(error);
    }
}

async LoadDanhMuc() {
    try {
        const danhMucData =
            await this.danhMucHoSoCaNhanService.getDanhSachDanhMucHoSoCaNhan(
                this.idUser
            );
        if (danhMucData.isError) {
            this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: danhMucData.title,
            });
        } else {
            this.lstDmHoSo = danhMucData;
        }

        const loaiHoSoData = await this.service.getDanhSachLoaiHoSo(
            this.idDonViLamViec
        );
        this.lstLoaiHoSo = loaiHoSoData;
    } catch (error) {
        console.log(error);
    }
}

public ChangeThoiHanBaoQuan() {
    this.service
        .getNgayKetThucHoSo(
            this.formCapNhat.value.thoiHanBaoQuan,
            format(this.formCapNhat.value.ngayBatDau, 'dd/MM/yyyy')
        )
        .then((data) => {
            this.formCapNhat.patchValue({
                ngayKetThuc: new Date(data),
            });
        });
}

public ChangeSoKyHieu() {
    this.service
        .getMaHoSoCoQuan(
            this.formCapNhat.value.soKyHieu,
            this.idDonViLamViec
        )
        .then((data) => {
            console.log(data);
            this.formCapNhat.patchValue({
                maHoSo: data,
            });
        });
}

public onFileSelected(event: any) {
    const FileInput: File = event.target.files[0];

    if (FileInput) {
        event.target.value = '';
        let urlSave = '/HoSoCongViec/QuanLyHoSoCaNhan/UpLoadFile';
        this.fileService.uploadFiles(FileInput, urlSave).subscribe({
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
                        isNew: true,
                        isDelete: false,
                        fileName: data.objData.fileName,
                        filePath: data.objData.filePath,
                    };
                    this.selectedFiles.push(fileReturn);
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

public DownloadFile(filepath: string, filename: string) {
    let urlDownLoad = '/HoSoCongViec/QuanLyHoSoCaNhan/UpLoadFile';
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

public XoaFile(filePath: string): void {
    this.selectedFiles.forEach((obj, index) => {
        if (obj.filePath === filePath) {
            obj.isDelete = true;
        }
    });
}

public GanVanBan(): void {
    this.hienThiChonVanBan = true;
}

public GanCongViec(): void {
    this.hienThiChonCongViec = true;
}

public GanPhieuTrinh(): void {
    this.hienThiChonPhieuTrinh = true;
}

public ThemMoi() {
    this.submitted = true;

    if (this.formCapNhat.valid) {
        let itemData = this.formCapNhat.value;
        let hoSoCongViecCaNhan = {
            id: itemData.id,
            danhMucHoSoId: this.selectedNodes.data,
            loaiHoSoId: itemData.loaiHoSoId,
            maHoSo: itemData.maHoSo,
            tieuDe: itemData.tieuDe,
            ngayNhap: format(itemData.ngayNhap, 'dd/MM/yyyy'),
            thoiHanBaoQuan: itemData.thoiHanBaoQuan?.toString(),
            ngayBatDau: format(itemData.ngayBatDau, 'dd/MM/yyyy'),
            ngayKetThuc: format(itemData.ngayKetThuc, 'dd/MM/yyyy'),
            soKyHieu: itemData.soKyHieu,
            nguoiLap: this.idUser,
            donViId: this.idDonViLamViec,
            phongBanId: this.idPhongBan,
            dacDiem: itemData.dacDiem,
            trangThai: itemData.trangThai,
            ghiChu: itemData.ghiChu,
            tongSoVanBan: itemData.tongSoVanBan,
            tongSoTrang: itemData.tongSoTrang,
            lstFile: this.selectedFiles,
            lstVanBanDinhKem: this.lstVanBanLienQuan.map(data => data.id),
            lstCongViecDinhKem: this.lstCongViecLienQuan.map(data => data.id),
            lstPhieuTrinhDinhKem: this.lstPhieuTrinhLienQuan.map(data => data.id),
        };

        this.service.capNhatHoSoCoQuan(hoSoCongViecCaNhan).subscribe(
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
                        this.ReturnTrangChu();
                    });
                }
            },
            (error) => {
                console.log('Error', error);
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

public Thoat(itemHt: any, loai: string): void {
    if (loai == 'VB') this.hienThiChonVanBan = false;
    if (loai == 'CV') this.hienThiChonCongViec = false;
    if (loai == 'PT') this.hienThiChonPhieuTrinh = false;
}

public NhapLai() {
    this.formCapNhat.reset();
    this.submitted = false;
}

public ReturnTrangChu() {
    this.router.navigate(['/ho-so-cong-viec/quan-ly-ho-so-ca-nhan']);
}

public ChonPhieuTrinh(event): void {
    this.lstPhieuTrinhLienQuan = this.RemoveDuplicates(this.lstPhieuTrinhLienQuan.concat(event), 'id');
}

public ChonVanBan(event): void {
    this.lstVanBanLienQuan = this.RemoveDuplicates(this.lstVanBanLienQuan.concat(event), 'id');
}

public ChonCongViec(event): void {
    this.lstCongViecLienQuan = this.RemoveDuplicates(this.lstCongViecLienQuan.concat(event), 'id');
}

public XoaCongViec(id): void {
    this.lstCongViecLienQuan = this.lstCongViecLienQuan.filter(
        (data) => data.id != id
    );
}

public XoaPhieuTrinh(id): void {
    this.lstPhieuTrinhLienQuan = this.lstPhieuTrinhLienQuan.filter(
        (data) => data.id != id
    );
}

public XoaVanBan(id): void {
    this.lstVanBanLienQuan = this.lstVanBanLienQuan.filter(
        (data) => data.id != id
    );
}

RemoveDuplicates(arr, prop) {
    const uniqueSet = new Set(arr.map((item) => item[prop]));
    return Array.from(uniqueSet).map((uniqueProp) =>
        arr.find((item) => item[prop] === uniqueProp)
    );
}
}

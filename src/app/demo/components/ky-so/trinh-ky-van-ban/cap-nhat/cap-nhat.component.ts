import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TrinhKyVanBanService } from 'src/app/demo/service/ky-so/trinh-ky-van-ban/trinh-ky-van-ban.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss']
})
export class CapNhatComponent implements OnInit {

  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Input() id: string;

  public formCapNhat = this.formBuilder.group({
    id: [0, []],
    trichYeu: ['', [Validators.required]],
    cauHinhLuongKySoId: [0],
    loaiVanBanId: [[Validators.required]],
    vanBanTraLoiId: [0],
    mucDoVanBanId: [[Validators.required]],
    lanhDaoKyId: ["", [Validators.required]],
    nguoiNhanKyId: [0],
    fileUploadChinh: ["", []],
    fileUploadPhu: ["", []],
    duyetKy: ["1"],
    donViId: [],
    phongBanSoanId: [],
    soanThaoId: [],
    phongBanId: [],
    donViLamViecId: [],
    nhomQuyenId: [],
  });

  donViId = this.authService.GetmUserInfo().donViId;
  submitted = false;

  lstLuongKySo: any[] = [];
  lstLoaiVanBan: any[] = [];
  lstVanBanTraLoi: any[] = [];
  lstLanhDaoKy: any[] = [];
  lstNguoiNhan: any[] = [];
  lstMucDo: any[] = [];

  chinhFiles: File[] = [];
  dataFileChinh: any;
  fileChinh: File | null = null;
  fileFormatChinh: any = [];

  phuFiles: File[] = [];
  dataFilePhu: any;
  filePhu: File | null = null;
  fileFormatPhu: any = [];

  valueForm: any;

  hienThiForm: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private trinhKyVanBanService: TrinhKyVanBanService,
    private fileService: UploadFileService,
  ) { }

  ngOnInit(): void {
    this.GetLuongKySo();
    this.GetLoaiVanBan();
    this.GetVanBanTraLoi();
    this.GetLanhDaoKy();
    this.GetNguoiNhan();
    this.GetMucDoVanBan();
  }

  GetLuongKySo() {
    this.trinhKyVanBanService.danhSachLuongKySo(this.donViId).subscribe(data => {
      this.lstLuongKySo = data;
    })
  }

  GetLoaiVanBan() {
    this.trinhKyVanBanService.danhSachLoaiVanBan(this.donViId).subscribe(data => {
      this.lstLoaiVanBan = data;
    })
  }

  GetVanBanTraLoi() {
    this.trinhKyVanBanService.danhSachVanBanTraLoi(this.donViId).subscribe(data => {
      this.lstVanBanTraLoi = data;
    })
  }

  GetLanhDaoKy() {
    this.trinhKyVanBanService.danhSachLanhDaoKy(this.donViId).subscribe(data => {
      this.lstLanhDaoKy = data;
    })
  }

  GetNguoiNhan() {
    this.trinhKyVanBanService.danhSachNguoiNhan(this.donViId).subscribe(data => {
      this.lstNguoiNhan = data;
    })
  }

  GetMucDoVanBan() {
    this.lstMucDo.push({ text: "-- Chọn mức độ văn bản --", value: 0 });
    this.lstMucDo.push({ text: "VB thường", value: 1 });
    this.lstMucDo.push({ text: "VB khẩn, hỏa tốc", value: 2 });
    this.lstMucDo.push({ text: "VB mật", value: 3 });
    this.lstMucDo.push({ text: "VB tuyệt mật", value: 4 });
    this.lstMucDo.push({ text: "VB tối mật", value: 5 });
  }

  public onFileChinhSelected(event: any) {
    const FileInput: File = event.target.files[0];

    if (FileInput) {
      this.fileChinh = FileInput;
      let url = '/KySo/TrinhKyVanBan/UploadMultipleFile';
      this.fileService.uploadMultipleFiles(this.fileChinh, url).subscribe({
        next: (data) => {
          if (data.isError)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Tải lên thất bại', life: 3000 });
          else {
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Tải lên thành công', life: 3000 });
            const fileReturn = {
              name: data.objData.fileName,
              path: data.objData.filePath,
            }
            this.fileFormatChinh.push(fileReturn);
            this.chinhFiles.push(FileInput);
            event.target.value = '';
          }
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra', life: 3000 });
          return throwError(() => error);
        },
      });;
    }
  }

  public downloadFileChinh(file: File) {
    this.dataFileChinh = file;
    const blob = new Blob([this.dataFileChinh], { type: 'application/octet-stream' });
    saveAs(blob, file.name);
  }

  public XoaFileChinh(fileName: string): void {
    this.chinhFiles.forEach((obj, index) => {
      if (obj.name === fileName) {
        this.chinhFiles.splice(index, 1);
      }
    });
  }

  public onFilePhuSelected(event: any) {
    console.log("Phu");

    const FileInput: File = event.target.files[0];

    if (FileInput) {
      this.filePhu = FileInput;
      let url = '/KySo/TrinhKyVanBan/UploadMultipleFile';
      this.fileService.uploadMultipleFiles(this.filePhu, url).subscribe({
        next: (data) => {
          if (data.isError)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Tải lên thất bại', life: 3000 });
          else {
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Tải lên thành công', life: 3000 });
            const fileReturn = {
              name: data.objData.fileName,
              path: data.objData.filePath,
            }
            this.fileFormatPhu.push(fileReturn);
            this.phuFiles.push(FileInput);
            event.target.value = '';
          }
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra', life: 3000 });
          return throwError(() => error);
        },
      });;
    }
  }

  public downloadFilePhu(file: File) {
    this.dataFilePhu = file;
    const blob = new Blob([this.dataFilePhu], { type: 'application/octet-stream' });
    saveAs(blob, file.name);
  }

  public XoaFilePhu(fileName: string): void {
    this.phuFiles.forEach((obj, index) => {
      if (obj.name === fileName) {
        this.phuFiles.splice(index, 1);
      }
    });
  }

  onChangeLuongKySo(event: any) {
    if (event > 0) {
      this.hienThiForm = false;
      this.formCapNhat.patchValue({
        lanhDaoKyId: "",
        nguoiNhanKyId: 0
      });
    } else {
      this.hienThiForm = true;
    }
  }

  TatPopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
    this.formCapNhat.reset();
    this.chinhFiles = [];
    this.dataFileChinh = null;
    this.fileChinh = null;
    this.fileFormatChinh = [];

    this.phuFiles = [];
    this.dataFilePhu = null;
    this.filePhu = null;
    this.fileFormatPhu = [];

    this.formCapNhat.patchValue({
      duyetKy: "1",
    })
  }

  GetTrinhKy() {
    this.trinhKyVanBanService.getTrinhKy(this.id).subscribe(data => {
      console.log(data.lstFile);

      data.lstFile.forEach((item, index) => {
        if (item.loai == 1) {
          this.chinhFiles.push(item);
          this.fileFormatChinh.push(item);
        } else if (item.loai == 2) {
          this.phuFiles.push(item);
          this.fileFormatPhu.push(item);
        }
      });

      this.formCapNhat.patchValue({
        trichYeu: data.objTrinhKy.trichYeu,
        duyetKy: data.objTrinhKy.dk,
        cauHinhLuongKySoId: data.objTrinhKy.cauHinhLuongKySoId,
        loaiVanBanId: data.objTrinhKy.loaiVanBanId,
        vanBanTraLoiId: data.objTrinhKy.vanBanTraLoiId,
        mucDoVanBanId: data.objTrinhKy.mucDoId,
        lanhDaoKyId: data.objTrinhKy.lanhDaoKyId,
        nguoiNhanKyId: data.objTrinhKy.nguoiNhanId,
      })
    })
  }

  CapNhat() {
    this.submitted = true;
    this.valueForm = this.formCapNhat.value;
    this.valueForm.id = this.id;
    this.valueForm.donViId = this.authService.GetmUserInfo().donViId;
    this.valueForm.phongBanSoanId = this.authService.GetmUserInfo().phongBanLamViecId;
    this.valueForm.fileUploadChinh = JSON.stringify(this.fileFormatChinh);
    this.valueForm.fileUploadPhu = JSON.stringify(this.fileFormatPhu);
    this.valueForm.soanThaoId = this.authService.GetmUserInfo().userId;
    this.valueForm.phongBanId = this.authService.GetmUserInfo().phongBanId;
    this.valueForm.donViLamViecId = this.authService.GetDonViLamViec();
    this.valueForm.nhomQuyenId = this.authService.GetmUserInfo().nhomQuyenId;
    this.valueForm.lanhDaoKyId = this.formCapNhat.value.lanhDaoKyId.toString();

    if (this.formCapNhat.valid) {
      this.submitted = true;
      this.trinhKyVanBanService.capNhat(this.formCapNhat.value, this.id).subscribe(
        data => {
          let resData = data;
          if (resData.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resData.title });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: resData.title });
            this.TatPopup();
          }
        });
    }
  }

}

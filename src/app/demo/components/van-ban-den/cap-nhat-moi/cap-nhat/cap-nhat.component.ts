import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-den/cap-nhat-moi/cap-nhat-moi.service';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss']
})
export class CapNhatComponent {
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  @Input() id: string = '1';


  items: any[] = [];
  home: any;
  loading: boolean = true;
  selectedFiles: File[] = [];

  CoQuanBanHanh = [];
  SoVanBan = [];
  LoaiVanBan = [];
  MucDoVanBan: SelectItem[] = [{ label: 'VB thường', value: 1 }, { label: 'VB khẩn, hỏa tốc', value: 2 }, { label: 'VB mật', value: 3 }, { label: 'VB tuyệt mật', value: 4 }, { label: 'VB tối mật', value: 5 }];

  //Khai báo biến tab Thông tin văn bản
  submitted_VB: boolean = false;
  dataFile: any;
  file_fomat: any = [];
  formTT_VB_fomat: any = [];
  file: File | null = null; // Variable to store file
  checkLuuTru: boolean = false;
  checkXemTatCa: boolean = false;

  submitted: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private capnhatmoiService: CapNhatMoiService,
    private fileService: UploadFileService,
    private messageService: MessageService,
    private router: Router,
    private authenService: AuthService
  ) {
  }

  public formThongTinVanBan = this.formBuilder.group({
    coQuanBanHanhId: ["", [Validators.required]],
    soVanBanId: ["", [Validators.required]],
    soKiHieu: ["", [Validators.required]],
    soHienTai: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    soDen: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    ngayBanHanh: [new Date(), [Validators.required]],
    ngayNhanVanBan: [new Date(), [Validators.required]],
    loaiVanBanId: ["", [Validators.required]],
    lanhDaoKy: ["", []],
    trichYeu: ["", []],
    yKienThamMuu: ["", []],
    mucDoVanBanId: ["", [Validators.required]],
    chkLuuTru: [false, []],
    chkXemTatCa: [false, []],
    IdDonViLamViec: ["", []],
    DonViId: ["", []],
    UserId: ["", []],
    fileUpLoad: ["", []],
  });

  /**
   * GetDataCoQuanBanHanh
   */
  public GetDataCoQuanBanHanh() {
    this.capnhatmoiService.GetDataCoQuanBanHanh().subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.CoQuanBanHanh = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  public GetDataSoVanBan() {
    this.capnhatmoiService.GetDataSoVanBan().subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.SoVanBan = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  /**
   * onChange LoaiVanBan
   */
  public onChangeLoaiVanBan(event: any) {
    this.capnhatmoiService.getSoHienTai(event.value.toString(), this.formThongTinVanBan.value.ngayBanHanh, "0", this.formThongTinVanBan.value.soDen, "0").then(data => {
      this.formThongTinVanBan.patchValue({
        soHienTai: data,
      });
    }).then(() => {
      this.capnhatmoiService.getSoKiHieu(event.value, "0", this.formThongTinVanBan.value.soHienTai).then(data => {
        this.formThongTinVanBan.patchValue({
          soKiHieu: data,
        });
      });
    });

    var IdSoVanBan = event.value;
    this.capnhatmoiService.GetDataLoaiVanBanByIdSoVanBan(IdSoVanBan).subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.LoaiVanBan = data.objData;
      }
    })
  }

  public onFileSelected(event: any) {
    const FileInput: File = event.target.files[0];

    if (FileInput) {
      this.file = FileInput;
      this.fileService.uploadMutipleFile(this.file).subscribe({
        next: (data) => {
          if (data.isError)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Tải lên thất bại' });
          else {
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Tải lên thành công' });
            const fileReturn = {
              name: data.objData.fileName,
              path: data.objData.filePath,
            }
            this.file_fomat.push(fileReturn);

            this.selectedFiles.push(FileInput);
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
    let urlDownLoad = '/VanBanDen/CapNhatMoiVanBanDen/DownloadFile';
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

  public CheckLuuTru(): void {
    this.checkLuuTru = !this.checkLuuTru;
  }

  public CheckXemTatCa(): void {
    this.checkXemTatCa = !this.checkXemTatCa;
  }


  public Thoat(): void {
    this.submitted = false;
    this.hienThi = false;
    
    this.tatPopup.emit(this.hienThi);
  }

  ngOnInit() {
    this.loading = false;
    this.GetDataCoQuanBanHanh()
    this.GetDataSoVanBan();

  }

  /**
   * Load khi popub được mở
   */
  public async BindDialogData() {
    try {
      const data = await this.capnhatmoiService.GetVanBanById(this.id);
      let itemData = data.objVanBan;
      this.selectedFiles = data.lstFile;
      this.file_fomat = data.lstFile;

      await this.capnhatmoiService.GetDataLoaiVanBanByIdSoVanBan(itemData.soVbid).subscribe(data => {
        this.LoaiVanBan = data.objData;
      });
      
      this.formThongTinVanBan.patchValue({
        coQuanBanHanhId: itemData.cqbhid,
        soVanBanId: itemData.soVbid,
        soKiHieu: itemData.soKiHieu,
        soHienTai: itemData.soDiDenCustom,
        soDen: itemData.soDiDen,
        ngayBanHanh: new Date(itemData.ngayBanHanh),
        ngayNhanVanBan: new Date(itemData.ngayBanHanh),
        loaiVanBanId: itemData.loaiVanBanId,
        lanhDaoKy: itemData.nguoiKy,
        trichYeu: itemData.trichYeu,
        yKienThamMuu: itemData.ykienXl,
        mucDoVanBanId: itemData.mucDoKhan,
      })

    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Có lỗi xảy ra',
      });
    }
  }

  /**
   * CapNhat
   */
  public CapNhat() {
    this.submitted_VB = true;
    if (this.formThongTinVanBan.valid) {
      this.formThongTinVanBan.value.IdDonViLamViec = this.authenService.GetDonViLamViec();
      this.formThongTinVanBan.value.DonViId = this.authenService.GetmUserInfo().donViId?.toString();
      this.formThongTinVanBan.value.UserId = this.authenService.GetmUserInfo().userId?.toString();

      this.formThongTinVanBan.value.fileUpLoad = JSON.stringify(this.file_fomat);
      this.formTT_VB_fomat = this.formThongTinVanBan.value;
      this.formTT_VB_fomat.id = this.id;
      this.formTT_VB_fomat.chkLuuTru = this.checkLuuTru;
      this.formTT_VB_fomat.chkXemTatCa = this.checkXemTatCa;

      this.capnhatmoiService.CapNhatVanBan(this.formTT_VB_fomat).subscribe(data => {
        if (data.isError) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
          this.Thoat();
        }
      }, (error) => {
        console.log('Error', error);
      })
    }
  }

}

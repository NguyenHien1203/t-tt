import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-den/cap-nhat-moi/cap-nhat-moi.service';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss'],
  providers: [MessageService]
})
export class ThemMoiComponent implements OnInit {
  items: any[] = [];
  home: any;
  loading: boolean = true;
  selectedFiles: File[] = [];
  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Văn bản đến' }, { label: 'Thêm mới văn bản' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    //Load thông tin văn bản
    this.GetDataCoQuanBanHanh();
    this.GetDataSoVanBan();
  }

  constructor(
    private formBuilder: FormBuilder,
    private capnhatmoiService: CapNhatMoiService,
    private fileService: UploadFileService,
    private messageService: MessageService,
    private router: Router,
    private authenService: AuthService
  ) {
  }

  //Khai báo biến tab Thông tin văn bản
  submitted_VB: boolean = false;
  dataFile: any;
  file_fomat: any = [];
  formTT_VB_fomat: any = [];
  file: File | null = null; // Variable to store file
  checkLuuTru: boolean = false;
  checkXemTatCa: boolean = false;
  CoQuanBanHanh = [];
  SoVanBan = [];
  LoaiVanBan = [];
  MucDoVanBan: SelectItem[] = [{ label: 'VB thường', value: 1 }, { label: 'VB khẩn, hỏa tốc', value: 2 }, { label: 'VB mật', value: 3 }, { label: 'VB tuyệt mật', value: 4 }, { label: 'VB tối mật', value: 5 }];

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
    mucDoVanBanId: [this.MucDoVanBan[0].value,[]],
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

  public downloadFile(file: File) {
    console.log(file);
    this.dataFile = file;
    const blob = new Blob([this.dataFile], { type: 'application/octet-stream' });
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

  public CheckLuuTru(): void {
    this.checkLuuTru = !this.checkLuuTru;
  }

  public CheckXemTatCa(): void {
    this.checkXemTatCa = !this.checkXemTatCa;
  }

  public ThemMoi() {
    this.submitted_VB = true;
    if (this.formThongTinVanBan.valid) {
      this.formThongTinVanBan.value.IdDonViLamViec = this.authenService.GetDonViLamViec();
      this.formThongTinVanBan.value.DonViId = this.authenService.GetmUserInfo().donViId?.toString();
      this.formThongTinVanBan.value.UserId = this.authenService.GetmUserInfo().userId?.toString();

      this.formThongTinVanBan.value.fileUpLoad = JSON.stringify(this.file_fomat);
      this.formTT_VB_fomat = this.formThongTinVanBan.value;
      this.formTT_VB_fomat.chkLuuTru = this.checkLuuTru;
      this.formTT_VB_fomat.chkXemTatCa = this.checkXemTatCa;


      console.log(this.formTT_VB_fomat.mucDoVanBanId);
      
      this.capnhatmoiService.ThemMoiVanBan(this.formTT_VB_fomat).subscribe(data => {
        if (data.isError) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
          setTimeout(() => {
            this.router.navigate(['/van-ban-den/cap-nhat-moi']);
          }, 1000);
        }
      }, (error) => {
        console.log('Error', error);
      })
    }
  }

  public NhapLai() {
    this.formThongTinVanBan.reset();
  }

  public ReturnTrangChu() {
    this.router.navigate(['/van-ban-den/cap-nhat-moi']);
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-den/cap-nhat-moi/cap-nhat-moi.service';
import { TiepNhanVanBanService } from 'src/app/demo/service/van-ban-den/tiep-nhan-van-ban/tiep-nhan-van-ban.service';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-tiep-nhan-van-ban',
  templateUrl: './tiep-nhan-van-ban.component.html',
  styleUrls: ['./tiep-nhan-van-ban.component.scss']
})
export class TiepNhanVanBanComponent {
    @Input() hienThi: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() idVb: string = '1';
  
    submitted_VB: boolean = false;
    checkLuuTru: boolean = false;
    checkXemTatCa: boolean = false;
  
    SoVanBan: [];
    LoaiVanBan: [];
    selectedFiles: any[] = [];
    file: File | null = null; // Variable to store file
    file_fomat: any = [];
    formTT_VB_fomat: any = [];
  
    constructor(
      private formBuilder: FormBuilder,
      private service: TiepNhanVanBanService,
      private capnhatmoisv: CapNhatMoiService,
      private fileService: UploadFileService,
      private messageService: MessageService,
      private router: Router,
      private authService: AuthService
    ) {
    }
  
    public formThongTinVanBan = this.formBuilder.group({
      vanBanId: ["", []],
      coQuanBanHanh: ["", []],
      soVanBanId: ["", [Validators.required]],
      soKiHieu: ["", [Validators.required]],
      soHienTai: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
      soDen: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
      ngayBanHanh: [new Date(), [Validators.required]],
      ngayGui: [new Date(), [Validators.required]],
      loaiVanBanId: ["", [Validators.required]],
      lanhDaoKy: ["", []],
      trichYeu: ["", []],
      yKienThamMuu: ["", []],
      mucDoVanBanId: ["", []],
      chkLuuTru: [false, []],
      chkXemTatCa: [false, []],
      IdDonViLamViec: ["", []],
      DonViId: ["", []],
      UserId: ["", []],
      fileUpLoad: ["", []],
    });
  
  
    public Thoat(): void {
      this.submitted_VB = false;
      this.hienThi = false;
      this.formThongTinVanBan.reset();
      this.tatPopup.emit(this.hienThi);
    }
  
    public CheckLuuTru(): void {
      this.checkLuuTru = !this.checkLuuTru;
    }
  
    public CheckXemTatCa(): void {
      this.checkXemTatCa = !this.checkXemTatCa;
      
    }
  
    public DownloadFile(filepath: string, filename: string) {
      let urlDownLoad = '/VanBanDen/CapNhatMoiVanBanDen/DownloadFile';
      this.capnhatmoisv
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
                isNew: true,
                isDelete: false,
              };
              this.selectedFiles.push(fileReturn);
            }
          },
          error: (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });
            return throwError(() => error);
          },
        });;
      }
    }
  
    /**
     * BindDataDialog
     */
    public async BindDataDialog() {
      try {

        const data = await this.service.GetVanBanTiepNhan(this.idVb);

        console.log(data)
        let itemData = data.objVanBan;
       
  
        this.selectedFiles = data.lstFile;
        this.file_fomat = data.lstFile;
  
        await this.GetDataSoVanBan();
  
        await this.capnhatmoisv.GetDataLoaiVanBanByIdSoVanBan(itemData.soVbid).subscribe(data => {

          this.LoaiVanBan = data.objData;
        });
  
        this.formThongTinVanBan.patchValue({
          coQuanBanHanh: itemData.coQuanBH,
          soVanBanId: itemData.soVbid,
          loaiVanBanId: itemData.loaiVanBanId,
          soKiHieu: itemData.soKiHieu,
          ngayBanHanh: new Date(itemData.ngayBanHanh),
          ngayGui: new Date(itemData.ngayNhanGui),
          yKienThamMuu: itemData.ykienXl,
        });
  
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Có lỗi xảy ra',
        });
      }
    }
  
    public GetDataSoVanBan() {
      this.capnhatmoisv.GetDataSoVanBan().subscribe(data => {
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
      this.capnhatmoisv.getSoHienTai(event.value.toString(), this.formThongTinVanBan.value.ngayBanHanh, "0", this.formThongTinVanBan.value.soDen, "0").then(data => {
        this.formThongTinVanBan.patchValue({
          soHienTai: data,
        });
      }).then(() => {
        this.capnhatmoisv.getSoKiHieu(event.value, "0", this.formThongTinVanBan.value.soHienTai).then(data => {
          this.formThongTinVanBan.patchValue({
            soKiHieu: data,
          });
        });
      });
  
      var IdSoVanBan = event.value;
      this.capnhatmoisv.GetDataLoaiVanBanByIdSoVanBan(IdSoVanBan).subscribe(data => {
        if (data.isError) {
          console.log("Dữ liệu không hợp lệ")
        } else {
          this.LoaiVanBan = data.objData;
        }
      })
    }
  
    /**
     * Submit
     */
    public Submit() {
      this.submitted_VB = true;
  
      if (this.formThongTinVanBan.valid) {
        this.formThongTinVanBan.value.IdDonViLamViec = this.authService.GetDonViLamViec();
        this.formThongTinVanBan.value.DonViId = this.authService.GetmUserInfo().donViId?.toString();
        this.formThongTinVanBan.value.UserId = this.authService.GetmUserInfo().userId?.toString();
  
        this.formThongTinVanBan.value.fileUpLoad = JSON.stringify(this.file_fomat);
  
        this.formTT_VB_fomat = this.formThongTinVanBan.value;
        this.formTT_VB_fomat.vanBanId = this.idVb;
        this.formTT_VB_fomat.chkLuuTru = this.checkLuuTru;
        this.formTT_VB_fomat.chkXemTatCa = this.checkXemTatCa;
  
  
        this.service.TiepNhanVanBan(this.formTT_VB_fomat).subscribe(data => {
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



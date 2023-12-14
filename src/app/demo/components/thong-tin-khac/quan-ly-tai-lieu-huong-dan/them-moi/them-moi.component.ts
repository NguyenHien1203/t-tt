import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyTaiLieuHuongDanService } from 'src/app/demo/service/thong-tin-khac/quan-ly-tai-lieu-huong-dan/quan-ly-tai-lieu-huong-dan.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
})
export class ThemMoiComponent implements OnInit {

  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>;

  submitted = false;
  file: File | null = null;
  valueForm: any;

  public formThemMoi = this.formBuilder.group({
    id: [0, []],
    tieuDe: ["", [Validators.required]],
    noiDung: ["", [Validators.required]],
    donViId: [0, []],
    created: [new Date(), []],
    createdBy: [0, []],
    lastModified: [new Date(), []],
    lastModifiedBy: [0, []],
    userId: [0, []],
    fileName: ['', []],
    filePath: ['', []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private quanLyTaiLieuService: QuanLyTaiLieuHuongDanService,
    private fileService: UploadFileService,) { }

  ngOnInit(): void {

  }

  TatPopup() {
    this.submitted = false;
    this.formThemMoi.reset();
    this.show = false;
    this.close.emit(this.show);
  }

  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      event.target.value = '';
      let urlUpload = '/ThongTinKhac/QuanLyTaiLieuHuongDan/UploadFile';
      this.fileService.uploadFile(file, urlUpload).subscribe({
        next: (data) => {
          if (data.isError)
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: data.title,
            });
          else {
            this.file = file;
            this.messageService.add({
              severity: 'info',
              summary: 'Info',
              detail: data.title,
            });
            this.formThemMoi.patchValue({
              fileName: data.objData.fileName,
              filePath: data.objData.filePath,
            });
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

  public ThemMoi() {
    this.submitted = true;
    if (this.formThemMoi.valid) {
      this.valueForm = this.formThemMoi.value;
      this.valueForm.donViId = this.authService.GetDonViLamViec();
      this.valueForm.userId = this.authService.GetmUserInfo()?.userId;

      this.quanLyTaiLieuService.themMoi(this.formThemMoi.value)
        .subscribe(data => {
          let resData = data;
          if (resData.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resData.title });
          } else {
            this.TatPopup();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: resData.title });
          }
        },
          error => {
            console.log('Error', error);
          })
    }
  }

  public downloadFile() {
    const blob = new Blob([this.file], {
      type: 'application/octet-stream',
    });

    // Sử dụng saveAs để tải tệp xuống với tên cụ thể.
    saveAs(blob, this.file.name);
  }

  public XoaFile(): void {
    this.file = null;
  }

}

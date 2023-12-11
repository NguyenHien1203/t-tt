import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyTaiLieuHuongDanService } from 'src/app/demo/service/thong-tin-khac/quan-ly-tai-lieu-huong-dan/quan-ly-tai-lieu-huong-dan.service';
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
  @Output() close = new EventEmitter<boolean>;
  @Input() id: string = '1';

  submitted = false;
  file: File | null = null;
  valueForm: any;
  dataFile: any;

  public formCapNhat = this.formBuilder.group({
    id: [0, []],
    tieuDe: ["", [Validators.required]],
    noiDung: ["", [Validators.required]],
    donViId: [0, []],
    fileName: ['', []],
    filePath: ['', []],
    tenDonVi: [],
    userId: [],
    pathFile: [],
    ngayTao: [],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private quanLyTaiLieuService: QuanLyTaiLieuHuongDanService,
    private fileService: UploadFileService,) { }

  ngOnInit() {
    // this.GetTaiLieu();
  }

  CapNhat() {
    this.submitted = true;
    if (this.formCapNhat.value) {
      this.valueForm = this.formCapNhat.value;
      console.log(this.valueForm);
      this.valueForm.userId = this.authService.GetmUserInfo()?.userId;

      this.quanLyTaiLieuService.capNhat(this.formCapNhat.value)
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

  TatPopup() {
    this.submitted = false;
    this.formCapNhat.reset();
    this.show = false;
    this.close.emit(this.show);
    this.file = null;
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
            this.formCapNhat.patchValue({
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

  GetTaiLieu() {
    this.quanLyTaiLieuService.getFile(this.id)
      .subscribe(data => {
        console.log("Get file: " + data);
        this.dataFile = data;
      })

    this.quanLyTaiLieuService.getTaiLieu(this.id)
      .subscribe(data => {
        if (data.fileName !== '') {
          this.file = new File([], data.fileName, { type: 'text/plain' });
        }
        console.log(data);
        data.fileName = '';
        data.filePath = '';
        this.formCapNhat.setValue(data);
      })
  }

  DownloadFile() {
    const blob = new Blob([this.dataFile], {
      type: 'application/octet-stream',
    });
    saveAs(blob, this.file.name);
  }

  XoaFile(): void {
    this.file = null;
  }

}

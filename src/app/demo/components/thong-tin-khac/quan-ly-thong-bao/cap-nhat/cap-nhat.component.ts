import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { throwError } from 'rxjs';
import { QuanLyThongBaoService } from 'src/app/demo/service/thong-tin-khac/quan-ly-thong-bao.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss'],
  // providers: [IDbAsyncQueryProvider]
})
export class CapNhatComponent {
  @ViewChild('myEditor') myEditor: any;
  @Input() show: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  @Input() id: string = '1';

  constructor(private service: QuanLyThongBaoService
    , private messageService: MessageService
    , private fb: FormBuilder
    , private fileService: UploadFileService
    , private cd: ChangeDetectorRef) { };

  file: File | null = null; // Variable to store file
  public Editor = ClassicEditor;
  submitted: boolean = false;
  checked: boolean = true;
  relativePath : string = "";
  quanLyThongBao: any = {};
  public checkedValue: boolean = false;
  public formCapNhat = this.fb.group({
    id: [0, []],
    tieuDe: ["", [Validators.required]],
    ngayBatDau: [, []],
    ngayKetThuc: [, []],
    donViId: [0, []],
    noiDung: ["", []],
    hienThi: [, []],
    created: [0, []],
    trangThai: [0, []],
    fileName: [0, []],
    filePath: [0, []],
  });

  public BindDataDialog(): void {
    this.service.getQuanLyThongBaoId(this.id).subscribe(data => {
      if(data.fileName !== "")
      {
        this.file = new File([], data.fileName, { type: 'text/plain' });
      this.relativePath = data.filePath as string;
      }
      data.ngayBatDau = new Date(data.ngayBatDau);
      data.ngayKetThuc = new Date(data.ngayKetThuc);
      data.hienThi = data.hienThi == 1 ? true : false;
      this.checked = data.hienThi;
      data.fileName = "";
      data.filePath = "";
      console.log(data)
      this.formCapNhat.setValue(data);
    })
  }

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
      this.fileService.uploadFile(this.file).subscribe({
        next: (data) => {
          if (data.isError)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Tải lên thất bại' });
          else {
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Tải lên thành công' });
            this.formCapNhat.value.fileName = data.objData.fileName;
            this.formCapNhat.value.filePath = data.objData.filePath;
            this.relativePath = data.objData.filePath;
          }
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });
          return throwError(() => error);
        },
      });;
    }
  }

  public getToolBar(): any {
    const toolbar: any = {
      items: [
        'undo', 'redo',
        '|', 'heading',
        '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
        '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
        '|', 'link', 'uploadImage', 'blockQuote', 'codeBlock',
        '|', 'alignment',
        '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
      ],
      shouldNotGroupWhenFull: true
    }
    return toolbar;
  }

  public Thoat(): void {
    this.show = false;
    this.formCapNhat.reset();
    this.tatPopup.emit(this.show);
    this.cd.detectChanges();
  }

  public CapNhat(): void {
    this.submitted = true;
    if (this.formCapNhat.valid) {
      this.quanLyThongBao = this.formCapNhat.value;
      this.quanLyThongBao.hienThi = this.checkedValue ? 1 : 0;
      this.service.capNhatQuanLyThongBao(this.quanLyThongBao).subscribe(
        data => {
          this.XoaFile();
          let resData = data as ResponeMessage;
          if (resData.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resData.title });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: resData.title });
            this.Thoat();
          }
        },
        error => {
          console.log('Error', error);
        })
    }
  }

  public CheckedHt() {
    this.checkedValue = !this.checkedValue;
  }

  public XoaFile(): void {
    this.file = null;
  }
}

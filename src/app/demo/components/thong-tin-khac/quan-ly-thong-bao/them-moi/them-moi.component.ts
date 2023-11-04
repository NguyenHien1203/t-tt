import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { QuanLyThongBaoService } from 'src/app/demo/service/thong-tin-khac/quan-ly-thong-bao.service';
import { throwError } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
})
export class ThemMoiComponent {
  file: File | null = null; // Variable to store file
   checkHienThi: boolean = false;
   Editor = ClassicEditor;
  @ViewChild('myEditor') myEditor: any;
  @Input() show: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
   quanLyThongBao: any = {};
   submitted: boolean = false;
   relativePath : string = "";
   formThemMoi = this.fb.group({
    id: [0, []],
    tieuDe: ["", [Validators.required]],
    ngayBatDau: [, []],
    ngayKetThuc:[, []],
    donViId: [0, []],
    noiDung: ["", []],
    hienThi: [, []],
    fileName: ["", []],
    filePath: ["", []],
  });
  constructor(private fb: FormBuilder
    , private service: QuanLyThongBaoService
    , private messageService: MessageService
    , private authService: AuthService
    , private fileService: UploadFileService
    , private cd: ChangeDetectorRef) { }

  public Thoat(): void {
    this.show = false;
    this.formThemMoi.reset();
    this.tatPopup.emit(this.show);
    this.cd.detectChanges();
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
            this.formThemMoi.value.fileName = data.objData.fileName;
            this.formThemMoi.value.filePath = data.objData.filePath;
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

  public ThemMoi(): void {
    this.submitted = true;
    if (this.formThemMoi.valid) {
      this.quanLyThongBao = this.formThemMoi.value;
      this.quanLyThongBao.donViId = this.authService.GetDonViLamViec();
      this.quanLyThongBao.userId = this.authService.GetmUserInfo()?.userId;
      this.quanLyThongBao.hienThi = this.checkHienThi ? 1 : 0;
      this.quanLyThongBao.noiDung = this.myEditor.editorInstance.getData();

      this.service.themMoiQuanLyThongBao(this.quanLyThongBao).subscribe(
        data => {
          console.log('data', data);
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

  public CheckedHt(): void {
    this.checkHienThi = !this.checkHienThi;
  }

  public XoaFile(): void {
    this.file = null;
  }
}

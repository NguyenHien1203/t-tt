import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { QuanLyThongBaoService } from 'src/app/demo/service/thong-tin-khac/quan-ly-thong-bao.service';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
})
export class ThemMoiComponent {
  file: File | null = null; // Variable to store file
  public checkHienThi: boolean = false;
  public Editor = ClassicEditor;
  @ViewChild('myEditor') myEditor: any;
  @Input() show: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  public quanLyThongBao: any = {};
  public submitted: boolean = false;
  public formThemMoi = this.fb.group({
    id: [0, []],
    tieuDe: ["", [Validators.required]],
    ngayBatDau: ["", []],
    ngayKetThuc: ["", []],
    donViId: [0, []],
    noiDung: ["", []],
    hienThi: [false, []],
    fileName: ["", []],
    filePath: ["", []],
  });
  constructor(private fb: FormBuilder
    , private service: QuanLyThongBaoService
    , private messageService: MessageService
    , private authService: AuthService
    , private fileService: UploadFileService) { }

  public Thoat(): void {
    this.show = false;
    this.formThemMoi.reset();
    this.tatPopup.emit(this.show);
  }

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
      this.fileService.uploadFile(this.file).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tải lên thành công' });
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tải lên thất bại' });
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
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LoaiNhiemVuService } from 'src/app/demo/service/danh-muc/loai-nhiem-vu/loai-nhiem-vu.service';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';


@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
})
export class ThemMoiComponent {
  uploadFiles: any;
  pathFileUpload: string = '';
  public checkHienThi : boolean = false;
  public Editor = ClassicEditor;
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  public loaiNhiemvu: any = {};
  public submitted: boolean = false;
  public formThemMoi = this.fb.group({
    id: [0, []],
    tieuDe: ["", [Validators.required]],
    ngayBatDau: ["", []],
    ngayKetThuc: ["", []],
    donViId: [0, []],
    noiDung: ["", []],
    hienThi: [false, []]
  });
  constructor(private fb: FormBuilder
    , private service: LoaiNhiemVuService
    , private messageService: MessageService
    , private authService: AuthService
    , private fileService: UploadFileService) { }

  public Thoat(): void {
    this.hienThi = false;
    this.formThemMoi.reset();
    this.tatPopup.emit(this.hienThi);
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadFiles = file;
    }
    this.fileService.postFile(this.uploadFiles).subscribe(data => {
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title });
      } else {
        this.pathFileUpload = data.data;
        this.messageService.add({ severity: 'info', summary: 'Thành công', detail: data.title });
      }
    }, error => {
      console.log(error);
    });

  }

  public ThemMoi(): void {
    this.submitted = true;
    if (this.formThemMoi.valid) {
      this.loaiNhiemvu = this.formThemMoi.value;
      this.loaiNhiemvu.donViId = this.authService.GetDonViLamViec();
      this.loaiNhiemvu.createdBy = this.authService.GetmUserInfo()?.userId;

      this.service.themMoiLoaiNhiemVu(this.loaiNhiemvu).subscribe(
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

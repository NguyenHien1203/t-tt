import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { QuanLyThongBaoService } from 'src/app/demo/service/thong-tin-khac/quan-ly-thong-bao.service';
import { TimKiemDanhSach } from 'src/app/models/thong-tin-khac/quan-ly-thong-bao';

@Component({
  selector: 'app-quan-ly-thong-bao',
  templateUrl: './quan-ly-thong-bao.component.html',
  styleUrls: ['./quan-ly-thong-bao.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class QuanLyThongBaoComponent implements OnInit {
  constructor(private service: QuanLyThongBaoService
    , private messageService: MessageService
    , private confirmService: ConfirmationService) { }
  public hienThiThemMoi: boolean = false;
  public hienThiCapNhat: boolean = false;
  public id : string = "1";
  public loading: boolean = true;
  public home = { icon: 'pi pi-home', routerLink: '/' };
  public items = [{ label: 'Thông tin khác' }, { label: 'Quản lý thông báo' }];
  public timChinhXac: boolean = false;
  public timKiemDanhSach: TimKiemDanhSach = {
    keyWord: "",
    tuNgay: "1901-01-01",
    denNgay: "9999-01-01",
    donViId: 0,
    hienThi: 3,
    isHieuLuc: 3,
    timChinhXac: 0
  }
  lstThongBao: SelectItem[] = [{ label: '--Toàn bộ thông báo--', value: 3 }, { label: 'Còn hiệu lực', value: 2 }, { label: 'Không còn hiệu lực', value: 1 }];
  lstHienThi: SelectItem[] = [{ label: '--Chọn hình thức--', value: 3 }, { label: 'Hiển thị', value: 1 }, { label: 'Không hiển thị', value: 0 }];
  quanLyThongBaos: any[] = [];
  ngOnInit(): void {
    this.loading = false;
    this.LoadDanhSach(this.timKiemDanhSach);
  }
  public Editor = ClassicEditor;

  public ThemMoi(): void {
    this.hienThiThemMoi = true;
  }

  public CapNhat(id: string): void {
    this.hienThiCapNhat = true;
    this.id = id;
  }
  public Thoat(itemHt: any, loai: string): void {
    if (loai === 'T')
      this.hienThiThemMoi = false;
    else
      this.hienThiCapNhat = false;
    this.LoadDanhSach(this.timKiemDanhSach);
  }

  public onSelectMethod(event) {
    let d = new Date(Date.parse(event));
    this.timKiemDanhSach.tuNgay = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }

  public LoadDanhSach(timKiemDanhSach: any): void {
    this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
    this.service.getDanhSachQuanLyThongBao(timKiemDanhSach).then(data => { this.quanLyThongBaos = data })
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

  }

}

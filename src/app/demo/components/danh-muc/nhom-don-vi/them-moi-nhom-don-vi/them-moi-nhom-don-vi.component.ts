import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CoQuanBanHanhService } from 'src/app/demo/service/danh-muc/co-quan-ban-hanh/co-quan-ban-hanh.service';
import { NhomDonViService } from 'src/app/demo/service/danh-muc/nhom-don-vi/nhom-don-vi.service';

@Component({
  selector: 'app-them-moi-nhom-don-vi',
  templateUrl: './them-moi-nhom-don-vi.component.html',
  styleUrls: ['./them-moi-nhom-don-vi.component.scss']
})
export class ThemMoiNhomDonViComponent {
  constructor(
    // private taikhoanService: TaiKhoanService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private Service: NhomDonViService,
  ) {
  }

  //Lấy giá trị Hiển thị từ trang chủ truyền vào 
  @Input() hienThi: boolean = false;
  //Trả ra nút đóng popuơ
  @Output() tatPopup = new EventEmitter<boolean>();

  //#region Khai báo biến
  //Khai báo biến sử dụng
  submitted = false;
  NhomDonVi: any;
  //#endregion

  //#region Khai báo form thêm mới và dữ liệu
  public formThemMoi = this.formBuilder.group({
    Id: [0, []],
    thuTu: ["", []],
    tenNhom: ["", [Validators.required]],
    moTa: ["", []],
  });
  //#endregion

  //Hàm đóng pop up
  public Thoat(): void {
    this.hienThi = false;
    this.formThemMoi.reset();
    this.submitted = false;
    this.tatPopup.emit(this.hienThi);
  }

   //#region Thêm mới
  //Thêm mới 
  public ThemMoiNhomDonVi(): void {
    this.submitted = true;
    if (this.formThemMoi.valid) {
      this.NhomDonVi = this.formThemMoi.value;
      this.Service.addNhomDonVi(this.NhomDonVi).subscribe(data => {
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
  //#endregion
}

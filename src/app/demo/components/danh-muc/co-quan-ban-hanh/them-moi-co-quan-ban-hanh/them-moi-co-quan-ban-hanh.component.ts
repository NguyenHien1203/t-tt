import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CoQuanBanHanhService } from 'src/app/demo/service/danh-muc/co-quan-ban-hanh/co-quan-ban-hanh.service';

@Component({
  selector: 'app-them-moi-co-quan-ban-hanh',
  templateUrl: './them-moi-co-quan-ban-hanh.component.html',
  styleUrls: ['./them-moi-co-quan-ban-hanh.component.scss']
})
export class ThemMoiCoQuanBanHanhComponent {
  constructor(
    // private taikhoanService: TaiKhoanService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private Service: CoQuanBanHanhService,
  ) {
  }

  //Lấy giá trị Hiển thị từ trang chủ truyền vào 
  @Input() hienThi: boolean = false;
  //Trả ra nút đóng popuơ
  @Output() tatPopup = new EventEmitter<boolean>();

  //#region Khai báo biến
  //Khai báo biến sử dụng
  submitted = false;
  CQBanHanh: any;

  public formThemMoi = this.formBuilder.group({
    Id: [0, []],
    kyHieu: ["", []],
    tenCoQuan: ["", [Validators.required]],
    ghiChu: ["", []],
  });

  productDialog: boolean = false;
  IdDonVi: any;
  Cap: any;
  MaDVPC: any;
  //#endregion

  //Hàm chạy đầu tiên
  ngOnInit(): void {
  }

  //Hàm đóng pop up
  public Thoat(): void {
    this.hienThi = false;
    this.formThemMoi.reset();
    this.submitted = false;
    this.tatPopup.emit(this.hienThi);
  }

  //#region Thêm mới
  //Thêm mới 
  public ThemMoiCoQuan(): void {
    this.submitted = true;
    if (this.formThemMoi.valid) {
      this.CQBanHanh = this.formThemMoi.value;
      console.log(this.CQBanHanh);
      this.Service.addCoQuan(this.CQBanHanh).subscribe(data => {
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

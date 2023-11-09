import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DonViService } from 'src/app/demo/service/danh-muc/don-vi/don-vi.service';

@Component({
  selector: 'app-cap-nhat-don-vi',
  templateUrl: './cap-nhat-don-vi.component.html',
  styleUrls: ['./cap-nhat-don-vi.component.scss']
})

export class CapNhatDonViComponent {
  constructor(private route: ActivatedRoute, private dmDonViService: DonViService, private formBuilder: FormBuilder, private messageService: MessageService) { }
  //Lấy dữ liệu đầu vào
  @Input() id: string = '';
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  //

  //#region khai báo dữ liệu  
  PhongBan: any = {};
  DonVi: [];
  submitted = false;
  selectedDonVi: '';
  productDialog: boolean = false;
  IdDonVi: any;
  Cap: any;
  MaDVPC: any;
  checked: boolean = false;
  parentId?: number;
  checkHt: boolean = false;
  //#endregion

  //#region Khai báo form cập nhật
  public formCapNhat = this.formBuilder.group({
    id: [0, []],
    maDonVi: ["", []],
    tenDonVi: ["", []],
    parentId: [[], []],
    url: ["", []],
    ngayTruyenThong: [new Date, []],
    diaChi: ["", []],
    ghiChu: ["", []],
    sdt: ["", []],
    fax: ["", []],
    website: ["", []],
    email: ["", []],
    thuTu: ["", []],
    trangThai: [false, []],
    maDinhDanh: ["", []],
    tenDonViTrenTruc: ["", []],
  });
  //#endregion

  ngOnInit(): void {
    this.GetDataDonVi();
  }

  //Get danh sach don vi
  public GetDataDonVi() {
    this.dmDonViService.GetDataDonVi().subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.DonVi = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }
  //Hết 

  //bind dữ liệu cần chỉnh sửa
  public BindDataDialog(): void {
    this.dmDonViService.GetDonViById(this.id).subscribe(data => {
      console.log("data:  ", data);
      this.parentId = data.parentId;
      this.checked = data.trangThai;
      data.ngayTruyenThong = new Date(data.ngayTruyenThong);
      this.formCapNhat.setValue(data);
    })
  }
  //

  //Tatpopup
  public Thoat(): void {
    this.hienThi = false;
    this.submitted = false;
    this.tatPopup.emit(this.hienThi);
  }

  //Check trạng thái
  public CheckHienThi(): void {
    this.checkHt = !this.checkHt;
  }
}

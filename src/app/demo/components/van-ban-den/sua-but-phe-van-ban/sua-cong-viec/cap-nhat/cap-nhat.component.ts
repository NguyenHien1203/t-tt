import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { ButPheVanBanService } from 'src/app/demo/service/van-ban-den/but-phe-van-ban/but-phe-van-ban.service';
import { SuaButPheVanBanService } from 'src/app/demo/service/van-ban-den/sua-but-phe-van-ban/sua-but-phe-van-ban.service';
import { DoiTuongPhanCong } from 'src/app/models/van-ban-den/sua-but-phe-van-ban';


@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss'],

})
export class CapNhatComponent {
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  @Input() item: any = [];

  submitted: boolean = false;
  lstPhongBan: [];
  lstNhomNguoiDung: [];
  lstNguoiDung: [];
  lstUserNhan: any[] = [];
  PhongBanId: any;
  NhomNguoiDungId: any;
  NguoiDungId: any;

  lstNguoiDungPhanCong: DoiTuongPhanCong[] = [];
  formThemMoi_fommat: any = [];

  lstPhoiHop: any[] = [];
  lstThongBao: any[] = [];
  lstSmS: any[] = [];
  lstVBTL: any[] = [];
  lstChiDao: any[] = [];
  lstChuTri: any[] = [];
  congviec: any = [];
  chkAllPhoiHop: boolean = false;
  chkAllThongBao: boolean = false;

  chkPhoiHop: boolean = false;
  chkThongBao: boolean = false;

  constructor(
    private service: ButPheVanBanService,
    private Suabutpheservice: SuaButPheVanBanService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
  ) { }

  public ThongTinCongViec = this.formBuilder.group({
    phongBanId: ["", []],
    nhomNguoiDungId: ["", []],
    nguoiDungId: ["", []],
    noiDung: ["", [Validators.required]],
    soNgay: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    ngayBatDau: [new Date(), [Validators.required]],
    ngayKetThuc: [new Date(), []],
    lstDoiTuong: ["", []],
  });

  public Thoat(): void {
    this.submitted = false;
    this.hienThi = false;
    this.ThongTinCongViec.reset();
    this.tatPopup.emit(this.hienThi);
  }

  public async BindDialogData() {
    this.LoadPhongBan();
    this.LoadNhomNguoiDung();
    this.LoadChonNhanhNguoiDung();
    this.GetDataUpdateCongViec();
  }

  public GetDataUpdateCongViec() {
    this.Suabutpheservice.GetDataUpdateCongViec(this.item).subscribe(data => {
      if (data.isError) {
      } else {
        this.lstNguoiDungPhanCong = data.objData.lstDoiTuongModel;
        this.ThongTinCongViec.patchValue({
          noiDung: data.objData.objCongViec.noiDungCongViec,
          soNgay: data.objData.objCongViec.thoiHan,
          ngayBatDau: new Date(data.objData.objCongViec.ngayBd),
          ngayKetThuc: new Date(data.objData.objCongViec.ngayKt),
        })
      }
    })
  }

  /**
  * LoadPhongBan
  */
  public LoadPhongBan() {
    this.service.LoadPhongBan().subscribe(data => {
      if (data.isError) {
      } else {
        this.lstPhongBan = data.objData;
      }
    })
  }

  /**
  * LoadNhomNguoiDung
  */
  public LoadNhomNguoiDung() {
    this.service.LoadNhomNguoiDung().subscribe(data => {
      if (data.isError) {
      } else {
        this.lstNhomNguoiDung = data.objData;
      }
    })
  }

  /**
  * LoadChonNhanhNguoiDung
  */
  public LoadChonNhanhNguoiDung() {
    this.service.LoadChonNhanhNguoiDung().subscribe(data => {
      if (data.isError) {
      } else {
        this.lstNguoiDung = data.objData;
      }
    })
  }

  /**
   * ChangePhongBan
   */
  public ChangePhongBan(event: any) {
    this.ThongTinCongViec.patchValue({
      nhomNguoiDungId: null,
      nguoiDungId: null
    });
    let idPhongBan = event.value;
    this.service.BindUserByNhomPhongBan(idPhongBan).subscribe(data => {
      if (data.isError) {
      } else {
        this.lstUserNhan = data.objData;

        this.lstNguoiDungPhanCong.forEach((item: any) => {
          const newList = this.lstUserNhan.filter(s => s.value !== item.value);
          this.lstUserNhan = newList;
        });

      }
    })
  }

  /**
  * ChangePhongBan
  */
  public ChangeNhomNguoiDung(event: any) {
    this.ThongTinCongViec.patchValue({
      phongBanId: null,
      nguoiDungId: null
    });

    let idNhomNguoiDung = event.value;
    this.service.BindUserByNhomNguoiDung(idNhomNguoiDung).subscribe(data => {
      if (data.isError) {
      } else {
        this.lstUserNhan = data.objData;
        this.lstNguoiDungPhanCong.forEach((item: any) => {
          const newList = this.lstUserNhan.filter(s => s.value !== item.value);
          this.lstUserNhan = newList;
        });
      }
    })
  }

  /**
   * Change chọn nhanh người dùng
   */
  public ChangeChonNhanhNguoiDung(event: any) {
    this.ThongTinCongViec.patchValue({
      phongBanId: null,
      nhomNguoiDungId: null
    });
    let idNguoiDung = event.value;
    this.service.BindChonNhanhNguoiDung(idNguoiDung).subscribe(data => {
      if (data.isError) {
      } else {
        this.lstUserNhan = data.objData;
        this.lstNguoiDungPhanCong.forEach((item: any) => {
          const newList = this.lstUserNhan.filter(s => s.value !== item.value);
          this.lstUserNhan = newList;
        });
      }
    })
  }

  /**
   * Change ngày kết thúc theo số ngày
   */
  public ChangeSoNgay() {
    let soNgay = this.ThongTinCongViec.value.soNgay;
    let ngayBatDau = this.formatDateToDDMMYY(new Date(this.ThongTinCongViec.value.ngayBatDau));

    this.service.GetSoNgayKT(soNgay, ngayBatDau).subscribe(data => {
      if (data.isError) {
      } else {
        this.ThongTinCongViec.patchValue({
          ngayKetThuc: new Date(data.objData),
        });
      }
    })
  }

  formatDateToDDMMYY(date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString();
    return day + '/' + month + '/' + year;
  }

  /**
   * ChangeDoiTuong
   */
  public ChangeDoiTuong() {
    let objNguoiDung = this.ThongTinCongViec.value.lstDoiTuong;
    const selectedOption = this.lstUserNhan.filter(option => objNguoiDung.includes(option.value));

    let itemData: DoiTuongPhanCong = {
      hoTen: selectedOption[0].text.toString(),
      value: selectedOption[0].value.toString(),
      chiDao: false,
      chuTri: false,
      phoiHop: false,
      thongBao: false,
      sms: false,
      vbtl: false,
    }

    this.lstNguoiDungPhanCong.push(itemData);

    this.lstUserNhan.forEach((obj, index) => {
      if (objNguoiDung.includes(obj.value)) {
        this.lstUserNhan.splice(index, 1);
      }
    });

  }
  /**
   * ChonDoiTuong
   */
  public ChonDoiTuong(): void {
    this.formThemMoi_fommat = this.ThongTinCongViec.value;
    var lstCaNhanSelected = this.formThemMoi_fommat.lstDoiTuong as any[];

    const selectedOption = this.lstUserNhan.filter(option => lstCaNhanSelected.includes(option.value));

    selectedOption.forEach((obj, index) => {
      let itemData: DoiTuongPhanCong = {
        hoTen: obj.text.toString(),
        value: obj.value.toString(),
        chiDao: false,
        chuTri: false,
        phoiHop: false,
        thongBao: false,
        sms: false,
        vbtl: false,
      }
      this.lstNguoiDungPhanCong.push(itemData);
    });

    const lstConLai = this.lstUserNhan.filter(option => !lstCaNhanSelected.includes(option.value));

    this.lstUserNhan = lstConLai;

  }

  /**
   * XoaDoiTuong
   */
  public XoaDoiTuong(nguoidung: any) {
    let itemData = {
      value: nguoidung.value,
      text: nguoidung.hoTen
    }
    this.lstUserNhan = this.lstUserNhan.concat(itemData);
    this.lstNguoiDungPhanCong = this.lstNguoiDungPhanCong.filter(option => nguoidung.value !== option.value);
  }

  public ckAllPhoiHop() {
    this.chkAllPhoiHop = !this.chkAllPhoiHop;
    if (this.chkAllPhoiHop === true) {
      this.chkAllThongBao = false;
      this.lstNguoiDungPhanCong.forEach((obj, index) => {
        obj.phoiHop = true;
        obj.thongBao = false;
        obj.chiDao = false;
        obj.chuTri = false;
      });
    } else {
      this.lstNguoiDungPhanCong.forEach((obj, index) => {
        obj.phoiHop = false;
      });
    }
  }

  public ckAllThongBao() {
    this.chkAllThongBao = !this.chkAllThongBao;

    if (this.chkAllThongBao === true) {
      this.chkAllPhoiHop = false;
      this.lstNguoiDungPhanCong.forEach((obj, index) => {
        obj.thongBao = true;
        obj.phoiHop = false;
        obj.chiDao = false;
        obj.chuTri = false;
      });
    } else {
      this.lstNguoiDungPhanCong.forEach((obj, index) => {
        obj.thongBao = false;
      });
    }
  }


  public chkChiDaoChild(item) {
    item.chiDao = !item.chiDao;
    if (item.chiDao === true) {
      item.chuTri = !item.chiDao;
      item.phoiHop = !item.chiDao;
      item.thongBao = !item.chiDao;

      this.lstNguoiDungPhanCong.forEach((obj, index) => {
        if (obj.value !== item.value) {
          obj.chiDao = false;
        }
      });
    }
  }
  
  public chkChuTriChild(item: DoiTuongPhanCong) {
    item.chuTri = !item.chuTri;
    if (item.chuTri === true) {
      item.chiDao = !item.chuTri;
      item.phoiHop = !item.chuTri;
      item.thongBao = !item.chuTri;

      this.lstNguoiDungPhanCong.forEach((obj, index) => {
        if (obj.value !== item.value) {
          obj.chuTri = false;
        }
      });
    }
  }

  public chkPhoiHopChild(item: DoiTuongPhanCong) {
    item.phoiHop = !item.phoiHop;
    if (item.phoiHop === true) {
      item.thongBao = !item.phoiHop;
      item.chiDao = !item.phoiHop;
      item.chuTri = !item.phoiHop;
    }
  }

  public chkThongBaoChild(item: DoiTuongPhanCong) {
    item.thongBao = !item.thongBao;
    if (item.thongBao === true) {
      item.phoiHop = !item.thongBao;
      item.chiDao = !item.thongBao;
      item.chuTri = !item.thongBao;
    }
  }

  public chkSmSChild(item: DoiTuongPhanCong) {
    item.sms = !item.sms;
  }

  public chkVBTLChild(item: DoiTuongPhanCong) {
    item.vbtl = !item.vbtl;
  }

  public CapNhatCongViec() {
    this.submitted = true;
    if (this.ThongTinCongViec.valid) {
      this.congviec = this.ThongTinCongViec.value;

      let data = {
        ngayBatDau: this.formatDateToDDMMYY(new Date(this.ThongTinCongViec.value.ngayBatDau)),
        ngayKetThuc: this.formatDateToDDMMYY(new Date(this.ThongTinCongViec.value.ngayKetThuc)),
        lstDoiTuong: JSON.stringify(this.lstNguoiDungPhanCong),
        soNgay: this.congviec.soNgay.toString(),
        noiDung: this.congviec.noiDung.toString(),
        idCongViec: this.item.congViecId.toString(),
        idUserXuLy: this.item.id.toString(),
        stt: this.item.stt.toString(),
        userId: this.auth.GetmUserInfo().userId.toString(),
        donViLamViecId: this.auth.GetmUserInfo().phongBanLamViecId.toString(),
        donViId: this.auth.GetmUserInfo().donViId.toString(),
        idNhomQuyenLamViec: this.auth.GetmUserInfo().nhomQuyenId.toString(),
      }

      this.Suabutpheservice.CapNhatCongViec(data).subscribe(data => {
        if (data.isError) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
          setTimeout(() => {
            this.Thoat();
          }, 1000);
        }
      }, (error) => {
        console.log('Error', error);
      })
    }
  }
}

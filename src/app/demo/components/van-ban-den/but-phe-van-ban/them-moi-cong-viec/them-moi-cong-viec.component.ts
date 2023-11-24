import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButPheVanBanService } from 'src/app/demo/service/van-ban-den/but-phe-van-ban/but-phe-van-ban.service';
import { DoiTuongPhanCong } from 'src/app/models/van-ban-den/but-phe-van-ban';

@Component({
  selector: 'app-them-moi-cong-viec',
  templateUrl: './them-moi-cong-viec.component.html',
  styleUrls: ['./them-moi-cong-viec.component.scss'],
  providers: [MessageService],
})
export class ThemMoiCongViecComponent implements OnInit {
  idVanBan: string = '1';
  items: any[] = [];
  home: any;
  loading: boolean = true;
  ThongTinVanBan: any;
  lstPhongBan: [];
  lstNhomNguoiDung: [];
  lstNguoiDung: [];
  lstUserNhan: any[] = [];
  PhongBanId: any;
  NhomNguoiDungId: any;
  NguoiDungId: any;
  submitted: boolean = false;

  lstNguoiDungPhanCong: DoiTuongPhanCong[] = [];
  formThemMoi_fommat: any = [];

  lstPhoiHop: any[] = [];
  lstThongBao: any[] = [];
  lstSmS: any[] = [];
  lstVBTL: any[] = [];
  lstChiDao: any[] = [];
  lstChuTri: any[] = [];

  chkAllPhoiHop: boolean = false;
  chkAllThongBao: boolean = false;

  chkPhoiHop: boolean = false;
  chkThongBao: boolean = false;

  constructor(
    private service: ButPheVanBanService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
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


  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Văn bản đến' }, { label: 'Thêm mới công việc' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.route.queryParams.subscribe((params) => {
      if (params['idVanBan'] != undefined) {
        this.idVanBan = params['idVanBan'];
      }
    });

    this.GetDataVanBan(this.idVanBan);
    this.LoadPhongBan();
    this.LoadNhomNguoiDung();
    this.LoadChonNhanhNguoiDung();
  }

  /**
   * GetDataVanBan
   */
  public GetDataVanBan(idVanBan: string) {
    this.service.GetVanBanById(idVanBan).subscribe(data => {
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
      } else {
        this.ThongTinVanBan = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
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
      HoTen: selectedOption[0].text.toString(),
      Value: selectedOption[0].value.toString(),
      ChiDao: false,
      ChuTri: false,
      PhoiHop: false,
      ThongBao: false,
      SMS: false,
      VBTL: false,
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
        HoTen: obj.text.toString(),
        Value: obj.value.toString(),
        ChiDao: false,
        ChuTri: false,
        PhoiHop: false,
        ThongBao: false,
        SMS: false,
        VBTL: false,
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
    this.lstUserNhan = this.lstUserNhan.concat(nguoidung);
    // this.lstNguoiDungPhanCong = this.lstNguoiDungPhanCong.filter(option => nguoidung.value !== option.value);
  }

  public ckAllPhoiHop() {
    this.chkAllPhoiHop = !this.chkAllPhoiHop;
    if (this.chkAllPhoiHop === true) {
      this.chkAllThongBao = false;
      this.lstNguoiDungPhanCong.forEach((obj, index) => {
        obj.PhoiHop = true;
        obj.ThongBao = false;
        obj.ChiDao = false;
        obj.ChuTri = false;
      });
    } else {
      this.lstNguoiDungPhanCong.forEach((obj, index) => {
        obj.PhoiHop = false;
      });
    }
  }

  public ckAllThongBao() {
    this.chkAllThongBao = !this.chkAllThongBao;

    if (this.chkAllThongBao === true) {
      this.chkAllPhoiHop = false;
      this.lstNguoiDungPhanCong.forEach((obj, index) => {
        obj.ThongBao = true;
        obj.PhoiHop = false;
        obj.ChiDao = false;
        obj.ChuTri = false;
      });
    } else {
      this.lstNguoiDungPhanCong.forEach((obj, index) => {
        obj.ThongBao = false;
      });
    }
  }


  public chkChiDaoChild(item) {
    item.ChiDao = !item.ChiDao;
    if (item.ChiDao === true) {
      item.ChuTri = !item.ChiDao;
      item.PhoiHop = !item.ChiDao;
      item.ThongBao = !item.ChiDao;

      this.lstNguoiDungPhanCong.forEach((obj, index) => {
        if (obj.Value !== item.Value) {
          obj.ChiDao = false;
        }
      });
    }
    console.log("lst", this.lstNguoiDungPhanCong);
  }

  public chkChuTriChild(item: DoiTuongPhanCong) {
    item.ChuTri = !item.ChuTri;
    if (item.ChuTri === true) {
      item.ChiDao = !item.ChuTri;
      item.PhoiHop = !item.ChuTri;
      item.ThongBao = !item.ChuTri;

      this.lstNguoiDungPhanCong.forEach((obj, index) => {
        if (obj.Value !== item.Value) {
          obj.ChuTri = false;
        }
      });
    }
  }

  public chkPhoiHopChild(item: DoiTuongPhanCong) {
    item.PhoiHop = !item.PhoiHop;
    if (item.PhoiHop === true) {
      item.ThongBao = !item.PhoiHop;
      item.ChiDao = !item.PhoiHop;
      item.ChuTri = !item.PhoiHop;
    }
  }

  public chkThongBaoChild(item: DoiTuongPhanCong) {
    item.ThongBao = !item.ThongBao;
    if (item.ThongBao === true) {
      item.PhoiHop = !item.ThongBao;
      item.ChiDao = !item.ThongBao;
      item.ChuTri = !item.ThongBao;
    }
  }

  public chkSmSChild(item: DoiTuongPhanCong) {
    item.SMS = !item.SMS;
  }

  public chkVBTLChild(item: DoiTuongPhanCong) {
    item.VBTL = !item.VBTL;
  }

  public ThemMoiCongViec() {
    console.log("lst", this.lstNguoiDungPhanCong);

  }

}

import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TaoNhiemVuService } from 'src/app/demo/service/nhiem-vu/tao-nhiem-vu.service';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class ThemMoiComponent implements OnInit {
  items = [{ label: 'Tạo nhiệm vụ' }, { label: 'Thêm mới nhiệm vụ' }];
  home = { icon: 'pi pi-home', routerLink: '/' };
  loading: boolean = true;
  submitted: boolean = false;
  selectedCities: string[] = [];
  isHienThiThoiGian: boolean = false;

  hienThiThemMoiMocNhiemVu: boolean = false;

  cols: any[] = [];
  dataTables: any[] = [];
  sttDataTables: any;

  lstNhiemVu: [];
  lstTinhChatNhiemVu: [];
  lstLinhVuc: [];
  lstLanhDaoSo: [];
  lstPhongBan: [];
  lstDonViPhoiHop: any[] = [];
  lstDonViChuTri: [];
  lstDonViPhoiHopChange: any[];

  ngayKetThuc: string = "";
  ngOnInit(): void {
    this.loading = false;
    this.GetDataDefaultOption();
  }

  constructor(
    private messageService: MessageService,
    private service: TaoNhiemVuService,
    private confirmationService: ConfirmationService,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  public ThongTinNhiemVu = this.formBuilder.group({
    soKiHieu: ["", [Validators.required]],
    ngayVanBan: ["", [Validators.required]],
    vanBanLienQuan: ["", []],
    noiDungChinh: ["", []],
    mucTieu: ["", []],
    cacMocChinh: ["", []],
    loaiNhiemVu: ["", [Validators.required]],
    tinhChatNhiemVu: ["", []],
    nhomLinhVuc: ["", []],
    trichYeu: ["", [Validators.required]],
    tenDonVi: [""],
    donVi: [],
    donViChuTri: [, [Validators.required]],
    donViPhoiHop: [],
    lanhDaoChiuTrachNhiem: [""],
    yKienChiDao: [""],
    thoiGianHoanThanh: [],
    thoiHanHoanThanh: [""],
    ngayChuyenVanBan: [""],
    ghiChu: [""],
    lanhDaoSo: [, [Validators.required]],
    lanhDaoDonVi: [""],
    tenLoaiNhiemVu: [""],
    tenTinhChat: [""],
    tenNhomLinhVuc: [""],
    tenSoNganh: [""],
    tenDonViChuTri: [""],
    tenDonViPhoiHop: [""],
    tenLanhDao: [""],
    createBy: [],
  });

  public GetDataDefaultOption() {

    this.service.GetDataDefaultOption().subscribe(data => {
      if (data.isError) {
      } else {
        this.lstNhiemVu = data.objData.lstLoaiNhiemVu;
        this.lstTinhChatNhiemVu = data.objData.lstTinhChatNhiemVu;
        this.lstLinhVuc = data.objData.lstLinhVuc;
        this.lstLanhDaoSo = data.objData.lstLanhDaoSo;
        this.lstDonViPhoiHop = data.objData.lstDonViPhoiHop;
        this.lstDonViChuTri = data.objData.lstDonViChuTri;
      }
    })

    this.ThongTinNhiemVu.patchValue({
      tenDonVi: this.auth.GetmUserInfo().tenDonVi
    })
  }

  changeDVCT(event: any) {
    const array = Object.values(this.lstDonViPhoiHop);
    array.forEach((obj, index) => {
      if (obj.value === event) {
        array.splice(index, 1);
      }
    });
    this.lstDonViPhoiHopChange = array;
  }

  changeThoiGianHoanThanh(event: any) {
    if (event == 1) {
      this.isHienThiThoiGian = true;
    } else if (event == 2) {
      this.isHienThiThoiGian = false;
    }
  }

  valueTextLinhVuc(event: any) {
    this.ThongTinNhiemVu.controls['tenNhomLinhVuc'].setValue(event.originalEvent.srcElement.ariaLabel);
  }

  valueTextLoaiNhiemVu(event: any) {
    this.ThongTinNhiemVu.controls['tenLoaiNhiemVu'].setValue(event.originalEvent.srcElement.ariaLabel);
  }

  valueTextTinhChatNhiemVu(event: any) {
    this.ThongTinNhiemVu.controls['tenTinhChat'].setValue(event.originalEvent.srcElement.ariaLabel);
  }

  valueTextLanhDaoDonVi(event: any) {
    this.ThongTinNhiemVu.controls['tenLanhDao'].setValue(event.originalEvent.srcElement.ariaLabel);
    console.log(this.ThongTinNhiemVu.value.tenLanhDao);
    
  }

  valueTextDonViChuTri(event: any) {
    this.ThongTinNhiemVu.controls['tenDonViChuTri'].setValue(event.originalEvent.srcElement.ariaLabel);
  }

  valueTextDonViPhoiHop(event: any) {
    const array = [];
    this.lstDonViPhoiHop.forEach((objLst, index) => {
      event.value.forEach((obj, index) => {
        if (objLst.value == obj) {
          array.push(objLst.text);
          this.ThongTinNhiemVu.controls['tenDonViPhoiHop'].setValue(array.toString());
        }
      });
    })
  }

  public QuayLai() {
    this.router.navigate(['/nhiem-vu/tao-nhiem-vu']);
  }

  TatPopup(item: any, type: string) {
    if (type === 'C') {
      this.hienThiThemMoiMocNhiemVu = false;
    }
  }

  ThemMoiMocNhiemVu() {
    if (this.dataTables.length <= 10) {
      this.hienThiThemMoiMocNhiemVu = true;
      this.sttDataTables = this.dataTables.length;
    }
  }

  ThemMoiItemMocNhiemVu(data: any) {
    this.dataTables.push(data);
  }

  Xoa(stt: any) {
    this.dataTables.splice(this.dataTables.indexOf(stt), stt)
  }

  public ThemMoi() {
    this.submitted = true;
    const itemData = this.ThongTinNhiemVu.value;
    let taoNhiemVu = {
      soKyHieu: itemData.soKiHieu,
      ngayVanBan: itemData.ngayVanBan,
      vanBanLienQuan: itemData.vanBanLienQuan,
      tenNhiemVu: itemData.trichYeu,
      noiDungChinh: itemData.noiDungChinh,
      mucTieuCanDat: itemData.mucTieu,
      cacMocChinh: itemData.cacMocChinh,
      loaiNhiemVuId: itemData.loaiNhiemVu,
      tinhChatNhiemVuId: itemData.tinhChatNhiemVu,
      linhVucId: itemData.nhomLinhVuc,
      soNganhId: this.auth.GetmUserInfo().donViId,
      tenSoNganh: this.auth.GetmUserInfo().tenDonVi,
      donViChuTriId: itemData.donViChuTri,
      donViPhoiHopId: itemData.donViPhoiHop?.toString(),
      lanhDaoSoId: itemData.lanhDaoSo,
      lanhDaoDonVi: itemData.lanhDaoChiuTrachNhiem,
      yKienChiDao: itemData.yKienChiDao,
      thoiHanRdo: Number(itemData.thoiGianHoanThanh),
      thoiHanHoanThanh: itemData.thoiHanHoanThanh,
      ngayChuyenVanBan: itemData.ngayChuyenVanBan,
      ghiChu: itemData.ghiChu,
      tenNguoiTao: this.auth.GetmUserInfo().userName,
      donViLamViecId: this.auth.GetmUserInfo().phongBanLamViecId,
      createdBy: this.auth.GetmUserInfo().userId,
      tenNhomLinhVuc: itemData.tenNhomLinhVuc,
      tenLoaiNhiemVu: itemData.tenLoaiNhiemVu,
      tenTinhChat: itemData.tenTinhChat,
      tenLanhDao: itemData.tenLanhDao,
      tenDonViChuTri: itemData.tenDonViChuTri,
      tenDonViPhoiHop: itemData.tenDonViPhoiHop,
      lstMocNhiemVu: this.dataTables,
    }
    console.log(taoNhiemVu);
    if (this.ThongTinNhiemVu.valid) {
      this.submitted = true;
      this.service.ThemMoi(taoNhiemVu).subscribe(data => {
        let resData = data;
        if (resData.isError) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resData.title, life: 3000 });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: resData.title, life: 3000 });
          setTimeout(() => {
            this.QuayLai();
          }, 2000);
        }
      })
    }
  }
}

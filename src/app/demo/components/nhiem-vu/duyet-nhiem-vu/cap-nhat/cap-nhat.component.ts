import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DuyetNhiemVuService } from 'src/app/demo/service/nhiem-vu/duyet-nhiem-vu.service';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CapNhatComponent implements OnInit {
  items = [{ label: 'Tạo nhiệm vụ' }, { label: 'Cập nhật nhiệm vụ' }];
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

  public ThongTinNhiemVu = this.formBuilder.group({
    soKiHieu: ["", [Validators.required]],
    ngayVanBan: [new Date, [Validators.required]],
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
    thoiHanHoanThanh: [new Date],
    ngayChuyenVanBan: [new Date],
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
    id: [],
  });

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private service: DuyetNhiemVuService,
    private confirmationService: ConfirmationService,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.GetDataDefaultOption();
    this.GetNhiemVu();
  }

  public GetDataDefaultOption() {

    this.service.getDataDefaultOption().subscribe(data => {
      if (data.isError) {
      } else {
        this.lstNhiemVu = data.lstLoaiNhiemVu;
        this.lstTinhChatNhiemVu = data.lstTinhChatNhiemVu;
        this.lstLinhVuc = data.lstLinhVuc;
        this.lstLanhDaoSo = data.lstLanhDaoSo;
        this.lstDonViPhoiHop = data.lstDonViPhoiHop;
        this.lstDonViChuTri = data.lstDonViChuTri;
      }
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
    this.router.navigate(['/nhiem-vu/duyet-nhiem-vu']);
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

  GetNhiemVu() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getNhiemVu(id.toString()).subscribe(data => {

      const arrayLstMNV = data.lstMocNhiemVu;
      arrayLstMNV.forEach((objLst, index) => {
        this.dataTables.push({
          stt: index + 1,
          thoiHanHoanThanh: objLst.thoiHanHoanThanh,
          ketQuaDuKien: objLst.ketQuaDuKien,
          noiDung: objLst.noiDung,
        });
      });

      const dataForm = data.objTaoNhiemVu;
      console.log(dataForm);
      
      if (dataForm.donViPhoiHopId != null) {
        const arrayString = dataForm.donViPhoiHopId;
        const arrayNumber = arrayString.split(',').reduce((
          a: [number],
          i: number) => {
          a.push(Number(i));
          return a;
        }, []);

        this.ThongTinNhiemVu.patchValue({
          donViPhoiHop: arrayNumber,
        })
      }

      this.ThongTinNhiemVu.patchValue({
        soKiHieu: dataForm.soKyHieu,
        ngayVanBan: new Date(dataForm.ngayVanBan),
        vanBanLienQuan: dataForm.vanBanLienQuan,
        noiDungChinh: dataForm.noiDungChinh,
        mucTieu: dataForm.mucTieuCanDat,
        cacMocChinh: dataForm.cacMocChinh,
        loaiNhiemVu: dataForm.loaiNhiemVuId,
        tinhChatNhiemVu: dataForm.tinhChatNhiemVuId,
        nhomLinhVuc: dataForm.linhVucId,
        trichYeu: dataForm.tenNhiemVu,
        tenDonVi: dataForm.tenSoNganh,
        donViChuTri: dataForm.donViChuTriId,
        lanhDaoSo: dataForm.lanhDaoSoId,
        lanhDaoChiuTrachNhiem: dataForm.lanhDaoDonVi,
        yKienChiDao: dataForm.ykienChiDao,
        thoiGianHoanThanh: dataForm.thoiHanRdo,
        thoiHanHoanThanh: new Date(dataForm.thoiHanHoanThanh),
        ngayChuyenVanBan: new Date(dataForm.ngayChuyenVanBan),
        ghiChu: dataForm.ghiChu,
      })
    })
  }

  CapNhat() {
    this.submitted = true;
    const id = this.route.snapshot.paramMap.get('id');
    const itemData = this.ThongTinNhiemVu.value;
    let taoNhiemVu = {
      id: id,
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
    
    if (this.ThongTinNhiemVu.valid) {
      this.submitted = true;
      this.service.capNhat(taoNhiemVu, id).subscribe(data => {
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

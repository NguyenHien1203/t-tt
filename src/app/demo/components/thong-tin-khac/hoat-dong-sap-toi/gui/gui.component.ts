import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { HoatDongSapToiService } from 'src/app/demo/service/thong-tin-khac/hoat-dong-sap-toi/hoat-dong-sap-toi.service';

@Component({
  selector: 'app-gui',
  templateUrl: './gui.component.html',
  styleUrls: ['./gui.component.scss']
})
export class GuiComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>;

  lstPhongBan: any = [];
  lstPhongBanSelected: any = [];
  phongBans: any[] = [];
  lstNhomNguoiDung: [];
  isCheckedAll: boolean = false;
  phongBan: any;
  nhomNguoiDung: any;
  DsCaNhanDaChon: any[] = [];
  DsCaNhanNhan: any[] = [];
  lstUserNhanOld: any[];
  lstUserChange: any[] = [];
  lstUserChangeUnShow: any[] = [];
  lstUserNhan: any[] = [];

  idDonVi = this.authService.GetDonViLamViec() ?? "0";
  userName = this.authService.GetmUserInfo()?.userName;
  userId = this.authService.GetmUserInfo()?.userId;
  idPhongBan = this.authService.GetmUserInfo()?.phongBanId;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private hoatDongSapToiService: HoatDongSapToiService,
  ) { }

  ngOnInit() {
    this.GetDataPhongBan();
    this.GetDataNhomNguoDung();
  }

  BindData() {

  }

  AddToSelected() {
    var lstCaNhanSelected = this.DsCaNhanDaChon as any[];
    if (lstCaNhanSelected === undefined || lstCaNhanSelected.length === 0) {
      this.messageService.add({
        severity: 'error', summary: 'Lỗi', detail: 'Yêu cầu chọn cá nhân', life: 3000
      });
      return;
    }
    if (this.lstUserNhan != undefined) {
      this.lstUserNhanOld = this.lstUserNhan;
    }

    this.lstUserNhan = this.lstUserChange.filter((user) => lstCaNhanSelected.includes(user.value)).map((user) => user);
    this.lstUserChange = this.lstUserChange.filter((user) => !lstCaNhanSelected.includes(user.value));
    if (this.lstUserNhanOld !== undefined) {
      this.lstUserNhan = this.lstUserNhan.concat(this.lstUserNhanOld);
    }
  }

  RemoveFromSelected() {
    this.lstUserChangeUnShow = [];
    var lstSelectedOpts = this.DsCaNhanNhan as any[];
    if (lstSelectedOpts === undefined || lstSelectedOpts.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Yêu cầu chọn cá nhân', life: 3000 });
      return;
    }

    const oldList = this.lstUserNhan;
    const oldListSelected = lstSelectedOpts;

    lstSelectedOpts = oldList.filter((user) => lstSelectedOpts.includes(user.value)).map((user) => user);
    this.lstUserNhan = this.lstUserNhan.filter((user) => !oldListSelected.includes(user.value)).map((user) => user);

    this.lstUserChange = this.lstUserChange ?? [];
    this.lstUserChange = this.lstUserChange.concat(lstSelectedOpts);
    const lstUserChangeConst = this.lstUserChange;
    this.lstUserChangeUnShow = lstUserChangeConst;
    let lstTmp: any[] = [];
    this.lstUserChange.forEach((user) => {
      if (user && (user.value.toString().split('%')[3] == this.phongBan || user.value.toString().split('%')[3] == this.nhomNguoiDung))
      {
        lstTmp.push(user);
      }
    })
    this.lstUserChange = lstTmp;
  }

  GetDataPhongBan() {
    this.hoatDongSapToiService.danhSachPhongBan(this.idDonVi, this.userName).subscribe(data => {
      this.lstPhongBan = data;
      this.phongBans = data;
    })
  }

  GetDataNhomNguoDung() {
    this.hoatDongSapToiService.danhSachNhomNguoiDung(this.idDonVi, this.idPhongBan, this.userId).subscribe(data => {
      this.lstNhomNguoiDung = data;
    })
  }

  onChangePhongBan(event: any) {
    if (this.lstUserChangeUnShow) {
      this.lstUserChange = this.lstUserChangeUnShow;
    }

    this.nhomNguoiDung = null;
    this.lstUserChange = [];
    let phongBanId: string = event;
    this.hoatDongSapToiService.changePhongBan(phongBanId)
      .subscribe(data => {
        this.lstUserChange = data;
        const lstUserNhanClone = this.lstUserNhan;
        var lstUserClone = lstUserNhanClone.map((x) => x.value);
        this.lstUserChange = this.lstUserChange
          .filter((user) => !lstUserClone.includes(user.value))
          .map((user) => user);
      });
  }

  onChangeNhomNguoiDung(event: any) {
    if (this.lstUserChangeUnShow) {
      this.lstUserChange = this.lstUserChangeUnShow;
    }

    this.phongBan = null;
    this.lstUserChange = [];
    let nhomNguoiDungId: string = event;
    this.hoatDongSapToiService.changeNhomNguoiDung(nhomNguoiDungId)
      .subscribe(data => {
        this.lstUserChange = data;
        const lstUserNhanClone = this.lstUserNhan;
        var lstUserClone = lstUserNhanClone.map((x) => x.value);
        this.lstUserChange = this.lstUserChange
          .filter((user) => !lstUserClone.includes(user.value))
          .map((user) => user);
      })
  }

  TatPopup() {
    this.show = false;
    this.close.emit(this.show);
  }
}

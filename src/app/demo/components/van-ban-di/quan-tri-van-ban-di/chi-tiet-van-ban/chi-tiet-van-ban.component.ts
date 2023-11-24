import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { QuanTriVanBanDi, TimKiemVBDi, VBIDPL, VBIDPLoaiCN, VBIDPLoaiCoBC, VBIDPLoaiKoBC, VanBanNhanGui } from 'src/app/models/van-ban-di/quan-tri-van-ban-di';
import { Message, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanTriVanBanDiService } from 'src/app/demo/service/van-ban-di/quan-tri-van-ban-di/quan-tri-van-ban-di.service';


@Component({
  selector: 'app-chi-tiet-van-ban',
  templateUrl: './chi-tiet-van-ban.component.html',
  styleUrls: ['./chi-tiet-van-ban.component.scss']
})
export class ChiTietVanBanComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Input() idVb: string = '';

  idDonViLamViec: string = this.authService.GetDonViLamViec() ?? "0";
  idDonViLVCha: string = this.authService.GetmUserInfo().donViIdCha ?? "0";
  idPhongBanLV: string = this.authService.GetmUserInfo().phongBanLamViecId ?? "0";
  userNameAdmin: string = this.authService.GetmUserInfo().userAdmin ?? "";

  danhSachVanBanDi: QuanTriVanBanDi[] = [];
  vanBanDi: QuanTriVanBanDi = {};

  lstVBNG_VBIDPL: VBIDPL[] = [];
  vBNG_VBIDPL: VBIDPL = {};
  lstVBNG_VBIDPLoaiCoBC: VBIDPLoaiCoBC[] = [];
  vBNG_VBIDPLoaiCoBC: VBIDPLoaiCoBC = {};
  lstVBNG_VBIDPLoaiKoBC: VBIDPLoaiKoBC[] = [];
  vBNG_VBIDPLoaiKoBC: VBIDPLoaiKoBC = {};
  lstVBNG_VBIDPLoaiCN: VBIDPLoaiCN[] = [];
  vBNG_VBIDPLoaiCN: VBIDPLoaiCN = {};
  CountDVBC: number;
  CountDV: number;
  CountCN: number;
  CountCNPP: number;
  CountDVPP: number;

  vanBanNhanGui: VanBanNhanGui = {};

  constructor(private messageService: MessageService, private authService: AuthService, private quanTriVanBanDiService: QuanTriVanBanDiService) { }

  ngOnInit() {
    
  }

  GetVanBanDi() {
    console.log("idDv page chi tiet: ",this.idDonViLamViec);
    console.log("idDvCha page chi tiet: ", this.idDonViLVCha);
    console.log("idVb page chi tiet: ", this.idVb);
    
    this.quanTriVanBanDiService.getVanBanDi(this.idVb, this.idDonViLamViec, this.idDonViLVCha, this.idPhongBanLV, this.userNameAdmin).subscribe(data => {
      this.vanBanDi = data;
      console.log("1: ", data);
    })

    this.quanTriVanBanDiService.getVanBanNhanGui(this.idVb).subscribe(data => {
      this.vanBanNhanGui = data;
      console.log("2: ", data);
    })

    this.quanTriVanBanDiService.getThongTinDaGui(this.idVb, this.idDonViLamViec).subscribe(data => {
      this.lstVBNG_VBIDPL = data.lstVBNG_VBIDPL;
      this.lstVBNG_VBIDPLoaiCoBC = data.lstVBNG_VBIDPLoaiCoBC;
      this.lstVBNG_VBIDPLoaiKoBC = data.lstVBNG_VBIDPLoaiKoBC;
      this.lstVBNG_VBIDPLoaiCN = data.lstVBNG_VBIDPLoaiCN;
      this.CountDVBC = data.countDVBC;
      this.CountDV = data.countDV;
      this.CountCN = data.countCN;
      this.CountCNPP = data.countCNPP;
      this.CountDVPP = data.countDVPP;
    })
  }

  tatPopup() {
    this.show = false;
    this.close.emit(this.show);
  }
}


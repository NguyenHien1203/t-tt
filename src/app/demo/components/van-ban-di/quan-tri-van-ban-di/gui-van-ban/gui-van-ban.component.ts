import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanTriVanBanDiService } from 'src/app/demo/service/van-ban-di/quan-tri-van-ban-di/quan-tri-van-ban-di.service';
import { QuanTriVanBanDi, VanBanNhanGui } from 'src/app/models/van-ban-di/quan-tri-van-ban-di';

@Component({
  selector: 'app-gui-van-ban',
  templateUrl: './gui-van-ban.component.html',
  styleUrls: ['./gui-van-ban.component.scss']
})
export class GuiVanBanComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Input() idVb: string = '';

  idDonViLamViec: string = this.authService.GetDonViLamViec() ?? "0";
  idDonViLVCha: string = this.authService.GetmUserInfo().donViIdCha ?? "0";
  idPhongBanLV: string = this.authService.GetmUserInfo().phongBanLamViecId ?? "0";
  userNameAdmin: string = this.authService.GetmUserInfo().userAdmin ?? "";

  danhSachVanBanDi: QuanTriVanBanDi[] = [];
  vanBanDi: QuanTriVanBanDi = {};
  
  vanBanNhanGui: VanBanNhanGui = {};

  constructor(private messageService: MessageService, private authService: AuthService, private quanTriVanBanDiService: QuanTriVanBanDiService) { }

  ngOnInit() {

  }

  GetVanBanDi() {
    console.log("idDv page chi tiet: ",this.idDonViLamViec);
    console.log("idDvCha page chi tiet: ", this.idDonViLVCha);
    console.log("idVb page chi tiet: ", this.idVb);
    
    this.quanTriVanBanDiService.getVanBanDi(this.idVb).subscribe(data => {
      this.vanBanDi = data;
      console.log("1: ", data);
    })

    this.quanTriVanBanDiService.getVanBanNhanGui(this.idVb, this.idDonViLamViec, this.idDonViLVCha).subscribe(data => {
      this.vanBanNhanGui = data;
      console.log("2: ", data);
    })
  }


  TatPopup() {
    this.show = false;
    this.close.emit(this.show);
  }
}

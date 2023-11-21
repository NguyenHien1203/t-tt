import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { QuanTriVanBanDi, TimKiemVBDi } from 'src/app/models/van-ban-di/quan-tri-van-ban-di';
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
  @Input() id: string = '';

  danhSachVanBanDi: QuanTriVanBanDi[] = [];
  vanBanDi: QuanTriVanBanDi = {};

  idDonViLamViec: string = this.authService.GetDonViLamViec() ?? "0";
  timChinhXac: boolean = false;
  timKiemDanhSach: TimKiemVBDi = {
    //Row 1
    keyWord: "",
    soKyHieu: "",
    nam: 0,
    thang: 0,
    timChinhXac: 0,
    //Row 2
    ngayBanHanh: "1901-01-01",
    ngayGui: "1901-01-01",
    loaiVanBanId: 0,
    soVanBanId: 0,
    //Row 3
    trichYeu: "",
    trangThai: 0,
    mucDo: 0,
    soDi: 0,

    vanBanId: 0,
    donViId: Number(this.idDonViLamViec),
  }
  

  constructor(private messageService: MessageService, private authService: AuthService, private quanTriVanBanDiService: QuanTriVanBanDiService) { }

  ngOnInit() {

  }

  GetVanBanDi() {
    this.quanTriVanBanDiService.getVanBanDi(this.id).subscribe(data => {
      this.vanBanDi = data;
      console.log(data);
    })
  }

  tatPopup() {
    this.show = false;
    this.close.emit(this.show);
  }
}


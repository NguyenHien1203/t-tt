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

  lstNhiemVu: [];
  lstTinhChatNhiemVu: [];
  lstLinhVuc: [];
  lstLanhDao : [];

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
    ngayVanBan: [new Date(), [Validators.required]],
    vanBanLienQuan: ["", []],
    noiDungChinh: ["", []],
    mucTieu: ["", []],
    cacMocChinh: ["", []],
    loaiNhiemVu: ["", [Validators.required]],
    tinhChatNhiemVu: ["", []],
    nhomLinhVuc: ["", []],
  });

  public GetDataDefaultOption() {
    this.service.GetDataDefaultOption().subscribe(data => {
      if (data.isError) {
      } else {
        console.log(data.objData);


        this.lstNhiemVu = data.objData.lstLoaiNhiemVu;
        this.lstTinhChatNhiemVu = data.objData.lstTinhChatNhiemVu;
        this.lstLinhVuc = data.objData.lstLinhVuc;
      }
    })
  }

}

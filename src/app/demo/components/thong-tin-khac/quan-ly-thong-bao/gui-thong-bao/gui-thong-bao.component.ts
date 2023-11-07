import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyThongBaoService } from 'src/app/demo/service/thong-tin-khac/quan-ly-thong-bao.service';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';

@Component({
  selector: 'app-gui-thong-bao',
  templateUrl: './gui-thong-bao.component.html',
  styleUrls: ['./gui-thong-bao.component.scss']
})
export class GuiThongBaoComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder
    , private service: QuanLyThongBaoService
    , private messageService: MessageService
    , private authService: AuthService
    , private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    let idDonViLamViec = this.authService.GetDonViLamViec();
    let userInfo = this.authService.GetmUserInfo();
    this.service.getDanhSachPhongBan(idDonViLamViec, userInfo?.userName)
      .then(data => {
        this.lstPhongBan = data;
      });

    this.service.getDanhSachNhomNguoiDung(idDonViLamViec, userInfo?.phongBanId, userInfo?.userId)
      .then(data => {
        this.lstNhomNguoiDung = data
      });
  }
  phongBan: any;
  DsCaNhanDaChon: any;
  DsCaNhanNhan: any;
  nhomNguoiDung: any;
  lstUserChange: any;
  lstUserNhan: any;
  lstPhongBan: any[] = [];
  lstNhomNguoiDung: any[] = [];
  quanLyThongBao: any = {};
  submitted: boolean = false;
  formGuiThongBao = this.fb.group({
    id: [0, []],
    tieuDe: ["", [Validators.required]],
    ngayBatDau: [, []],
    ngayKetThuc: [, []],
    donViId: [0, []],
    noiDung: ["", []],
    hienThi: [, []],
    fileName: ["", []],
    filePath: ["", []],
  });

  public Thoat(): void {
    this.formGuiThongBao.reset();
    this.show = false;
    this.tatPopup.emit(this.show);
    this.cd.detectChanges();
  }

  public ThemMoi(): void {
    this.submitted = true;
    if (this.formGuiThongBao.valid) {
      this.quanLyThongBao = this.formGuiThongBao.value;
      this.quanLyThongBao.donViId = this.authService.GetDonViLamViec();
      this.quanLyThongBao.userId = this.authService.GetmUserInfo()?.userId;

      this.service.themMoiQuanLyThongBao(this.quanLyThongBao).subscribe(
        data => {
          console.log('data', data);
          let resData = data as ResponeMessage;
          if (resData.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resData.title });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: resData.title });
            this.Thoat();
          }
        },
        error => {
          console.log('Error', error);
        })
    }
  }

  public onChangePhongBan(event): void {
    this.lstUserChange = [];
    let phongBanId: string = event;
    this.service.changePhongBan(phongBanId)
      .then(data => {
        this.lstUserChange = data;
        console.log(this.lstUserChange)
      });
  }

  public onChangeNhomNguoiDung(event): void {
    this.lstUserChange = [];
    let nhomNguoiDungId: string = event;
    this.service.changeNhomNguoiDung(nhomNguoiDungId)
      .then(data => {
        this.lstUserChange = data;

      });
  }

  public AddToSelected(): void {
    var lstCaNhanSelected = this.DsCaNhanDaChon as any[];
    if (lstCaNhanSelected.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: "Bạn phải chọn cá nhân" });
      return;
    }
    this.lstUserNhan = this.lstUserChange
      .filter(user => lstCaNhanSelected.includes(user.value))
      .map(user => user);
    const lstUserOld = this.lstUserNhan;
    console.log(lstUserOld)
    this.lstUserChange = this.lstUserChange.filter(user => !lstCaNhanSelected.includes(user.value))
    if (lstUserOld.length > 0)
      (this.lstUserNhan as any[]).push(lstUserOld)
  }

  public RemoveFromSelected(): void {

  }
}

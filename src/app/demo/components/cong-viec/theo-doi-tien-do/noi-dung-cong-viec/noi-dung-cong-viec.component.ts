import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TheoDoiTienDoService } from 'src/app/demo/service/cong-viec/theo-doi-tien-do/theo-doi-tien-do.service';
import { XuLyCongViecService } from 'src/app/demo/service/cong-viec/xu-ly-cong-viec.service';
import { ChiTietCongViec } from 'src/app/models/cong-viec/xu-ly-cong-viec';

@Component({
  selector: 'app-noi-dung-cong-viec',
  templateUrl: './noi-dung-cong-viec.component.html',
  styleUrls: ['./noi-dung-cong-viec.component.scss']
})
export class NoiDungCongViecComponent {
  @Input() id: string = '1';
  @Input() stt: string = '1';
  @Input() show: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();

  TenTaiKhoan: string = this.authService.GetmUserInfo().userName;
  lstTraoDoi: any[] = [];

  loading: boolean = true;
  submitted: boolean = false;
  isShowSearch: boolean = false;
  NoiDungThongBao: string = "";

  lstHoSoCongViec: any[] = [];
  lstThongBao: any[] = [];

  lstTrangThai: any[] = [
    { text: 'Đang xử lý', value: 2 },
    { text: 'Xử lý xong', value: 3 },
  ];

  chiTietCongViecs: ChiTietCongViec = {
    soKiHieu: '',
    trichYeu: '',
    noiDungCongViec: '',
    nguoiXuLy: '',
    tuNgay: new Date(),
    denNgay: new Date(),
    thoiGianDuKien: '',
    chiDao: '',
    chuTri: '',
    lstDongChiPhoiHop: [],
    lstDongChiThongBao: [],
    lstFileDinhKemVanBan: [],
    lstFileDinhKemCongViec: [],
    lstCaNhanXuLyCongViec: [],
  };

  public Thoat(): void {
    this.lstHoSoCongViec = [];
    this.submitted = false;
    this.show = false;
    this.tatPopup.emit(this.show);
  }

  constructor(
    private service: TheoDoiTienDoService,
    private XlcvService: XuLyCongViecService,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  public BindDialogData() {
    try {
      this.loading = false;
      this.service.GetChiTietNoiDungCongViec(this.id, this.stt).subscribe(data => {
        if (data.isError) {

        } else {

          this.chiTietCongViecs = data.objData;
          this.GetDataTraoDoi();
          this.GetDataThongBao();
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  public GetDataTraoDoi() {
    this.XlcvService.GetDataTraoDoi(this.id, this.stt).subscribe(data => {
      if (data.isError) {
      } else {
        this.lstTraoDoi = data.objData;

      }
    }, (error) => {
      console.log('Error', error);
    })

  }

  public GetDataThongBao() {
    this.service.GetDataTraoDoi(this.id, this.stt).subscribe(data => {
      if (data.isError) {
      } else {
        this.lstThongBao = data.objData;

      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  public ShowSearch() {
    this.isShowSearch = !this.isShowSearch;
  }

  toggleReply(comment: any) {
    comment.showReply = !comment.showReply;
  }

  submitReply(comment: any) {
    // Add logic to handle submitted reply

    let itemData = {
      idCongViec: this.id.toString(),
      pId: comment.id.toString(),
      stt: this.stt.toString(),
      loai: "",
      noiDung: comment.newReplyText,
      userId: this.authService.GetmUserInfo().userId.toString(),
      donViLamViec: this.authService.GetDonViLamViec()
    }

    this.XlcvService.LuuTraoDoiTheoUser(itemData).subscribe(data => {
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
        setTimeout(() => {
          this.GetDataTraoDoi();
        }, 1000);
      }
    }, (error) => {
      console.log('Error', error);
    })

    comment.showReply = false;
    comment.newReplyText = '';
  }

  public NhacLai() {


    this.service.ThemMoiThongBao(this.NoiDungThongBao, this.stt, this.id).subscribe(data => {
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
        this.NoiDungThongBao = "";
        setTimeout(() => {
          this.Thoat();
        }, 1000);
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

}

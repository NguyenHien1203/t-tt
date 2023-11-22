import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { QuanTriVanBanService } from 'src/app/demo/service/van-ban-den/quan-tri-van-ban/quan-tri-van-ban.service';
import { TimKiemModel, VanBan } from 'src/app/models/van-ban-den/quan-tri-van-ban.model';

@Component({
  selector: 'app-quan-tri-van-ban',
  templateUrl: './quan-tri-van-ban.component.html',
  styleUrls: ['./quan-tri-van-ban.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class QuanTriVanBanComponent implements OnInit {

  constructor(private service: QuanTriVanBanService
    , private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;
  items: any[] = [{ label: 'Danh mục' }, { label: 'cơ quan ban hành' }];
  id: string = "";
  home: any = { icon: 'pi pi-home', routerLink: '/' };
  lienKetDialog: boolean = false;

  //Dữ liêu truyền vào để tìm kiếm
  timChinhXac: boolean = false;
  timKiem: TimKiemModel = {
    trangthai : 0,
    nam : 0,
    thang : 0,
    sokihieu : '',
    TimChinhXac : 0,
    idsovb : 0,
    idloaivb : 0,
    ngtn : new Date,
    ngdn : new Date,
    bhtn : new Date,
    bhdn : new Date,
    sodiden : 0,
    cqbh : '',
    cqbhid : 0,
    trichyeu : '',
    ky : '',
    vbdiden : 0,
    iddonvi : 0,
    CurrentPage : 0,
    RowPerPage : 0,
    ItemId : 0,
    mucdo : 0,
    soan : '',
    ghichu : '',
    vanban : '',
    iPhanLoaiDV : 0,
    cap : 0,
  }

  vanBans : VanBan[] = [];
  selectedState: any = null;
  loading: boolean = true;

  ngOnInit(): void {
    this.items = [{ label: 'Văn bản đến' }, { label: 'Quản trị văn bản' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.loading = false;
    //Trỏ đến get danh sách
    this.LoadDanhSach(this.timKiem);
  }

  //Thay đổi giá trị checkbox tìm kiếm
  public CheckChinhXac(): void {
    this.timChinhXac = !this.timChinhXac;
  }

  //#region 
  // Get List Van Ban
  public LoadDanhSach(timkiems: TimKiemModel) {
    this.timKiem.TimChinhXac = this.timChinhXac ? 1 : 0;
    this.service.getDanhSachvanBan(timkiems).then(data => { this.vanBans = data; console.log(data) }
    )
  };
  //#endregion

  public ThemMoi(): void {
    this.hienThiThemMoi = true;
  }

  public CapNhat(id: string): void {
    this.hienThiCapNhat = true;
    this.id = id;
  }

  public Thoat(itemHt: any, loai: string): void {
    if (loai === 'T')
      this.hienThiThemMoi = false;
    else
      this.hienThiCapNhat = false;
    this.LoadDanhSach(this.timKiem);
  }

}

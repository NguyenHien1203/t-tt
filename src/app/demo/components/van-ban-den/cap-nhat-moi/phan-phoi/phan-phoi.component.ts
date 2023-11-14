import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-den/cap-nhat-moi/cap-nhat-moi.service';
import { saveAs } from 'file-saver';
import { AuthService } from 'src/app/common/auth.services';

@Component({
  selector: 'app-phan-phoi',
  templateUrl: './phan-phoi.component.html',
  styleUrls: ['./phan-phoi.component.scss']
})
export class PhanPhoiComponent {
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  @Input() id: string = '1';
  ThongTinVanBan: any;
  ThongTinFile: any[] = [];
  LstPhongBan: any = [];
  LstNhomNguoiDung: [];
  sltPhongBan: any[] = [];
  phongBan: any;
  nhomNguoiDung: any;
  DsCaNhanDaChon: any[] = [];
  DsCaNhanNhan: any[] = [];
  lstUserNhanOld: any[];
  lstUserChange: any[] = [];
  lstUserChangeUnShow: any[] = [];
  lstUserNhan: any[] = [];

  submitted: boolean = false;

  constructor(
    private capnhatmoiSevice: CapNhatMoiService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private service: MessageService,
    private auth: AuthService
  ) {
  }

  public formPhanPhoi = this.formBuilder.group({
    id: ["", []],
  });


  /**
   * BindDataDialog
   */
  public BindDataDialog() {
    this.GetVanBanNhanGuiById(this.id)
    this.GetDataPhongBan();
    this.GetDataNhomNguoiDung();

    this.capnhatmoiSevice.GetCaNhanPhanPhoi(this.id).subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.lstUserNhan = data.objData;
      }
    })


    this.capnhatmoiSevice.GetPhongBanPhanPhoi(this.id).subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        console.log(data.objData);
        this.sltPhongBan = data.objData;
      }
    })
  }

  /**
   * Load dữ liệu văn bản 
  */
  public GetVanBanNhanGuiById(idVanBan: string) {
    this.capnhatmoiSevice.GetVanBanNhanGuiById(idVanBan).subscribe(data => {
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
      } else {
        this.ThongTinVanBan = data.objData.objVanBan;
        this.ThongTinFile = data.objData.lstFile;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  /**
   * Thoat
   */
  public Thoat(): void {
    this.submitted = false;
    this.hienThi = false;
    this.tatPopup.emit(this.hienThi);
  }

  /**
   * DownloadFile
   */
  public DownloadFile(filepath: string, filename: string) {
    this.capnhatmoiSevice.DownloadFile(filepath).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      saveAs(blob, filename);
    }, error => {
      console.error('Lỗi khi tải tệp: ', error);
    });
  }

  /**
   * GetDataPhongBan
   */
  public GetDataPhongBan() {
    this.capnhatmoiSevice.GetDataPhongBan().subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.LstPhongBan = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  /**
   * GetDataPhongBan
   */
  public GetDataNhomNguoiDung() {
    this.capnhatmoiSevice.GetDataNhomNguoiDung().subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {

        this.LstNhomNguoiDung = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  public AddToSelected(): void {
    var lstCaNhanSelected = this.DsCaNhanDaChon as any[];//lấy ds cá nhân đã chọn từ userbind
    if (lstCaNhanSelected === undefined || lstCaNhanSelected.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: "Yêu cầu chọn cá nhân" });
      return;
    }
    if (this.lstUserNhan !== undefined) {
      this.lstUserNhanOld = this.lstUserNhan;//gán giá trị lst user nhận đang có (nếu có)
    }

    this.lstUserNhan = this.lstUserChange
      .filter(user => lstCaNhanSelected.includes(user.value))
      .map(user => user); // chuyển đổi options đã chọn từ userbind ra list cá nhân nhận
    this.lstUserChange = this.lstUserChange.filter(user => !lstCaNhanSelected.includes(user.value))
    if (this.lstUserNhanOld !== undefined) {
      this.lstUserNhan = this.lstUserNhan.concat(this.lstUserNhanOld);//add phần user nhận cũ và phần userchange mới vừa chuyển sang
    }
  }

  public RemoveFromSelected(): void {
    this.lstUserChangeUnShow = [];
    var lstselectedOpts = this.DsCaNhanNhan as any[];//Lấy cá nhân đã selected
    if (lstselectedOpts === undefined || lstselectedOpts.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: "Yêu cầu chọn cá nhân" });
      return;
      //trả ra toast lỗi nếu chưa chọn cá nhân
    }
    const oldList = this.lstUserNhan; // gán mặc định list user nhận hiện tại để lọc k đổi giá trị
    const onlListSelected = lstselectedOpts; // gán mặc định list user nhận đã chọn
    lstselectedOpts = oldList.filter(user => lstselectedOpts.includes(user.value)).map(user => user);//lọc ra nhưng user đã chọn dạng object[]
    this.lstUserNhan = this.lstUserNhan.filter(user => !onlListSelected.includes(user.value)).map(user => user);// xóa đi những option đã chọn bên lst nhận
    this.lstUserChange = this.lstUserChange ?? []; //check list userbind từ pb/ngd null or underfine thì khỏi tạo
    this.lstUserChange = this.lstUserChange.concat(lstselectedOpts); // chuyển những options đã chọn vào list userbind
    const lstUserChangeConst = this.lstUserChange;
    this.lstUserChangeUnShow = lstUserChangeConst;
    let lstTmp: any[] = [];
    this.lstUserChange.forEach((user) => {//lọc ra những bản ghi thuộc nhóm người dùng hoặc phòng ban đang selected
      if (user && (user.value.toString().split("%")[3] == this.phongBan || user.value.toString().split("%")[3] == this.nhomNguoiDung)) {
        lstTmp.push(user);
      }
    })
    this.lstUserChange = lstTmp;
  }

  public onChangePhongBan(event): void {
    if (this.lstUserChangeUnShow)
      this.lstUserChange = this.lstUserChangeUnShow;
    this.nhomNguoiDung = null;//đổi phòng ban thì reset ngd
    this.lstUserChange = [];
    let phongBanId: string = event;
    this.capnhatmoiSevice.changePhongBan(phongBanId)
      .then(data => {
        this.lstUserChange = data;
        const lstUseNhanClone = this.lstUserNhan;
        var lstUserClone = lstUseNhanClone.map(x => x.value);//tương tự như nhóm ngd
        this.lstUserChange = this.lstUserChange.filter(user => !lstUserClone.includes(user.value)).map(user => user);
      });
  }

  public onChangeNhomNguoiDung(event): void {
    if (this.lstUserChangeUnShow)
      this.lstUserChange = this.lstUserChangeUnShow;
    this.phongBan = null;//đổi phòng ban thì reset pb
    this.lstUserChange = [];//tránh trường hợp undefine
    let nhomNguoiDungId: string = event;//tránh trường hợp undefine
    this.capnhatmoiSevice.changeNhomNguoiDung(nhomNguoiDungId)
      .then(data => {
        this.lstUserChange = data;
        const lstUseNhanClone = this.lstUserNhan;
        var lstUserClone = lstUseNhanClone.map(x => x.value);//lọc ra những cá nhân không tồn tại bên ds cá nhân nhận
        this.lstUserChange = this.lstUserChange.filter(user => !lstUserClone.includes(user.value)).map(user => user);
      });
  }

  //Phân phối văn bản
  public PhanPhoi(): void {
    this.submitted = true;
    let itemData: any = {
      vanBanId: this.id.toString(),
      lstUser: JSON.stringify(this.lstUserNhan),
      lstPhongBan: JSON.stringify(this.sltPhongBan),
      donViLamViec: this.auth.GetDonViLamViec()
    }

    console.log(this.sltPhongBan)

    // this.capnhatmoiSevice.PhanPhoiVanBan(itemData).subscribe(data => {
    //   if (data.isError) {
    //     console.log("Dữ liệu không hợp lệ")
    //   } else {
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
    //     this.Thoat();
    //   }
    // }, (error) => {
    //   console.log('Error', error);
    // })
  }



}

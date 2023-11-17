import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-di/cap-nhat-moi.service';
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-phan-phoi',
  templateUrl: './phan-phoi.component.html',
  styleUrls: ['./phan-phoi.component.scss']
})
export class PhanPhoiComponent {
  @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() id: string = '1';

    constructor(
        private service: CapNhatMoiService,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private uploadFileService: UploadFileService
    ) {
        this.GetDataPhongBan();
        this.GetDataNhomNguoiDung();
    }
    showLinkedRisksOnly: any;
    ThongTinVanBan: any;
    ThongTinFile: any[] = [];
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
    submitted: boolean = false;
    idDonViLamViec = this.authService.GetDonViLamViec() ?? '0';
    userName = this.authService.GetmUserInfo()?.userName;
    userId = this.authService.GetmUserInfo()?.userId;
    idPhongBan = this.authService.GetmUserInfo()?.phongBanId;
    public formPhanPhoi = this.formBuilder.group({
        id: ['', []],
    });

    public async BindDataDialog() {
        this.service.getVanBanById(this.id).then(
            (data) => {
                if (data.isError) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.title,
                    });
                } else {
                    this.ThongTinVanBan = data.objVanBan;
                    this.ThongTinFile = data.lstFile;
                }
            },
            (error) => {
                console.log('Error', error);
            }
        );

        const selectedPhongBans = await this.service.getPhongBanSelected(
            this.id,
            this.idDonViLamViec
        );

        this.phongBans = this.phongBans.map((phongBan) => ({
            ...phongBan,
            check: selectedPhongBans.includes(Number(phongBan.value)),
        }));
        this.isCheckedAll =
            this.phongBans.filter((x) => x.check == true).length ===
            this.phongBans.length;

        this.service
            .getDanhSachCaNhanDaPhanPhoi(this.id, this.idDonViLamViec) //bind cá nhân phòng ban đã gửi từ db
            .then((data) => {
                this.lstUserNhan = data;
            });
    }

    public Thoat(): void {
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public DownloadFile(filepath: string, filename: string) {
        let urlDownLoad = '/VanBanDi/CapNhatMoi/DownloadFile';
        this.uploadFileService
            .downloadFile(filepath, filename, urlDownLoad)
            .subscribe(
                (data) => {
                    const blob = new Blob([data], {
                        type: 'application/octet-stream',
                    });
                    saveAs(blob, filename);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Tải tệp thành công',
                    });
                },
                (error: any) => {
                    if (error.status === 404) {
                        // Xử lý lỗi 404 (NotFound)
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Không tìm thấy đường dẫn file',
                        });
                        // Ví dụ: Hiển thị thông báo lỗi cho người dùng
                    } else {
                        // Xử lý các lỗi khác
                        console.error('Đã xảy ra lỗi', error);
                        // Thực hiện các hành động tương ứng
                    }
                    return throwError(() => error);
                }
            );
    }

    public GetDataPhongBan() {
        this.service
            .getDanhSachPhongBan(this.idDonViLamViec, this.userName)
            .then((data) => {
                this.lstPhongBan = data;
                this.phongBans = data;
            });
    }

    public GetDataNhomNguoiDung() {
        this.service
            .getDanhSachNhomNguoiDung(
                this.idDonViLamViec,
                this.idPhongBan,
                this.userId
            )
            .then((data) => {
                this.lstNhomNguoiDung = data;
            });
    }

    public AddToSelected(): void {
        var lstCaNhanSelected = this.DsCaNhanDaChon as any[]; //lấy ds cá nhân đã chọn từ userbind
        if (lstCaNhanSelected === undefined || lstCaNhanSelected.length === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Yêu cầu chọn cá nhân',
            });
            return;
        }
        if (this.lstUserNhan !== undefined) {
            this.lstUserNhanOld = this.lstUserNhan; //gán giá trị lst user nhận đang có (nếu có)
        }

        this.lstUserNhan = this.lstUserChange
            .filter((user) => lstCaNhanSelected.includes(user.value))
            .map((user) => user); // chuyển đổi options đã chọn từ userbind ra list cá nhân nhận
        this.lstUserChange = this.lstUserChange.filter(
            (user) => !lstCaNhanSelected.includes(user.value)
        );
        if (this.lstUserNhanOld !== undefined) {
            this.lstUserNhan = this.lstUserNhan.concat(this.lstUserNhanOld); //add phần user nhận cũ và phần userchange mới vừa chuyển sang
        }
    }

    public RemoveFromSelected(): void {
        this.lstUserChangeUnShow = [];
        var lstselectedOpts = this.DsCaNhanNhan as any[]; //Lấy cá nhân đã selected
        if (lstselectedOpts === undefined || lstselectedOpts.length === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Yêu cầu chọn cá nhân',
            });
            return;
            //trả ra toast lỗi nếu chưa chọn cá nhân
        }
        const oldList = this.lstUserNhan; // gán mặc định list user nhận hiện tại để lọc k đổi giá trị
        const oldListSelected = lstselectedOpts; // gán mặc định list user nhận đã chọn
        lstselectedOpts = oldList
            .filter((user) => lstselectedOpts.includes(user.value))
            .map((user) => user); //lọc ra nhưng user đã chọn dạng object[]
        this.lstUserNhan = this.lstUserNhan
            .filter((user) => !oldListSelected.includes(user.value))
            .map((user) => user); // xóa đi những option đã chọn bên lst nhận
        this.lstUserChange = this.lstUserChange ?? []; //check list userbind từ pb/ngd null or underfine thì khỏi tạo
        this.lstUserChange = this.lstUserChange.concat(lstselectedOpts); // chuyển những options đã chọn vào list userbind
        const lstUserChangeConst = this.lstUserChange;
        this.lstUserChangeUnShow = lstUserChangeConst;
        let lstTmp: any[] = [];
        this.lstUserChange.forEach((user) => {
            //lọc ra những bản ghi thuộc nhóm người dùng hoặc phòng ban đang selected
            if (
                user &&
                (user.value.toString().split('%')[3] == this.phongBan ||
                    user.value.toString().split('%')[3] == this.nhomNguoiDung)
            ) {
                lstTmp.push(user);
            }
        });
        this.lstUserChange = lstTmp;
    }

    public onChangePhongBan(event): void {
        if (this.lstUserChangeUnShow)
            this.lstUserChange = this.lstUserChangeUnShow;
        this.nhomNguoiDung = null; //đổi phòng ban thì reset ngd
        this.lstUserChange = [];
        let phongBanId: string = event;
        this.service.changePhongBan(phongBanId).then((data) => {
            this.lstUserChange = data;
            const lstUseNhanClone = this.lstUserNhan;
            var lstUserClone = lstUseNhanClone.map((x) => x.value); //tương tự như nhóm ngd
            this.lstUserChange = this.lstUserChange
                .filter((user) => !lstUserClone.includes(user.value))
                .map((user) => user);
        });
    }

    public onChangeNhomNguoiDung(event): void {
        if (this.lstUserChangeUnShow)
            this.lstUserChange = this.lstUserChangeUnShow;
        this.phongBan = null; //đổi phòng ban thì reset pb
        this.lstUserChange = []; //tránh trường hợp undefine
        let nhomNguoiDungId: string = event; //tránh trường hợp undefine
        this.service.changeNhomNguoiDung(nhomNguoiDungId).then((data) => {
            this.lstUserChange = data;
            const lstUseNhanClone = this.lstUserNhan;
            var lstUserClone = lstUseNhanClone.map((x) => x.value); //lọc ra những cá nhân không tồn tại bên ds cá nhân nhận
            this.lstUserChange = this.lstUserChange
                .filter((user) => !lstUserClone.includes(user.value))
                .map((user) => user);
        });
    }

    public PhanPhoi(): void {
        this.submitted = true;

        let itemData: any = {
            idVanBan: this.id?.toString(),
            idDonViLamViec: this.authService.GetDonViLamViec(),
            lstCaNhanPhanPhoi: this.lstUserNhan.map((user) => user.value),
            lstPhongBanPhanPhoi: this.phongBans
                .filter((x) => x.check == true)
                .map((phongBan) => phongBan.value),
        };

        this.service.phanPhoi(itemData).subscribe(
            (data) => {
                if (data.isError) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.title,
                    });
                } else {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: data.title,
                    });
                    this.Thoat();
                }
            },
            (error) => {
                console.log('Error', error);
            }
        );
    }

    public checkAll(event) {
        this.phongBans.forEach(function (val, key) {
            val.check = event;
        });
    }

    public checkSingle(event, idPhongBan) {
        this.phongBans = this.phongBans.map((phongBan) => {
            if (idPhongBan === phongBan.value) {
                return { ...phongBan, check: event };
            } else {
                return { ...phongBan };
            }
        });
        this.isCheckedAll =
            this.phongBans.filter((x) => x.check == true).length ===
            this.phongBans.length;
    }
}

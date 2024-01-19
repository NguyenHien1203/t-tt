import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isLowSurrogateHalf } from '@ckeditor/ckeditor5-utils';
import { isThisSecond } from 'date-fns';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { NhomTaiKhoanDonViService } from 'src/app/demo/service/he-thong/nhom-tai-khoan-don-vi.service';
import { TreeNode } from 'src/app/models/ho-so-cong-viec/danh-muc-ho-so-ca-nhan';
import { modelOptions } from 'src/app/models/option-model';

@Component({
    selector: 'app-them-nguoi-dung',
    templateUrl: './them-nguoi-dung.component.html',
    styleUrls: ['./them-nguoi-dung.component.scss'],
})
export class ThemNguoiDungComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() id: string = '1';

    constructor(
        private service: NhomTaiKhoanDonViService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}
    lstPhongBan: any = [];
    objNhomTaiKhoanPhongBan: any = [];
    lstPhongBanSelected: any = [];
    phongBans: any[] = [];
    phongBan: any;
    selectedNodes: any;
    DsCaNhanDaChon: any[] = [];
    DsCaNhanNhan: any[] = [];
    lstUserNhanOld: any[];
    lstUserChange: any[] = [];
    lstUserChangeUnShow: any[] = [];
    lstUserNhan: any[] = [];
    lstDonVi: TreeNode[] = [];
    submitted: boolean = false;
    idDonViLamViec = this.authService.GetDonViLamViec() ?? '0';
    userId = this.authService.GetmUserInfo()?.userId;
    idPhongBan = this.authService.GetmUserInfo()?.phongBanId;

    public async BindDataDialog() {
        try {
            this.lstUserChange = [];
            this.phongBan = null;
            this.lstDonVi = await this.service.getDanhSachDonVi();
            this.objNhomTaiKhoanPhongBan =
                await this.service.getTaiKhoanDonViById(this.id);
            this.lstUserNhan =
                (await this.service.getDanhSachCaNhanDaThem(this.id)) ?? []; //bind cá nhân phòng ban đã gửi từ db
        } catch (error) {
            console.log(error);
        }
    }

    public Thoat(): void {
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
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
            if (user && user.value.toString().split('-')[1] == this.phongBan) {
                lstTmp.push(user);
            }
        });
        this.lstUserChange = lstTmp;
    }

    public async onChangeDonVi(event): Promise<void> {
        try {
            this.lstPhongBan = [];
            if (event != null) {
                this.lstPhongBan = await this.service.getThongTinDonVi(
                    event.data
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    public onChangePhongBan(event): void {
        if (this.lstUserChangeUnShow)
            this.lstUserChange = this.lstUserChangeUnShow;
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

    public ThemCaNhan(): void {
        this.submitted = true;
        let itemData: any = {
            idNhomNguoiDung: this.id?.toString(),
            lstUserDaChon: this.lstUserNhan.map((user) => user.value),
        };
        this.service.themMoiCaNhan(itemData).subscribe(
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
}

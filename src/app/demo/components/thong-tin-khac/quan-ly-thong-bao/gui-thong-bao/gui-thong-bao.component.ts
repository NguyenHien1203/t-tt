import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyThongBaoService } from 'src/app/demo/service/thong-tin-khac/quan-ly-thong-bao.service';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';

@Component({
    selector: 'app-gui-thong-bao',
    templateUrl: './gui-thong-bao.component.html',
    styleUrls: ['./gui-thong-bao.component.scss'],
})
export class GuiThongBaoComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() id: string = '1';

    constructor(
        private fb: FormBuilder,
        private service: QuanLyThongBaoService,
        private messageService: MessageService,
        private authService: AuthService,
        private cd: ChangeDetectorRef
    ) {}

    phongBan: any;
    DsCaNhanDaChon: any[] = [];
    DsCaNhanNhan: any[] = [];
    nhomNguoiDung: any;
    lstUserNhanOld: any[];
    lstUserChange: any[] = [];
    lstUserChangeUnShow: any[] = [];
    lstUserNhan: any[] = [];
    lstPhongBan: any[] = [];
    lstNhomNguoiDung: any[] = [];
    submitted: boolean = false;

    public Thoat(): void {
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public BindDialogData(): void {
        this.phongBan = null;
        this.nhomNguoiDung = null;
        this.lstUserChange = [];
        let idDonViLamViec = this.authService.GetDonViLamViec();
        let userInfo = this.authService.GetmUserInfo();
        this.service
            .getDanhSachPhongBan(idDonViLamViec, userInfo?.userName)
            .then((data) => {
                this.lstPhongBan = data;
            });

        this.service
            .getDanhSachNhomNguoiDung(
                idDonViLamViec,
                userInfo?.phongBanId,
                userInfo?.userId
            )
            .then((data) => {
                this.lstNhomNguoiDung = data;
            });

        this.service
            .getDanhSachDonViDaGui(this.id, idDonViLamViec) //bind cá nhân phòng ban đã gửi từ db
            .then((data) => {
                this.lstUserNhan = data;
            });
    }

    public onChangePhongBan(event): void {
        if (this.lstUserChangeUnShow)
            this.lstUserChange = this.lstUserChangeUnShow;
        this.nhomNguoiDung = null; //đổi phòng ban thì reset ngd
        this.lstUserChange = [];
        let phongBanId: string = event;
        this.service.changePhongBan(phongBanId).then((data) => {
            this.lstUserChange = data ?? [];
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
            this.lstUserChange = data ?? [];
            const lstUseNhanClone = this.lstUserNhan;
            var lstUserClone = lstUseNhanClone.map((x) => x.value); //lọc ra những cá nhân không tồn tại bên ds cá nhân nhận
            this.lstUserChange = this.lstUserChange
                .filter((user) => !lstUserClone.includes(user.value))
                .map((user) => user);
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
            this.lstUserNhan = this.RemoveDuplicates(this.lstUserNhan, 'value');
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

    RemoveDuplicates(arr, prop) {
        const uniqueSet = new Set(arr.map((item) => item[prop].split('%')[0]));
        return Array.from(uniqueSet).map((uniqueProp) =>
            arr.find((item) => item[prop].split('%')[0] === uniqueProp)
        );
    }

    public Gui(): void {
        this.submitted = true;
        let itemData: any = {
            thongBaoId: this.id,
            donViId: this.authService.GetDonViLamViec(),
            listPhongBanDaChon: this.lstUserNhan,
        };
        this.service.guiThongBao(itemData).subscribe(
            (data) => {
                let resData = data as ResponeMessage;
                if (resData.isError) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: resData.title,
                    });
                } else {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: resData.title,
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

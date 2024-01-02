import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DanhSachBanGiaoCongViecService } from 'src/app/demo/service/cong-viec/danh-sach-ban-giao-cong-viec/danh-sach-ban-giao-cong-viec.service';

@Component({
    selector: 'app-them-moi-ban-giao-cong-viec',
    templateUrl: './them-moi-ban-giao-cong-viec.component.html',
    styleUrls: ['./them-moi-ban-giao-cong-viec.component.scss'],
})
export class ThemMoiBanGiaoCongViecComponent {
    constructor(
        // private taikhoanService: TaiKhoanService,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private Service: DanhSachBanGiaoCongViecService
    ) {}

    //Lấy giá trị Hiển thị từ trang chủ truyền vào
    @Input() show: boolean = false;
    //Trả ra nút đóng popuơ
    @Output() tatPopup = new EventEmitter<boolean>();

    lstNguoiNhan: any = [];
    tenNguoiNhan: string = this.authService.GetmUserInfo().name?.toString();
    idDonViLamViec: string = this.authService.GetmUserInfo().donViId ?? '0';
    userId: string = this.authService.GetmUserInfo().userId ?? '0';

    //#region Khai báo biến
    //Khai báo biến sử dụng
    submitted = false;
    congViec: any;
    //Hàm đóng pop up
    public Thoat(): void {
        this.show = false;
        this.formThemMoi.reset();
        this.submitted = false;
        this.tatPopup.emit(this.show);
    }

    ngOnInit(): void {
        this.GetNguoiNhan();
    }

    public formThemMoi = this.formBuilder.group({
        Id: [0, []],
        idNguoiBanGiao: [0, []],
        idNguoiNhanBanGiao: [0, [Validators.required]],
        ngayBanGiao: [new Date(), []],
        noiDung: ['', []],
    });

    //Get danh sach NguoiNhan
    public GetNguoiNhan() {
        this.Service.getNguoiNhan(this.idDonViLamViec, this.userId).then(
            (data) => {
                this.lstNguoiNhan = data;
            }
        );
    }
    //Hết

    //#region Thêm mới
    //Thêm mới
    public ThemMoiCongViec(): void {
        this.submitted = true;
        if (this.formThemMoi.valid) {
            this.congViec = this.formThemMoi.value;
            this.congViec.idNguoiBanGiao =
                this.authService.GetmUserInfo().userId ?? '0';
              this.Service.addCoQuan(this.congViec).subscribe(data => {
                if (data.isError) {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
                } else {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
                  this.Thoat();
                }
              }, (error) => {
                console.log('Error', error);
              })
        }
    }
    //#endregion
}

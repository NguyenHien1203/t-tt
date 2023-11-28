import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyChuyenMucCauHoiService } from 'src/app/demo/service/thong-tin-khac/quan-ly-chuyen-muc-cau-hoi.service';
import { TimKiemChuyenMucCauHoi } from 'src/app/models/thong-tin-khac/quan-ly-chuyen-muc-cau-hoi';

@Component({
  selector: 'app-quan-ly-chuyen-muc-cau-hoi',
  templateUrl: './quan-ly-chuyen-muc-cau-hoi.component.html',
  styleUrls: ['./quan-ly-chuyen-muc-cau-hoi.component.scss'],
  providers : [MessageService, ConfirmationService]
})
export class QuanLyChuyenMucCauHoiComponent {

  constructor(
    private service: QuanLyChuyenMucCauHoiService,
    private messageService: MessageService,
    private confirmService: ConfirmationService,
    private authService: AuthService,
) {}

idDonViLamViec = this.authService.GetDonViLamViec() ?? "0";
public hienThiThemMoi: boolean = false;
public hienThiCapNhat: boolean = false;
public hienThiTraLoi: boolean = false;
public id: string = '1';
public loading: boolean = true;
public home = { icon: 'pi pi-home', routerLink: '/' };
public items = [
    { label: 'Thông tin khác' },
    { label: 'Quản lý câu hỏi thường gặp' },
];
public timChinhXac: boolean = false;
public timKiemDanhSach: TimKiemChuyenMucCauHoi = {
    keyWord: '',
    hienThi: 2,
    donViId: Number(this.idDonViLamViec),
    timChinhXac: 0,
};
lstHienThi: SelectItem[] = [
    { label: 'Chọn hình thức', value: 3 },
    { label: 'Không hiển thị', value: 0 },
    { label: 'Hiển thị', value: 1 },
];
lstTrangThai: SelectItem[] = [
    { label: 'Chọn trạng thái', value: 7 },
    { label: 'Chưa trả lời', value: 8 },
    { label: 'Đã trả lời', value: 9 },
];
lstChuyenMucCauHoi: any[] = [];

ngOnInit(): void {
    this.loading = false;
    this.LoadDanhSach();
}

public ThemMoi(): void {
    this.hienThiThemMoi = true;
}

public CapNhat(id: string): void {
    this.hienThiCapNhat = true;
    this.id = id;
}

public Xoa(id: string) {
    this.confirmService.confirm({
        message: 'Bạn có chắc chắn xác nhận xóa chuyên mục câu hỏi?',
        header: 'Xác nhận',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.service.xoaCauHoiThuongGap(id).subscribe(
                (data) => {
                    if (data.isError) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: data.title,
                        });
                    } else {
                        this.LoadDanhSach();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: data.title,
                        });
                    }
                },
                (error) => {
                    console.log('Error', error);
                }
            );
        },
        reject: () => {},
    });
}

public Thoat(itemHt: any, loai: string): void {
    if (loai === 'T') this.hienThiThemMoi = false;
    if (loai === 'C') this.hienThiCapNhat = false;
    if (loai === 'TL') this.hienThiTraLoi = false;
    this.LoadDanhSach();
}

public LoadDanhSach(): void {
    this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
    this.service
        .getDanhSachQuanLyCauHoiThuongGap(this.timKiemDanhSach)
        .then((data) => {
            this.lstChuyenMucCauHoi = data;
        });
}

public CheckedHt(): void {
    this.timChinhXac = !this.timChinhXac;
}
}

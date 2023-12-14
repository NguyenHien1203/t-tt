import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { XuLyCongViecService } from 'src/app/demo/service/cong-viec/xu-ly-cong-viec.service';
import { ChiTietCongViec } from 'src/app/models/cong-viec/xu-ly-cong-viec';

@Component({
    selector: 'app-chi-tiet-cong-viec',
    templateUrl: './chi-tiet-cong-viec.component.html',
    styleUrls: ['./chi-tiet-cong-viec.component.scss']
})
export class ChiTietCongViecComponent {
    @Input() id: string = '1';
    @Input() cap: string = '1';
    @Input() loai: string = '1';
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    isShowSearch: boolean = false;
    lstTraoDoi: any[] = [];
    TenTaiKhoan: string = this.authService.GetmUserInfo().userName;

    NoiDungTraoDoi : string = '';

    comments = [
        {
            author: 'User1',
            text: 'This is the first comment.',
            timestamp: new Date(),
            replies: [
                {
                    author: 'User2',
                    text: 'Reply to the first comment.',
                    timestamp: new Date()
                },
                {
                    author: 'User3',
                    text: 'Another reply to the first comment.',
                    timestamp: new Date()
                }
            ]
        },
        {
            author: 'User4',
            text: 'This is the second comment.',
            timestamp: new Date(),
            replies: [] // Make sure to initialize replies array
        }
    ];

    toggleReply(comment: any) {
        comment.showReply = !comment.showReply;
    }

    submitReply(comment: any) {
        // Add logic to handle submitted reply
        console.log(comment.newReplyText);
        console.log(comment.id);

        let itemData = {
            idCongViec: this.id.toString(),
            pId: comment.id.toString(),
            stt: this.cap.toString(),
            loai: this.loai.toString(),
            noiDung: comment.newReplyText,
            userId: this.authService.GetmUserInfo().userId.toString(),
            donViLamViec: this.authService.GetDonViLamViec()
        }

        this.service.LuuTraoDoiTheoUser(itemData).subscribe(data => {
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


    constructor(
        private service: XuLyCongViecService,
        private messageService: MessageService,
        private authService: AuthService
    ) { }

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

    loading: boolean = true;
    submitted: boolean = false;
    lstHoSoCongViec: any[] = [];
    lstTrangThai: any[] = [
        { text: 'Đang xử lý', value: 2 },
        { text: 'Xử lý xong', value: 3 },
    ];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';

    ngOnInit() {
        this.loading = false;
    }

    public async BindDialogData() {
        try {
            const data = await this.service.getDataViewChiTiet(
                this.id,
                this.cap,
                this.loai
            );

            if (data != null) {
                this.chiTietCongViecs = data;
            }

            this.GetDataTraoDoi();
        } catch (error) {
            console.log(error);
        }
    }

    public ChangeHoSoCongViec(event) { }

    public Thoat(): void {
        this.lstHoSoCongViec = [];
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public ChonHoSo() {
        this.submitted = true;
    }

    public GetDataTraoDoi() {
        this.service.GetDataTraoDoi(this.id, this.cap).subscribe(data => {
            if (data.isError) {
            } else {
                this.lstTraoDoi = data.objData;
                console.log(data.objData);
            }
        }, (error) => {
            console.log('Error', error);
        })

    }

    public ShowSearch() {
        this.isShowSearch = !this.isShowSearch;
    }

    public GuiTraoDoi() {
        let itemData = {
            idCongViec: this.id.toString(),
            pId: "",
            stt: this.cap.toString(),
            loai: this.loai.toString(),
            noiDung: this.NoiDungTraoDoi,
            userId: this.authService.GetmUserInfo().userId.toString(),
            donViLamViec: this.authService.GetDonViLamViec()
        }

        this.service.LuuTraoDoiTheoUser(itemData).subscribe(data => {
            if (data.isError) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
            } else {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
                setTimeout(() => {
                    this.GetDataTraoDoi();
                }, 1000);
                this.NoiDungTraoDoi ="";
            }
        }, (error) => {
            console.log('Error', error);
        })
    }
}

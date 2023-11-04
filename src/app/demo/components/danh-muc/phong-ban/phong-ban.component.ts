import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { DmPhongBan, TimKiemModel } from 'src/app/demo/api/danh-muc/phong-ban';
import { PhongbanService } from 'src/app/demo/service/danh-muc/phong-ban/phongban.service';

@Component({
    templateUrl: './phong-ban.component.html',
    styleUrls: ["./phong-ban.component.scss"],
    providers: [MessageService, ConfirmationService]
})
export class PhongBanComponent implements OnInit {
    breadcrumbItems: MenuItem[] = [];
    danhmuc: DmPhongBan[] = [];
    phongBans: DmPhongBan[] = [];
    msgs: Message[] = [];
    timkiems: TimKiemModel = {
        keyWord: "",
        Nam: 0,
        TuNgay: new Date(),
        DenNgay: new Date()
    };

    id: string = "";
    
    hienThiThemMoi: boolean = false;
    hienThiCapNhat: boolean = false;

    TuKhoa: string = '';

    items: any[] = [];

    home: any;

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService, private messageService: MessageService, private dmPhongBanService: PhongbanService, private confirmationService: ConfirmationService,) { }

    ngOnInit(): void {

        this.items = [{ label: 'Danh mục' }, { label: 'Phòng ban' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        //#region 
        // Get List Phong Ban
        this.dmPhongBanService.getDanhSachPhongBan(this.timkiems).then(data => { this.phongBans = data; console.log(data) }
        );
        //#endregion

        
        //this.productService.getProducts().then(data => this.products = data);
    }

    //#region 
    //Thêm mới phòng ban
    public ThemMoi(): void {
        this.hienThiThemMoi = true;
    }

    public CapNhatPhongBan(id : string): void {
        this.id = id;
        this.hienThiCapNhat = true;
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'T')
            this.hienThiThemMoi = false;
        else
            this.hienThiCapNhat = false;
        this.getDanhSachPhongBan();
    }
    //#endregion

    public getDanhSachPhongBan() {
        this.timkiems.keyWord = this.TuKhoa;
        this.dmPhongBanService.getDanhSachPhongBan(this.timkiems).then(data => { this.phongBans = data; console.log(data) }
        )
    };


    public Xoa(id: string) {
        this.confirmationService.confirm({
          message: 'Bạn có chắc chắn xác nhận xóa liên kết?',
          header: 'Xác nhận',
          icon: 'pi pi-info-circle',
          accept: () => {
            this.dmPhongBanService.xoaPhongBan(id).subscribe(data => {
              if (data.isError) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
              } else {
                this.getDanhSachPhongBan();
                this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
              }
            }, (error) => {
              console.log('Error', error);
            })
          },
          reject: () => {
    
          }
        });
      }
}

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { DmPhongBan, TimKiemModel } from 'src/app/demo/api/danh-muc/phong-ban';
import { PhongbanService } from 'src/app/demo/service/danh-muc/phong-ban/phongban.service';

@Component({
    templateUrl: './phong-ban.component.html',
    styleUrls: ["./phong-ban.component.scss"],
    providers: [MessageService]
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

    constructor(private productService: ProductService, private messageService: MessageService, private dmPhongBanService: PhongbanService) { }

    ngOnInit(): void {

        this.items = [{ label: 'Danh mục' }, { label: 'Phòng ban' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        //#region 
        // Get List Phong Ban
        this.dmPhongBanService.getDanhSachPhongBan(this.timkiems).then(data => { this.phongBans = data; console.log(data) }
        );
        //#endregion


        //this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    //#region 
    //Thêm mới phòng ban
    public ThemMoi(): void {
        this.hienThiThemMoi = true;
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


    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}

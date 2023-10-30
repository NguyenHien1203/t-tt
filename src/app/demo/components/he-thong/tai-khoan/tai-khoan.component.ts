import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Product } from 'src/app/demo/api/product';
import { TaiKhoanService } from 'src/app/demo/service/he-thong/tai-khoan.service';
import { TaiKhoan, TaiKhoanTimKiem } from 'src/app/models/he-thong/tai-khoan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tai-khoan',
  templateUrl: './tai-khoan.component.html',
  providers: [MessageService]
})
export class TaiKhoanComponent implements OnInit {
  msgs: Message[] = [];
  items: any[] = [];
  home: any;
  taikhoantimkiem: TaiKhoanTimKiem = {
    TuKhoa: '',
    TenPhongBan: '',
    TenChucDanh: '',
  }

  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;

  valGioiTinh: string = '';
  TuKhoa: string = '';
  TenPhongBan: string = '';
  TenChucDanh: string = '';

  taikhoans: TaiKhoan[] = [];

  taikhoan: TaiKhoan = {};

  selectedTaiKhoans: TaiKhoan[] = [];

  taikhoanDialog: boolean = false;

  deleteTaiKhoansDialog: boolean = false;

  deleteTaiKhoanDialog: boolean = false;

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private taikhoanService: TaiKhoanService,
  ) { }

  ngOnInit() {
    this.items = [{ label: 'Hệ thống' }, { label: 'Quản trị tài khoản' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.GetDanhSachTaiKhoan();
  }

  public GetDanhSachTaiKhoan() {
    this.taikhoantimkiem.TenChucDanh = this.TenChucDanh;
    this.taikhoantimkiem.TenPhongBan = this.TenPhongBan;
    this.taikhoantimkiem.TuKhoa = this.TuKhoa;

    this.taikhoanService.GetDanhSachTaiKhoan(this.taikhoantimkiem).subscribe(data => {
      if (data.isError) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
      } else {
        this.taikhoans = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  public ThemMoi(): void{
    this.hienThiThemMoi = true;
  }

  public Thoat(itemHt: any, loai: string): void{
    if(loai === 'T')
      this.hienThiThemMoi = false;
    else
      this.hienThiCapNhat = false;
    this.GetDanhSachTaiKhoan();
  }

  public openNew() {
    this.taikhoan = {};
    this.submitted = false;
    this.taikhoanDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteTaiKhoansDialog = true;
  }

  // editProduct(product: Product) {
  //     this.product = { ...product };
  //     this.productDialog = true;
  // }

  // deleteProduct(product: Product) {
  //     this.deleteProductDialog = true;
  //     this.product = { ...product };
  // }

  confirmDeleteSelected() {
    this.deleteTaiKhoansDialog = false;
    this.taikhoans = this.taikhoans.filter(val => !this.selectedTaiKhoans.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    this.selectedTaiKhoans = [];
  }

  confirmDelete() {
    this.deleteTaiKhoanDialog = false;
    this.taikhoans = this.taikhoans.filter(val => val.id !== this.taikhoan.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.taikhoan = {};
  }

  hideDialog() {
    this.taikhoanDialog = false;
    this.submitted = false;
  }

  // saveProduct() {
  //   this.submitted = true;

  //   if (this.product.name?.trim()) {
  //     if (this.product.id) {
  //       // @ts-ignore
  //       this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
  //       this.products[this.findIndexById(this.product.id)] = this.product;
  //       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
  //     } else {
  //       this.product.id = this.createId();
  //       this.product.code = this.createId();
  //       this.product.image = 'product-placeholder.svg';
  //       // @ts-ignore
  //       this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
  //       this.products.push(this.product);
  //       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
  //     }

  //     this.products = [...this.products];
  //     this.productDialog = false;
  //     this.product = {};
  //   }
  // }

  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.products.length; i++) {
  //     if (this.products[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   return index;
  // }

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

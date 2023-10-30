import { ChucDanhService } from './../../../service/danh-muc/chuc-danh/chuc-danh.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
// import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Message, MessageService } from 'primeng/api';
import { ChucDanh } from 'src/app/models/danh-muc/chuc-danh';
import { Search } from 'src/app/models/danh-muc/search.model';

@Component({
  templateUrl: './chuc-danh.component.html',
  styleUrls: ['./chuc-danh.component.scss'],
  providers: [MessageService]
})
export class ChucDanhComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  listFields: ChucDanh[] = [];

  listField: ChucDanh = {};

  search: Search = {};

  product: Product = {};

  productDialog: boolean = false;

  submitted: boolean = false;

  selectedProducts: Product[] = [];

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  value1: any;

  valCheck: string[] = [];

  dataSearch = {
    "keyWord": this.search.keyWord ?? "",
    "nam": 0,
    "tuNgay": new Date(),
    "denNgay": new Date()
  };

  msgs: Message[] = [];

  constructor(private productService: ProductService, private messageService: MessageService, private chucDanhService: ChucDanhService) { }

  ngOnInit() {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Danh mục' });
    this.breadcrumbItems.push({ label: 'Quản trị chức danh' });

    this.cols = [
      { field: 'tenChucDanh', header: 'tenChucDanh' },
      { field: 'thuTu', header: 'thuTu' },
    ];

    this.LoadListField();
  }

  LoadListField() {
    this.chucDanhService.getListFields(this.dataSearch)
      .subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
        } else {
          console.log(data);
          this.listFields = data
        };
      }, (error) => {
        console.log('Error', error);
      })
  }

  SearchField() {
    this.dataSearch.keyWord = this.search.keyWord ?? "";
    this.LoadListField();
  }


  // this.taikhoanService.GetDanhSachTaiKhoan(this.taikhoantimkiem).subscribe(data => {
  //   if (data.isError) {
  //     this.msgs = [];
  //     this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
  //   } else {
  //     console.log(data.objData);
  //     this.taikhoans = data.objData;
  //   }
  // }, (error) => {
  //   console.log('Error', error);
  // })

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
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

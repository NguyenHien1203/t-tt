import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { NhomDonViService } from 'src/app/demo/service/danh-muc/nhom-don-vi/nhom-don-vi.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-di/cap-nhat-moi.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';
import { TimKiemModel } from 'src/app/models/danh-muc/don-vi/donvi.model';
import {saveAs} from 'file-saver';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-them-don-vi-vao-nhom',
  templateUrl: './them-don-vi-vao-nhom.component.html',
  styleUrls: ['./them-don-vi-vao-nhom.component.scss']
})
export class ThemDonViVaoNhomComponent {
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  @Input() id: string = '1';

  constructor(
    private serviceNDV: NhomDonViService,
      private service: CapNhatMoiService,
      private messageService: MessageService,
      private authService: AuthService,
      private uploadFileService: UploadFileService
  ) {
      this.GetDataNhomDonVi();
      this.GetTreeDonVi();
  }

  tenNhomDonVi: string="";
  lyDoThuHoi : string  = "";
  loading: boolean = false;
  iconClass = 'pi pi-plus';
  checkAllItem = 'checkAllItem';
  ThongTinVanBan: any;
  lstSelectedVanBan: any[] = [];
  hienThiChonVanBan: boolean = false;
  keyWord: string = '';
  treeData: any[] = [];
  ThongTinFile: any[] = [];
  lstNhomDonVi: any = [];
  isCheckedAll: boolean = false;
  isShowAll: boolean = false;
  nhomDonVi: any;
  DsCaNhanNhan: any[] = [];
  lstDonViNhan: any[] = [];
  submitted: boolean = false;
  idDonViLamViec = this.authService.GetDonViLamViec() ?? '0';
  userName = this.authService.GetmUserInfo()?.userName;
  userId = this.authService.GetmUserInfo()?.userId;
  idPhongBan = this.authService.GetmUserInfo()?.phongBanId;

  public async BindDataDialog() {
    this.serviceNDV.GetTenDonViById(this.id).then(
        (data) => {
            if (data.isError) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: data.title,
                });
            } else {
                this.tenNhomDonVi = data.tenNhom;
            console.log(this.tenNhomDonVi)

            }
        },
        (error) => {
            console.log('Error', error);
        }
    );
}

  //Chặn hành động click vào input sẽ cle hoặc exp
  handleCheckboxClick(event: Event): void {
      event.stopPropagation(); // Ngăn chặn sự kiện lan ra các phần tử cha
      this.isCheckedAll = !this.isCheckedAll;
      let checkAll = this.isCheckedAll; //checked toàn bộ danh sách
      this.treeData = this.treeData.map((data) => ({
          ...data,
          checked: checkAll,
          children: data.children.map((child) => ({
              ...child,
              checked: checkAll,
          })),
      }));
  }

  toggleNode(id: string): void {
    console.log("id", id);
    console.log("this.checkAllItem", this.checkAllItem);
      //chuyển hoạt họa icon
      if (id === this.checkAllItem) {
          this.isShowAll = !this.isShowAll;
          this.iconClass = this.isShowAll ? 'pi pi-minus' : 'pi pi-plus';
      }
      console.log("Show all",this.isShowAll);
  }

  toggleAllNodes(): void {
      // Implement logic to expand/collapse all nodes
  }

  expandNode(node: any): void {
      // mở
      node.expanded = true;
  }

  collapseNode(node: any): void {
      //đóng
      node.expanded = false;
  }

  public Thoat(): void {
      this.submitted = false;
      this.hienThi = false;
      this.tatPopup.emit(this.hienThi);
  }

  public ThoatChonVanban(itemHt: any, loai: string): void {
      if (loai === 'C') this.hienThiChonVanBan = false;
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

  public GetDataNhomDonVi() {
      this.service
          .getNhomDonViTheoDinhNghia(this.userId, this.idDonViLamViec)
          .then((data) => {
              this.lstNhomDonVi = data;
          });
  }

  public CheckedNode(itemHt: any) {
      // gán giá trị cho checked từ node-con
      this.treeData.filter((dt) => {
          if (dt.id === itemHt.id) {
              // Nếu là node cần cập nhật
              return { ...dt, checked: itemHt.checked };
          } else if (dt.children) {
              // Nếu là node cha có children
              return {
                  ...dt,
                  children: dt.children.map((child) => {
                      // Cập nhật checked nếu node con cần cập nhật
                      if (child.id === itemHt.id) {
                          return { ...child, checked: itemHt.checked };
                      } else {
                          return { ...child };
                      }
                  }),
              };
          } else {
              // Nếu không phải là node cần cập nhật và không có children
              return { ...dt };
          }
      });
  }

  getAllCheckedNodes(node: any): any[] {
      // lấy toàn bộ những item được checked
      let result: any[] = [];

      if (node.checked) {
          // Nếu node hiện tại checked, thêm nó vào kết quả
          result.push({ ...node });
      }

      if (node.children) {
          // Nếu node có children, duyệt qua từng children và thêm vào kết quả
          node.children.forEach((child) => {
              result = result.concat(this.getAllCheckedNodes(child));
          });
      }

      return result;
  }

  public GetTreeDonVi() {
      this.service
          .getTreeDonVi(this.keyWord ?? '', JSON.stringify(this.DsCaNhanNhan))
          .then((data) => {
              this.treeData = data;
          });
  }

  public onChangeNhomDonVi(event) {
      // lấy ra những trường đã thêm từ nhóm đơn vị
      this.service
          .changeNhomDonViTuDinhNghia(this.nhomDonVi, this.idDonViLamViec)
          .then((data) => {
              this.lstDonViNhan = data;
              const lstDVNhanConst = data;
              let lstDonViFromNhomDonVi = lstDVNhanConst.map(
                  (dt) => dt.value
              );
              this.treeData = this.treeData.map((dt) => {
                  return {
                      ...dt,
                      checked: lstDonViFromNhomDonVi.includes(Number(dt.id)),
                      children: dt.children.map((child) => {
                          // Cập nhật checked nếu node con cần cập nhật
                          return {
                              ...child,
                              checked: lstDonViFromNhomDonVi.includes(
                                  Number(child.id)
                              ),
                          };
                      }),
                  };
              });
          });
  }

  public AddToSelected(): void {
      const lstSelected = this.treeData
          .map((dt) => this.getAllCheckedNodes(dt))
          .flat();

      if (lstSelected === undefined || lstSelected.length === 0) {
          this.messageService.add({
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Yêu cầu chọn đơn vị',
          });
          return;
      }

      this.lstDonViNhan = lstSelected.map((dt) => ({
          value: dt.id,
          text: dt.tenDonVi,
      }));
  }

  public RemoveFromSelected(): void {
      const lstNhanOld = this.treeData
          .map((dt) => this.getAllCheckedNodes(dt))
          .flat();

      var lstSelectedOpts = this.DsCaNhanNhan as any[]; //Lấy cá nhân đã selected
      if (lstSelectedOpts === undefined || lstSelectedOpts.length === 0) {
          this.messageService.add({
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Yêu cầu chọn cá nhân',
          });
          return;
          //trả ra toast lỗi nếu chưa chọn cá nhân
      }

      this.treeData = this.treeData.map((dt) => {
          return {
              ...dt,
              checked: lstSelectedOpts.includes(Number(dt.id)),
              children: dt.children.map((child) => {
                  // Cập nhật checked nếu node con cần cập nhật
                  return {
                      ...child,
                      checked: lstSelectedOpts.includes(Number(child.id)),
                  };
              }),
          };
      });

      this.lstDonViNhan = this.lstDonViNhan.filter((dt) => {
          if (!lstSelectedOpts.includes(dt.value)) return { ...dt };
      });
  }

  public SearchTreeDonVi(event) {
      if (event.keyCode === 13 || event.type == 'click') {
          this.loading = true;
          setTimeout(() => (this.loading = false), 1000);
          this.GetTreeDonVi();
      }
  }

  public ThuHoiVanBan(): void {
      this.submitted = true;

      if (this.lstDonViNhan.length == 0) {
          this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Yêu cầu chọn đơn vị để thêm',
          });
          return;
      }
      let itemData: any = {
          idNhomDonVi: this.id?.toString(),
          donViId: this.authService.GetDonViLamViec(),
          lstDonViDaChon: this.lstDonViNhan.map((dv) => dv.value),
      };
      console.log(itemData);
      this.serviceNDV.addDonVi(itemData).subscribe(
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

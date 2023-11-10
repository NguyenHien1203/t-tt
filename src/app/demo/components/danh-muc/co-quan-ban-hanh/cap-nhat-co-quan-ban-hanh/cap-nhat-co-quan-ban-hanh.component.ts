import { Component, Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CoQuanBanHanhService } from 'src/app/demo/service/danh-muc/co-quan-ban-hanh/co-quan-ban-hanh.service';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';

@Component({
  selector: 'app-cap-nhat-co-quan-ban-hanh',
  templateUrl: './cap-nhat-co-quan-ban-hanh.component.html',
  styleUrls: ['./cap-nhat-co-quan-ban-hanh.component.scss']
})
export class CapNhatCoQuanBanHanhComponent {
  constructor(private route: ActivatedRoute, private Service: CoQuanBanHanhService, private formBuilder: FormBuilder, private messageService: MessageService) { }
  //Lấy dữ liệu đầu vào
  @Input() id: string = '';
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  //
  submitted = false;
  CoQuan: any = {};

  public formCapNhat = this.formBuilder.group({
    id: [0, []],
    kyHieu: ["", []],
    tenCoQuan: ["", [Validators.required]],
    ghiChu: ["", []],
  });


  //Hàm đóng pop up
  public Thoat(): void {
    this.hienThi = false;
    this.submitted = false;
    this.tatPopup.emit(this.hienThi);
  }

   //bind dữ liệu cần chỉnh sửa
   public BindDataDialog(): void {
    this.Service.GetDonViById(this.id).subscribe(data => {
      this.formCapNhat.setValue(data);
    })
  }
  // 

  public CapNhatCoQuan(): void {
    this.submitted = true;
    if (this.formCapNhat.valid) {
      this.CoQuan = this.formCapNhat.value;
      this.Service.CapNhatCoQuan(this.CoQuan).subscribe(
        data => {
          console.log('data', data);
          let resData = data as ResponeMessage;
          if (resData.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resData.title });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: resData.title });
            this.Thoat();
          }
        },
        error => {
          console.log('Error', error);
        })
    }
  }
}

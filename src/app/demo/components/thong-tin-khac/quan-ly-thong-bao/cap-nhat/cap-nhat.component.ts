import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { QuanLyThongBaoService } from 'src/app/demo/service/thong-tin-khac/quan-ly-thong-bao.service';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss']
})
export class CapNhatComponent implements OnInit {
  constructor(private service : QuanLyThongBaoService,private messageService: MessageService, private fb : FormBuilder){};
  uploadedFile: Blob
  ngOnInit(): void {
    // this.uploadedFile = <Blob>fileData; 
  }
;

  
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  @Input() id: string = '1';
  submitted : boolean = false;
  checked: boolean = false;
  lienKet : any = {};
  public checkedValue : boolean = false;
  public formCapNhat = this.fb.group({
    id: [0, []],
    tenLienKet: ["", [Validators.required]],
    thuTu: [0, []],
    hienThi: [false, []],
    ghiChu: ["", []],
  });


  public BindDataDialog(): void{
    this.service.getQuanLyThongBaoId(this.id).subscribe(data =>{
      this.checked = data?.hienThi;
      this.formCapNhat.setValue(data);
    })
  }

  public Thoat(): void {
    this.hienThi = false;
    this.tatPopup.emit(this.hienThi);
  }

  public CapNhat() : void {
    this.submitted = true;
    if(this.formCapNhat.valid){
      this.lienKet = this.formCapNhat.value;
      this.service.capNhatQuanLyThongBao(this.lienKet).subscribe(
        data => {
          console.log('data', data);
          let resData = data as ResponeMessage;
          if(resData.isError){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resData.title });
          }else{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: resData.title });
            this.Thoat();
          }
        },
        error => {
          console.log('Error', error);
      })
    }
  }

  public CheckedHt(){
    this.checkedValue = !this.checkedValue;
}
}

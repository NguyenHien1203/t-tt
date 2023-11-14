import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NhomDonViService } from 'src/app/demo/service/danh-muc/nhom-don-vi/nhom-don-vi.service';

@Component({
  selector: 'app-them-don-vi-vao-nhom',
  templateUrl: './them-don-vi-vao-nhom.component.html',
  styleUrls: ['./them-don-vi-vao-nhom.component.scss']
})
export class ThemDonViVaoNhomComponent {
  constructor(private route: ActivatedRoute, 
    private Service: NhomDonViService,
     private formBuilder: FormBuilder, 
     private messageService: MessageService) { }


  //Lấy dữ liệu đầu vào
  @Input() id: string = '';
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  //
  
  submitted = false;
  NhomDonVi: any = {};

  
}

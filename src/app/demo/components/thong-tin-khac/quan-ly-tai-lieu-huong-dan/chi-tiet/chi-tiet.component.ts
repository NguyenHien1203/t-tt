import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyTaiLieuHuongDanService } from 'src/app/demo/service/thong-tin-khac/quan-ly-tai-lieu-huong-dan/quan-ly-tai-lieu-huong-dan.service';
import { ChiTietTaiLieuHuongDan } from 'src/app/models/thong-tin-khac/quan-ly-tai-lieu-huong-dan/quan-ly-tai-lieu-huong-dan';

@Component({
  selector: 'app-chi-tiet',
  templateUrl: './chi-tiet.component.html',
  styleUrls: ['./chi-tiet.component.scss']
})
export class ChiTietComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Input() id: string;

  taiLieu: ChiTietTaiLieuHuongDan = {};

  ngOnInit(): void {

  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private quanLyTaiLieuService: QuanLyTaiLieuHuongDanService,
  ) { }

  GetTaiLieu() {
    this.quanLyTaiLieuService.getTaiLieu(this.id).subscribe(data => 
      { 
        this.taiLieu = data;
      });
  }

  TatPopup() {
    this.show = false;
    this.close.emit(this.show);
  }
}

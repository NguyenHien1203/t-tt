import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
})
export class ThemMoiComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>;

  todayDate:Date = new Date();

  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
      
  }

  TatPopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
  }
}

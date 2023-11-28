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

  submitted = false;

  public formThemMoi = this.formBuilder.group({
    id: [0, []],
    tieuDe: ["", [Validators.required]],
    noiDung: ["", [Validators.required]],
    donViId: [0, []],
    created: [new Date(), []],
    createdBy: [0, []],
    lastModified: [new Date(), []],
    lastModifiedBy: [0, []],
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
      
  }

  TatPopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
  }
}

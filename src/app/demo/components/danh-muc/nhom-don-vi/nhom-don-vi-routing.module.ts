import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NhomDonViComponent } from './nhom-don-vi.component';




const routes: Routes = [ {path: '', component: NhomDonViComponent} ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NhomDonViRoutingModule { }

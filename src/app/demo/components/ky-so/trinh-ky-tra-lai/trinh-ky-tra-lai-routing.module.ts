import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrinhKyTraLaiComponent } from './trinh-ky-tra-lai.component';

const routes: Routes = [{path: '', component: TrinhKyTraLaiComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrinhKyTraLaiRoutingModule { }

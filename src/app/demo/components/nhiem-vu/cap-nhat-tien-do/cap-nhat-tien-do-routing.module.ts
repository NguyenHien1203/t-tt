import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapNhatTienDoComponent } from './cap-nhat-tien-do.component';

const routes: Routes = [{ path: '', component: CapNhatTienDoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapNhatTienDoRoutingModule { }

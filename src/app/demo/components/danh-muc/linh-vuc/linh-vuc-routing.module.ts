import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinhVucComponent } from './linh-vuc.component';

const routes: Routes = [{ path: '', component: LinhVucComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinhVucRoutingModule { }

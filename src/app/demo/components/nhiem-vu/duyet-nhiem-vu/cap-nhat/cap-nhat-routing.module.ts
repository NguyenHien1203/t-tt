import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapNhatComponent } from './cap-nhat.component';

const routes: Routes = [{ path: '', component: CapNhatComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapNhatRoutingModule { }

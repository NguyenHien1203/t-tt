import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThamDoYKienComponent } from './tham-do-y-kien.component';

const routes: Routes = [{ path: '', component: ThamDoYKienComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThamDoYKienRoutingModule { }

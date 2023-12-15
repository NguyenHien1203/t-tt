import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TraCuuNangCaoComponent } from './tra-cuu-nang-cao.component';



const routes: Routes = [ {path: '', component: TraCuuNangCaoComponent} ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraCuuNangCaoRoutingModule { }

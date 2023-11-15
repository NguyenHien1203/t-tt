import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraCuuNangCaoComponent } from './tra-cuu-nang-cao.component';

const routes: Routes = [{path :'', component : TraCuuNangCaoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraCuuNangCaoRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LienKetComponent } from './lien-ket.component';

const routes: Routes = [ {path: '', component: LienKetComponent} ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LienKetRoutingModule { }

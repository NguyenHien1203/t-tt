import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MucDoTruyCapComponent } from './muc-do-truy-cap.component';

const routes: Routes = [{path : '', component : MucDoTruyCapComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MucDoTruyCapRoutingModule { }

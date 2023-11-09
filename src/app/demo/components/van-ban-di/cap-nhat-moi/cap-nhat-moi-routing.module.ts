import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapNhatMoiComponent } from './cap-nhat-moi.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';

const routes: Routes = [
  { path: '', component: CapNhatMoiComponent },
  { path: 'them-moi', component: ThemMoiComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapNhatMoiRoutingModule { }

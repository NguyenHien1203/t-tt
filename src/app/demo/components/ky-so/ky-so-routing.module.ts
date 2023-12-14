import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'luong-ky-so',
  data: { breadcrumb: 'Luồng ký số' },
  loadChildren: () =>
      import('./luong-ky-so/luong-ky-so.module').then(
          (m) => m.LuongKySoModule
      ),
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KySoRoutingModule { }

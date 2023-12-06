import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    { path: 'qly-cviec-psinh', data: { breadcrumb: 'Button' }, loadChildren: () => import('./qly-cviec-psinh/qly-cviec-psinh.module').then(m => m.QlyCviecPsinhModule) },
    
  ])],
  exports: [RouterModule]
})
export class CongViecRoutingModule { }

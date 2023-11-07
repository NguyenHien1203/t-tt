import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonViComponent } from './don-vi.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: DonViComponent}
  ])],
  exports: [RouterModule]
})
export class DonViRoutingModule { }

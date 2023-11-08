import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonViComponent } from './don-vi.component';
import { MessageService } from 'primeng/api';

const routes: Routes = [{path: '', component: DonViComponent}]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MessageService],
})

export class DonViRoutingModule { }

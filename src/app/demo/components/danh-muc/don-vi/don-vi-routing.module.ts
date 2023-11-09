import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonViComponent } from './don-vi.component';
import { MessageService } from 'primeng/api';
import { CapNhatDonViComponent } from './cap-nhat-don-vi/cap-nhat-don-vi.component';
const routes: Routes = [{path: '', component: DonViComponent}]; 

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: DonViComponent} ,

    {path: 'don-vi/cap-nhat-don-vi/:id', component: CapNhatDonViComponent} 
    
  ])],
  exports: [RouterModule],
  providers: [MessageService],
})

export class DonViRoutingModule { }

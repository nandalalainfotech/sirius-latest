import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusMasterComponent } from './status-master.component';

const routes: Routes = [
  {
    path: '',
    component: StatusMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusMasterRoutingModule { }

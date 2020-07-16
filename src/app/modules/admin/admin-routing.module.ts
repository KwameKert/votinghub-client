import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListUserComponent} from '../user';
import {ListElectionComponent} from '../election';

const routes: Routes = [
    {path: 'user/list', component: ListUserComponent },
    {path: 'election/list', component: ListElectionComponent },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

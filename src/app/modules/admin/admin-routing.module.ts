import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListUserComponent} from '../user';
import {ListElectionComponent} from '../election';
import {ListCategoryComponent} from '../category';
import {ListPositionComponent} from '../position';

const routes: Routes = [
    {path: 'user/list', component: ListUserComponent },
    {path: 'election/list', component: ListElectionComponent },
    {path: 'category/list', component: ListCategoryComponent },
    {path: 'position/list', component: ListPositionComponent },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

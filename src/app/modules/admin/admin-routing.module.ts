import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListUserComponent} from '../user';
import {ListElectionComponent, DashboardComponent, ElectionResultsComponent, LiveResultComponent} from '../election';
import {ListCategoryComponent} from '../category';
import {ListPositionComponent} from '../position';
import {AddCandidateComponent, ListCandidateComponent, EditCandidateComponent} from '../candidate';
import { ListVotersComponent } from '../voting/components/list-voters/list-voters.component';
import { ListStudentComponent } from '../voting/components/list-student/list-student.component';

const routes: Routes = [
    {path: 'user/list', component: ListUserComponent },
    {path: 'election/list', component: ListElectionComponent },
    {path: 'category/list', component: ListCategoryComponent },
    {path: 'position/list', component: ListPositionComponent },
    {path: 'candidate/add', component: AddCandidateComponent },
    {path: 'candidate/list', component: ListCandidateComponent },
    {path: 'candidate/edit/:id', component: EditCandidateComponent },
    {path: 'dashboard', component: DashboardComponent },
    {path: 'voter/list', component: ListVotersComponent },
    {path: 'student/list', component: ListStudentComponent },
    {path: 'election-results', component: ElectionResultsComponent},
    {path: 'live-results', component: LiveResultComponent}

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, ElectionResultsComponent, ListElectionComponent, LiveResultComponent } from '../election';
import { ListCandidateComponent } from '../candidate';

const routes: Routes = [


  {path: 'dashboard', component: DashboardComponent },
  {path: 'election/list', component: ListElectionComponent },
  {path: 'candidate/list', component: ListCandidateComponent },
  {path: 'results', component: ElectionResultsComponent },
  {path: 'live-results', component: LiveResultComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionerRoutingModule { }

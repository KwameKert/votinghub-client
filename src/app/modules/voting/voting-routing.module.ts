import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GenerateTokenComponent} from './components/generate-token/generate-token.component';
import { FetchCandidatesComponent } from './components/fetch-candidates/fetch-candidates.component';


const routes: Routes = [
    {path: '', component: GenerateTokenComponent },
    {path: 'candidates/:token/:nominees', component: FetchCandidatesComponent }

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotingRoutingModule { }
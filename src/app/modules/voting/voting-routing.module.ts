import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GenerateTokenComponent} from './components/generate-token/generate-token.component';
import { FetchCandidatesComponent } from './components/fetch-candidates/fetch-candidates.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { VoteCastedComponent } from './components/vote-casted/vote-casted.component';


const routes: Routes = [
    {path: 'verify/:token', component: GenerateTokenComponent },
    {path: 'candidates/:token/:code', component: FetchCandidatesComponent },
    {path: 'success', component: VoteCastedComponent },
    {path: '**', component: ErrorPageComponent},
    {path: 'error', component: ErrorPageComponent},
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotingRoutingModule { }
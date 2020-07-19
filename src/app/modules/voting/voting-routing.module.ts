import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GenerateTokenComponent} from './components/generate-token/generate-token.component';


const routes: Routes = [
    {path: '', component: GenerateTokenComponent }

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotingRoutingModule { }
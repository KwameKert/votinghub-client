import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateTokenComponent } from './components/generate-token/generate-token.component';
import {VotingRoutingModule} from './voting-routing.module';
import {ParticlesDirective} from './particles-directive';
import { SharedModule } from '../shared/shared.module';
import { FetchCandidatesComponent } from './components/fetch-candidates/fetch-candidates.component';
import {MatRadioModule} from '@angular/material/radio';
import { ViewResultsComponent } from './components/view-results/view-results.component';
import { AvatarModule } from 'ngx-avatar';
import { CountdownModule } from 'ngx-countdown';
import { PreloaderComponent } from '../shared/preloader/preloader.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { VoteCastedComponent } from './components/vote-casted/vote-casted.component';
import { ListVotersComponent } from './components/list-voters/list-voters.component';
import { AddVoterComponent } from './components/add-voter/add-voter.component';


@NgModule({
  declarations: [GenerateTokenComponent, ParticlesDirective, FetchCandidatesComponent, ViewResultsComponent, ErrorPageComponent, VoteCastedComponent, ListVotersComponent, AddVoterComponent],
  imports: [
    MatRadioModule,
    CommonModule,
    VotingRoutingModule,
    AvatarModule,
    SharedModule,
    CountdownModule 
  ],
  exports: [
    ListVotersComponent, AddVoterComponent
  ]
})
export class VotingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionerRoutingModule } from './commissioner-router.module';
import { CandidateModule } from '../candidate/candidate.module';
import { ElectionModule } from '../election/election.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommissionerRoutingModule,
    SharedModule, 
    ElectionModule,
    CandidateModule
  ]
})
export class CommissionerModule { }

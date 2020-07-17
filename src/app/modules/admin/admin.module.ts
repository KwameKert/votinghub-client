import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import {UserModule} from '../user/user.module';
import {ElectionModule} from '../election/election.module';
import {CategoryModule} from '../category/category.module';
import {PositionModule} from '../position/position.module';
import {CandidateModule} from '../candidate/candidate.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    UserModule, 
    ElectionModule,
    CategoryModule,
    PositionModule,
    CandidateModule
  ],
  providers: [
    DatePipe 
  ]
})
export class AdminModule { }

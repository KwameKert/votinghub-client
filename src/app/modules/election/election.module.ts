import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddElectionComponent,  EditElectionComponent, ViewElectionComponent, ListElectionComponent} from './index';
import {SharedModule} from '../shared/shared.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ElectionResultsComponent } from './component/election-results/election-results.component';
import { LiveResultComponent } from './component/live-result/live-result.component';


@NgModule({
  declarations: [AddElectionComponent, EditElectionComponent, ViewElectionComponent, ListElectionComponent, DashboardComponent, ElectionResultsComponent, LiveResultComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:  [AddElectionComponent, EditElectionComponent, ViewElectionComponent, ListElectionComponent, ElectionResultsComponent]
})
export class ElectionModule { }

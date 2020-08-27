import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddElectionComponent,  EditElectionComponent, ViewElectionComponent, ListElectionComponent} from './index';
import {SharedModule} from '../shared/shared.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AddElectionComponent, EditElectionComponent, ViewElectionComponent, ListElectionComponent, DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    ChartsModule
  ],
  exports:  [AddElectionComponent, EditElectionComponent, ViewElectionComponent, ListElectionComponent]
})
export class ElectionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddElectionComponent,  EditElectionComponent, ViewElectionComponent, ListElectionComponent} from './index';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [AddElectionComponent, EditElectionComponent, ViewElectionComponent, ListElectionComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:  [AddElectionComponent, EditElectionComponent, ViewElectionComponent, ListElectionComponent]
})
export class ElectionModule { }

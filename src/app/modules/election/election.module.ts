import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditElectionComponent } from './component/edit-election/edit-election.component';
import { ViewElectionComponent } from './component/view-election/view-election.component';
import { ListElectionComponent } from './component/list-election/list-election.component';



@NgModule({
  declarations: [EditElectionComponent, ViewElectionComponent, ListElectionComponent],
  imports: [
    CommonModule
  ]
})
export class ElectionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';
import { EditCandidateComponent } from './components/edit-candidate/edit-candidate.component';
import { ViewCandidateComponent } from './components/view-candidate/view-candidate.component';
import { ListCandidateComponent } from './components/list-candidate/list-candidate.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [AddCandidateComponent, EditCandidateComponent, ViewCandidateComponent, ListCandidateComponent],
  imports: [
    CommonModule, 
    SharedModule
  ],
  exports: [AddCandidateComponent]
})
export class CandidateModule { }

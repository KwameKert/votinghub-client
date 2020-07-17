import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';
import { EditCandidateComponent } from './components/edit-candidate/edit-candidate.component';
import { ViewCandidateComponent } from './components/view-candidate/view-candidate.component';
import { ListCandidateComponent } from './components/list-candidate/list-candidate.component';



@NgModule({
  declarations: [AddCandidateComponent, EditCandidateComponent, ViewCandidateComponent, ListCandidateComponent],
  imports: [
    CommonModule
  ]
})
export class CandidatesModule { }

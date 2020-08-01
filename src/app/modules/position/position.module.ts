import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPositionComponent } from './components/add-position/add-position.component';
import { EditPositionComponent } from './components/edit-position/edit-position.component';
import { ListPositionComponent } from './components/list-position/list-position.component';
import { ViewPositionComponent } from './components/view-position/view-position.component';
import {SharedModule} from '../shared/shared.module';
import { ViewResultsComponent } from './components/view-results/view-results.component';


@NgModule({
  declarations: [AddPositionComponent, EditPositionComponent, ListPositionComponent, ViewPositionComponent, ViewResultsComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [AddPositionComponent, EditPositionComponent, ListPositionComponent, ViewPositionComponent, ViewResultsComponent]
})
export class PositionModule { }

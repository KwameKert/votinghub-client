import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddUserComponent, ListUserComponent, EditUserComponent } from '../user';


@NgModule({
  declarations: [AddUserComponent, ListUserComponent, EditUserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }

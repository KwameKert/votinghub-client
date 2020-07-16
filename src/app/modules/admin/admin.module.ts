import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddUserComponent, ListUserComponent, EditUserComponent, ViewUserComponent } from '../user';
import {UserModule} from '../user/user.module';
import {ElectionModule} from '../election/election.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    UserModule, 
    ElectionModule
  ],
  providers: [
    DatePipe 
  ]
})
export class AdminModule { }

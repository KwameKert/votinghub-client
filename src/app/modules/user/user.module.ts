import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import {SharedModule} from './../shared/shared.module';
import { ViewUserComponent } from './components/view-user/view-user.component';


@NgModule({
  declarations: [AddUserComponent, EditUserComponent, ListUserComponent, ViewUserComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [AddUserComponent, EditUserComponent, ListUserComponent, ViewUserComponent]
})
export class UserModule { }

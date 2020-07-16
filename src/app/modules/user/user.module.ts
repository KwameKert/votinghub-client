import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';



@NgModule({
  declarations: [AddUserComponent, EditUserComponent, ListUserComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }

import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PreloaderComponent } from '../shared/preloader/preloader.component';



@NgModule({
  declarations: [LoginComponent, PreloaderComponent],
  imports: [
    AuthenticationRoutingModule,
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule  
  ],
  exports: [
    MatFormFieldModule
  ],
})
export class AuthenticationModule { }

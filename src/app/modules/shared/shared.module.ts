import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
 import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import { MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ExcerptFilter } from './excerpts.pipe';
import { MatSelectModule } from '@angular/material/select';
import { DeleteItemComponent} from './components/delete-item/delete-item.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';

import { PreloaderComponent } from './preloader/preloader.component';
import { AvatarModule } from 'ngx-avatar';

// const avatarColors = ["#FFB6C1", "#2c3e50", "#95a5a6", "#f39c12", "#1abc9c", "#28a745", "#ffc107", "#17a2b8"];

@NgModule({
  declarations: [ ExcerptFilter, DeleteItemComponent, PreloaderComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDialogModule,
    NgxSkeletonLoaderModule,
    MatFormFieldModule,
    MatMenuModule,
    MatNativeDateModule,
    MatStepperModule ,
    MatRadioModule,
    MatTabsModule,
    AvatarModule
    
  ],
  providers: [  
  ],
  exports: [
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule,
    NgxSkeletonLoaderModule,
    ExcerptFilter,
    MatFormFieldModule,
    MatMenuModule,
    MatNativeDateModule,
    MatStepperModule,
    PreloaderComponent,
    MatTabsModule,
    AvatarModule,
  ],
  entryComponents: []
})
export class SharedModule { }

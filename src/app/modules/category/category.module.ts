import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AddCategoryComponent, EditCategoryComponent, ListCategoryComponent, ViewCategoryComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [AddCategoryComponent, EditCategoryComponent, ListCategoryComponent, ViewCategoryComponent]
})
export class CategoryModule { }

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteItemComponent } from '../../../shared/components/delete-item/delete-item.component';
import { CrudService } from '../../../shared/service/crud.service';
import { ViewCategoryComponent} from '../view-category/view-category.component';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  isLoading: boolean = true;
  dataSource: any = null;
  slide: boolean = false;
  isAddCategory: boolean = false;
  isEditCategory: boolean = false
  displayedColumns: any ;
  listCategoryColumn: string = 'col-md-12';
  addCategoryColumn: string = 'd-none'
  editCategoryColumn: string = 'd-none';
  categoryId: number ;

  allowedColumns: any = [
    {def:'id', slideShow: true},
    {def: 'name', slideShow: true},
    {def: 'createdAt', slideShow: true},
    {def: 'actions', slideShow: false}
  ];


  constructor(private _crudService: CrudService, public dialog: MatDialog, private _snackBar: MatSnackBar, private _router: Router, private _toastr: ToastrService) { }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.getCollumnDefinitions();
    this.loadAllCategory();
  }


  loadAllCategory(){
    this._crudService.fetchAll("category").subscribe(data=>{
      
      if(data.data == null){
        this._toastr.info("No categorys found. 🥺","",{
          timeOut:2000
        })
      }else{
        this.dataSource = data.data;
        this.dataSource.paginator = this.paginator;
      }
      
      this.isLoading = false;
    }, error=>{
   
    })
  }

  getCollumnDefinitions(){
    if(this.slide){
      this.displayedColumns = this.allowedColumns
                                  .filter(col => col.slideShow == true ).map(cd => cd.def);
    }else{
      this.displayedColumns = this.allowedColumns.map(cd => cd.def);
    }

  }

  addCategory(){
    this.slide = true;
    this.getCollumnDefinitions();
    this.listCategoryColumn = 'col-md-6 ';
    this.addCategoryColumn = 'col-md-6';
    this.isAddCategory = true;
  }

  listCategory(){

    this.slide = false;
    this.getCollumnDefinitions();
    this.listCategoryColumn = 'col-md-12';
    this.addCategoryColumn = 'd-none';
    this.editCategoryColumn = 'd-none';
    this.isAddCategory = false;
  }


  editCategory(id){
   
    this.slide = true;
    this.getCollumnDefinitions();
    this.listCategoryColumn = 'col-md-6 ';
    this.editCategoryColumn = 'col-md-6 ';
    this.isAddCategory = true;
    this.categoryId = id;
  }
 
  newCategoryCreated(event: any){
    this.listCategory();
    this.loadAllCategory();
  }


  deleteCategory(id: Number){
    let data = {
      module: 'categorys',
      id
    }
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '550px',
      height: '180px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event){
        this._snackBar.open("Category Deleted 🙂  ", "", {
          duration: 2000,
        });
       this.loadAllCategory()

      }else{

        this._toastr.error("Oops an error. 🥺","",{
          timeOut:2000
        })
      }
    });
  }

  viewCategory(category){

    const dialogRef = this.dialog.open(ViewCategoryComponent, {
      width: '600px',
      height: '300px',
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
    }, error=>{
      this._toastr.error("Oops an error. 🥺","",{
        timeOut:2000
      })
    });

  }

}

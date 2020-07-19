import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteItemComponent } from '../../../shared/components/delete-item/delete-item.component';
import { CrudService } from '../../../shared/service/crud.service';

import { ViewPositionComponent} from '../view-position/view-position.component';

@Component({
  selector: 'app-list-position',
  templateUrl: './list-position.component.html',
  styleUrls: ['./list-position.component.css']
})
export class ListPositionComponent implements OnInit {

  isLoading: boolean = true;
  dataSource: any = null;
  slide: boolean = false;
  isAddPosition: boolean = false;
  isEditPosition: boolean = false
  displayedColumns: any ;
  listPositionColumn: string = 'col-md-12';
  addPositionColumn: string = 'd-none'
  editPositionColumn: string = 'd-none';
  positionId: number ;

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
    this.loadAllPosition();

  }


  loadAllPosition(){

    this._crudService.fetchAll("position").subscribe(data=>{ 
      if(data.data == null){
        this._toastr.info("No positions found. 🥺","",{
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
                                  .filter(col => col.slideShow == true )
                                  .map(cd => cd.def);
    }else{
      this.displayedColumns = this.allowedColumns
                                  .map(cd => cd.def);
    }

  }

  addPosition(){
    this.slide = true;
    this.getCollumnDefinitions();
    this.listPositionColumn = 'col-md-6 ';
    this.addPositionColumn = 'col-md-6';
    this.isAddPosition = true;
  }

  listPosition(){

    this.slide = false;
    this.getCollumnDefinitions();
    this.listPositionColumn = 'col-md-12';
    this.addPositionColumn = 'd-none';
    this.editPositionColumn = 'd-none';
    this.isAddPosition = false;
  }


  editPosition(id){
   
    this.slide = true;
    this.getCollumnDefinitions();
    this.listPositionColumn = 'col-md-6 ';
    this.editPositionColumn = 'col-md-6 ';
    this.isAddPosition = true;
    this.positionId = id;
  }
 
  newPositionCreated(event: any){
    this.listPosition();
    this.loadAllPosition();
  }


  deletePosition(id: Number){
    let data = {
      module: 'position',
      id
    }
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '550px',
      height: '180px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event){
        this._snackBar.open("Position Deleted 🙂  ", "", {
          duration: 2000,
        });
       this.loadAllPosition()

      }else{

        this._toastr.error("Oops an error. 🥺","",{
          timeOut:2000
        })
      }
    });
  }

  viewPosition(position){

    const dialogRef = this.dialog.open(ViewPositionComponent, {
      width: '600px',
      height: '400px',
      data: position
    });

    dialogRef.afterClosed().subscribe(result => {
    }, error=>{
      this._toastr.error("Oops an error. 🥺","",{
        timeOut:2000
      })
    });

  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/modules/shared/service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteItemComponent } from 'src/app/modules/shared/components/delete-item/delete-item.component';
import { ViewUserComponent } from '../view-user/view-user.component';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  isLoading: boolean = true;
  dataSource: any = null;
  slide: boolean = false;

  isAddUser: boolean = false;
  isEditUser: boolean = false

  displayedColumns: any ;
  listUserColumn: string = 'col-md-12';
  addUserColumn: string = 'd-none'
  editUserColumn: string = 'd-none'



  allowedColumns: any = [
    {def:'id', slideShow: false},
    {def: 'username', slideShow: true},
    {def: 'full name', slideShow: false},
    {def: 'email',  slideShow: true},
    {def: 'role', slideShow:false},
    {def: 'actions', slideShow: false}
  ];

  constructor(private _crudService: CrudService, public dialog: MatDialog, private _snackBar: MatSnackBar, private _router: Router, private _toastr: ToastrService) { }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  

  ngOnInit(): void {
    this.getCollumnDefinitions();
    this.loadAllUsers();
  }


  loadAllUsers(){
    this._crudService.fetchAll("users").subscribe(data=>{
      
      if(data.data == null){
        this._toastr.info("No users found. 🥺","",{
          timeOut:2000
        })
      }else{
        this.dataSource = data.data;
        this.dataSource.paginator = this.paginator;
      }
      
      this.isLoading = false;
    }, error=>{
      this._toastr.error("Oops an error. 🥺","",{
        timeOut:2000
      })
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

  addUser(){
    this.slide = true;
    this.getCollumnDefinitions();
    this.listUserColumn = 'col-md-6 pt-4';
    this.addUserColumn = 'col-md-6';
    this.isAddUser = true;
  }

  listUser(){

    this.slide = false;
    this.getCollumnDefinitions();
    this.listUserColumn = 'col-md-12';
    this.addUserColumn = 'd-none';
    this.editUserColumn = 'd-none';
    this.isAddUser = false;
  }

  editUSer(){

  }


  newUserCreated(event: any){
    this.loadAllUsers();
  }


  deleteUser(id: Number){
    let data = {
      module: 'user',
      id
    }
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '550px',
      height: '180px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event){
        this._snackBar.open("User Deleted 🙂  ", "", {
          duration: 2000,
        });
       this.loadAllUsers()

      }else{

        this._toastr.error("Oops an error. 🥺","",{
          timeOut:2000
        })
      }
    });
  }

  viewUser(user){

    const dialogRef = this.dialog.open(ViewUserComponent, {
      width: '600px',
      height: '370px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
    }, error=>{
      this._toastr.error("Oops an error. 🥺","",{
        timeOut:2000
      })
    });

  }

  editUser(id){
    this.slide = true;
    this.getCollumnDefinitions();
    this.listUserColumn = 'col-md-6 pt-4';
    this.editUserColumn = 'col-md-6';
    this.isEditUser = true;
  }
  
}

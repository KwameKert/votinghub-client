import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteItemComponent } from '../../../shared/components/delete-item/delete-item.component';
import { CrudService } from '../../../shared/service/crud.service';
import { ViewElectionComponent} from '../view-election/view-election.component';

@Component({
  selector: 'app-list-election',
  templateUrl: './list-election.component.html',
  styleUrls: ['./list-election.component.css']
})
export class ListElectionComponent implements OnInit {

  isLoading: boolean = true;
  dataSource: any = null;
  slide: boolean = false;
  isAddElection: boolean = false;
  isEditElection: boolean = false
  displayedColumns: any ;
  listElectionColumn: string = 'col-md-12';
  addElectionColumn: string = 'd-none'
  electionId: number ;

  allowedColumns: any = [
    {def:'id', slideShow: true},
    {def: 'name', slideShow: true},
    {def: 'year', slideShow: true},
    {def: 'createdAt', slideShow: true},
    {def: 'actions', slideShow: false}
  ];


  constructor(private _crudService: CrudService, public dialog: MatDialog, private _snackBar: MatSnackBar, private _router: Router, private _toastr: ToastrService) { }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.getCollumnDefinitions();
    this.loadAllElections();
  }


  loadAllElections(){
    this._crudService.fetchAll("elections").subscribe(data=>{
      
      if(data.data == null){
        this._toastr.info("No elections found. 🥺","",{
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

  addElection(){
    this.slide = true;
    this.getCollumnDefinitions();
    this.listElectionColumn = 'col-md-6 ';
    this.addElectionColumn = 'col-md-6';
    this.isAddElection = true;
  }

  listElection(){

    this.slide = false;
    this.getCollumnDefinitions();
    this.listElectionColumn = 'col-md-12';
    this.addElectionColumn = 'd-none';
    this.isAddElection = false;
  }


  editElection(id){
   
    this.slide = true;
    this.getCollumnDefinitions();
    this.listElectionColumn = 'col-md-6 ';
    this.isAddElection = true;
    this.electionId = id;
  }

  newElectionCreated(event: any){
    this.listElection();
    this.loadAllElections();
  }


  deleteElection(id: Number){
    let data = {
      module: 'elections',
      id
    }
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '550px',
      height: '180px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event){
        this._snackBar.open("Election Deleted 🙂  ", "", {
          duration: 2000,
        });
       this.loadAllElections()

      }else{

        this._toastr.error("Oops an error. 🥺","",{
          timeOut:2000
        })
      }
    });
  }

  viewElection(election){

    const dialogRef = this.dialog.open(ViewElectionComponent, {
      width: '600px',
      height: '300px',
      data: election
    });

    dialogRef.afterClosed().subscribe(result => {
    }, error=>{
      this._toastr.error("Oops an error. 🥺","",{
        timeOut:2000
      })
    });

  }

}

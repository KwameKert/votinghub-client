import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CrudService } from '../../../shared/service/crud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-voters',
  templateUrl: './list-voters.component.html',
  styleUrls: ['./list-voters.component.css']
})
export class ListVotersComponent implements OnInit {

  @ViewChild('listVoters') listVoters: ElementRef<HTMLElement>;

  isLoading: boolean = true;
  dataSource: any = null;
  slide: boolean = false;

  isAddVoter: boolean = false;

  displayedColumns: any ;
  listVoterColumn: string = 'col-md-12';
  addVoterColumn: string = 'd-none'
  editVoterColumn: string = 'd-none'
  userId: number ;



  allowedColumns: any = [
    {def:'pic', slideShow: false},
    {def: 'name', slideShow: true},
    {def: 'indexNumber', slideShow: false},
    {def: 'createdAt', slideShow: false},
    {def: 'email',  slideShow: true},
    {def: 'phone',  slideShow: true},
  ];

  constructor(private _crudService: CrudService, public dialog: MatDialog, private _snackBar: MatSnackBar, private _router: Router, private _toastr: ToastrService) { }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  

  ngOnInit(): void {
    this.getCollumnDefinitions();
    this.loadAllVoters();
  }


  loadAllVoters(){
    this._crudService.fetchAll("voter").subscribe(data=>{
      
      console.log(data.data)
      if(data.data == null){
        this._toastr.info("No voters found. 🥺","",{
          timeOut:2000
        })
      }else{
        this.dataSource = new MatTableDataSource<Position>(data.data);;
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

  addVoter(){
    this.slide = true;
    this.getCollumnDefinitions();
    this.listVoterColumn = 'col-md-6 ';
    this.addVoterColumn = 'col-md-6';
    this.isAddVoter = true;
  }

  listVoter(){

    this.slide = false;
    this.getCollumnDefinitions();
    this.listVoterColumn = 'col-md-12';
    this.addVoterColumn = 'd-none';
    this.editVoterColumn = 'd-none';
    this.isAddVoter = false;
  }


  editVoter(id){
   
    this.slide = true;
    this.getCollumnDefinitions();
    this.listVoterColumn = 'col-md-6 ';
    this.editVoterColumn = 'col-md-6';
    this.isAddVoter = true;
    this.userId = id;
  }

  newVoterCreated(event: any){
    this.listVoter();
    this.loadAllVoters();
  }


}

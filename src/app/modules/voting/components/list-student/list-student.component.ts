import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CrudService } from '../../../shared/service/crud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  @ViewChild('listStudents') listStudents: ElementRef<HTMLElement>;

  isLoading: boolean = true;
  dataSource: any = null;
  slide: boolean = false;

  isAddStudent: boolean = false;

  displayedColumns: any ;
  listStudentColumn: string = 'col-md-12';
  addStudentColumn: string = 'd-none'
  editStudentColumn: string = 'd-none'
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
    this.loadAllStudents();
  }


  loadAllStudents(){
    this._crudService.fetchAll("voter/allStudents").subscribe(data=>{
      
      console.log(data.data)
      if(data.data == null){
        this._toastr.info("No student found. 🥺","",{
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

  addStudent(){
    this.slide = true;
    this.getCollumnDefinitions();
    this.listStudentColumn = 'col-md-6 ';
    this.addStudentColumn = 'col-md-6';
    this.isAddStudent = true;
  }

  listStudent(){

    this.slide = false;
    this.getCollumnDefinitions();
    this.listStudentColumn = 'col-md-12';
    this.addStudentColumn = 'd-none';
    this.editStudentColumn = 'd-none';
    this.isAddStudent = false;
  }


  editStudent(id){
   
    this.slide = true;
    this.getCollumnDefinitions();
    this.listStudentColumn = 'col-md-6 ';
    this.editStudentColumn = 'col-md-6';
    this.isAddStudent = true;
    this.userId = id;
  }

  newStudentCreated(event: any){
    this.listStudent();
    this.loadAllStudents();
  }
}

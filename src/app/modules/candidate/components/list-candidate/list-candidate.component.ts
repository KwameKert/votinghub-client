import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteItemComponent } from '../../../shared/components/delete-item/delete-item.component';
import { CrudService } from '../../../shared/service/crud.service';

import { ViewCandidateComponent} from '../view-candidate/view-candidate.component';
import { Candidate } from 'src/app/models/Candidate';

@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.css']
})
export class ListCandidateComponent implements OnInit {

  isLoading: boolean = true;
  dataSource : any;
  slide: boolean = false;
  isAddCandidate: boolean = false;
  isEditCandidate: boolean = false;
  candidateId: number ;

  displayedColumns: String[] = [ 'id', 'name', 'election', 'position', 'createdAt', 'actions'];

  constructor(private _crudService: CrudService, public dialog: MatDialog, private _snackBar: MatSnackBar, private _router: Router, private _toastr: ToastrService) { }


  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  

  ngOnInit(): void {

    this.loadAllCandidate();

  }


  loadAllCandidate(){

    
      this._crudService.fetchAll("candidate").subscribe(data=>{ 
        if(data.data == null){
          this._toastr.info("No candidates found. 🥺","",{
            timeOut:2000
          })      
        }else{
          this.dataSource = new MatTableDataSource<Candidate>(data.data);
         this.dataSource.paginator = this.paginator;   
        }
      
        this.isLoading = false;
      }, error=>{
       
      })
    
    

  
  }


  addCandidate(){
    this._router.navigate(["admin/candidate/add"])
  }




  editCandidate(id){
   
    this._router.navigate([`admin/candiate/edit/${id}`])
  }



  deleteCandidate(id: Number){
    let data = {
      module: 'candidate',
      id
    }
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '550px',
      height: '180px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event){
        this._snackBar.open("Candidate Deleted 🙂  ", "", {
          duration: 2000,
        });
       this.loadAllCandidate()

      }else{

        this._toastr.error("Oops an error. 🥺","",{
          timeOut:2000
        })
      }
    });
  }

  viewCandidate(candidate){

    const dialogRef = this.dialog.open(ViewCandidateComponent, {
      width: '600px',
      height: '300px',
      data: candidate
    });

    dialogRef.afterClosed().subscribe(result => {
    }, error=>{
      this._toastr.error("Oops an error. 🥺","",{
        timeOut:2000
      })
    });

  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-election',
  templateUrl: './view-election.component.html',
  styleUrls: ['./view-election.component.css']
})
export class ViewElectionComponent implements OnInit {

 
  constructor(
    public dialogRef: MatDialogRef<ViewElectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
   

  ngOnInit() {
  
   //console.log(this.data);
  }

  close(){
 
      this.dialogRef.close();
    
   }

}

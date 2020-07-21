import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit {

  candidates: Array<Array<string>>;
   
  constructor(
    public dialogRef: MatDialogRef<ViewResultsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
   

  ngOnInit() {
   
    this.candidates = Object.entries(this.data)
    console.log(this.candidates)
  
   //console.log(this.data);
  }

  close(){
 
      this.dialogRef.close();
    
   }


}

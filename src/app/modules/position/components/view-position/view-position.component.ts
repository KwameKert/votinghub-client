import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-position',
  templateUrl: './view-position.component.html',
  styleUrls: ['./view-position.component.css']
})
export class ViewPositionComponent implements OnInit {

  
   
  constructor(
    public dialogRef: MatDialogRef<ViewPositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
   

  ngOnInit() {
  
   //console.log(this.data);
  }

  close(){
 
      this.dialogRef.close();
    
   }

}

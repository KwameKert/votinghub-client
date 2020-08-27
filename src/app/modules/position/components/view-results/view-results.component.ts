import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VoterService } from 'src/app/modules/voting/voter.service';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit {

  totalVotes: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ViewResultsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
   
  ngOnInit() {
    for(let candidate of this.data.candidates){
      this.totalVotes += candidate.votes.length;
    }
  }

  convertToPercentage(vote: number){
      return( (vote/this.totalVotes)*100).toFixed(1);
  }

  close(){
      this.dialogRef.close();
   }


}

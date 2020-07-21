import { Component, OnInit } from '@angular/core';
import { VoterService } from '../../voter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ParticlesConfig} from '../../../config/particles-config';
import { Position } from 'src/app/models/Position';
import { Candidate } from 'src/app/models/Candidate';
import { MatDialog } from '@angular/material/dialog';
import { ViewResultsComponent } from '../view-results/view-results.component';
import { timeStamp } from 'console';


declare var particlesJS: any;

@Component({
  selector: 'app-fetch-candidates',
  templateUrl: './fetch-candidates.component.html',
  styleUrls: ['./fetch-candidates.component.scss']
})
export class FetchCandidatesComponent implements OnInit {

  token: string ;
  candidatesName: any = {};
  candidatesId: any ={};
  srcCategory: any;
  
  isLinear = false;
  voteForm: FormGroup;

  constructor(private _voterService: VoterService, private _router: Router, private _formBuilder: FormBuilder,  public dialog: MatDialog,private route: ActivatedRoute) { }
  

   ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log(this.token)
    this.invokeParticles();
    this.fetchCandidates();
   this.loadForm();
  }

  loadForm(){
    this.voteForm = this._formBuilder.group({
      token: '',
      candidates: ''
    })
  }


   invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }

  fetchCandidates(){

    this._voterService.fetchCandidates().subscribe(result=>{
        this.srcCategory = result.data;
        console.log(this.srcCategory)
    }, error=>{
      console.error(error)
    })
  }

  addCandidate(position: Position, candidate: Candidate){
      this.candidatesName[position.name] = candidate.name;
      this.candidatesId[position.name] = candidate.id;
      console.log(this.candidatesName)
  }

  submitResults(){

    let candidateArray: Array<number> = [];

    for(let candidate in this.candidatesId){
      candidateArray.push(this.candidatesId[candidate])
    }

    this.voteForm.patchValue({
      token: this.token,
      candidates: candidateArray
    })

    this._voterService.castVote(this.voteForm.value).subscribe(result=>{
      console.log(result.data);
    }, error=>{
      console.error(error)
    })
    
  }

  viewResults(){

    const dialogRef = this.dialog.open(ViewResultsComponent, {
      width: '600px',
      height: '400px',
      data: this.candidatesName
    });

    dialogRef.afterClosed().subscribe(result => {
      this.submitResults();
    }, error=>{
      // this._toastr.error("Oops an error. 🥺","",{
      //   timeOut:2000
      // })
    });

  }
}

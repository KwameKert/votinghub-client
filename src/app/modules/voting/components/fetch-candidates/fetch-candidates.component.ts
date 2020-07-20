import { Component, OnInit } from '@angular/core';
import { VoterService } from '../../voter.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ParticlesConfig} from '../../../config/particles-config';
import { Position } from 'src/app/models/Position';
import { Candidate } from 'src/app/models/Candidate';


declare var particlesJS: any;

@Component({
  selector: 'app-fetch-candidates',
  templateUrl: './fetch-candidates.component.html',
  styleUrls: ['./fetch-candidates.component.scss']
})
export class FetchCandidatesComponent implements OnInit {

  voteForm: any = {};
  srcCategory: any;
  


  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _voterService: VoterService, private _router: Router, private _formBuilder: FormBuilder) { }
  

   ngOnInit(): void {
    console.log("here")
    this.invokeParticles();
    this.fetchCandidates();
   
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
      this.voteForm[position.name] = candidate.name;
      console.log(this.voteForm)

  }

}

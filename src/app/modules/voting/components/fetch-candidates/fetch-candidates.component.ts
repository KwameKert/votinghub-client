import { Component, OnInit } from '@angular/core';
import { VoterService } from '../../voter.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ParticlesConfig} from '../../../config/particles-config';


declare var particlesJS: any;

@Component({
  selector: 'app-fetch-candidates',
  templateUrl: './fetch-candidates.component.html',
  styleUrls: ['./fetch-candidates.component.scss']
})
export class FetchCandidatesComponent implements OnInit {

  voteForm: FormGroup ;
  srcCategory: any;


  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _voterService: VoterService, private _router: Router, private _formBuilder: FormBuilder) { }
  

   ngOnInit(): void {
    console.log("here")
    this.invokeParticles();
    this.fetchCandidates();
    this.loadForm();
   
  }

  loadForm(){
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
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


}

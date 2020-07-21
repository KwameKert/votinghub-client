import { Component, OnInit } from '@angular/core';

import { ParticlesConfig} from '../../../config/particles-config';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VoterService } from '../../voter.service';
import { Router } from '@angular/router';


declare var particlesJS: any;
@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.scss']
})
export class GenerateTokenComponent implements OnInit {

  indexForm: FormGroup ;
  tokenForm: FormGroup ;
  showIndexForm: string;
  showTokenForm: string = "d-none";
  
  constructor(private _voterService: VoterService, private _router: Router) { }
  

  public ngOnInit(): void {
    this.invokeParticles();
    this.loadIndexForm();
    this.loadTokenForm();
  }

  loadIndexForm(){
    this.indexForm = new FormGroup({
      indexNumber: new FormControl("", [Validators.maxLength(10),Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")])
    })
  }

  loadTokenForm(){
    this.tokenForm = new FormGroup({
      token: new FormControl("", [Validators.maxLength(10),Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")])
    })
  }


  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }

  generateToken(){
    
    let indexNumber = this.indexForm.get("indexNumber").value;

    this._voterService.genrateToken(indexNumber).subscribe(result=>{

      console.log(result.data)
      this.showIndexForm= "d-none";
      this.showTokenForm = "d-block";
     // this._router.navigate([`htau/candidates/${result.data}`])

    }, error=>{
      console.error(error)
    })

  }

  loginToVote(){
    
  }


}

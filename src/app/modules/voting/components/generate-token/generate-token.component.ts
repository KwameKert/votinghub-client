import { Component, OnInit, ViewChild } from '@angular/core';

import { ParticlesConfig} from '../../../config/particles-config';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VoterService } from '../../voter.service';
import { Router } from '@angular/router';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { NgxUiLoaderService } from 'ngx-ui-loader';


declare var particlesJS: any;
@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.scss']
})
export class GenerateTokenComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  token: string ;
  indexForm: FormGroup ;
  tokenForm: FormGroup ;
  showIndexForm: string;
  showTokenForm: string = "d-none";
  tokenTimeout: Boolean = true;
  isLoading: boolean = false;
  destination: string = '';
  config: CountdownConfig = { leftTime: 120, demand: true, format: `mm:ss` };
  
  constructor(private _voterService: VoterService, private _router: Router, private ngxService: NgxUiLoaderService) { }
  

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
   // this.isLoading = true;
    this.ngxService.start();
    this._voterService.genrateToken(indexNumber).subscribe(result=>{

      this.destination = result.data
      this.showIndexForm= "d-none";
      this.showTokenForm = "d-block";
      this.countdown.begin();
      console.log(this.tokenTimeout)
     // this._router.navigate([`htau/candidates/${result.data}`])

    }, error=>{
      console.error(error)
    }).add(()=>{
      this.ngxService.stop();
    })

  }

  loginToVote(){
    this.isLoading = true;
    let token = this.tokenForm.value.token;
  
    this._voterService.verifyToken(token).subscribe(result=>{
      this._router.navigate([`htau/candidates/${token}/nominees`])
    }, error=>{

    })
  }

  handleEvent(event){
    console.log("done")
    this.tokenTimeout = !this.tokenTimeout
  }

}

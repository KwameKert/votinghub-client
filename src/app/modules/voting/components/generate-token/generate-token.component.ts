import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ParticlesConfig} from '../../../config/particles-config';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VoterService } from '../../voter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.scss']
})
export class GenerateTokenComponent implements OnInit {

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChild('message', {static: false}) message : ElementRef<HTMLElement>;
  phoneNumber: string;
  indexNumber: string;
  emailAccount: string;
  token: string ;
  indexForm: FormGroup ;
  tokenForm: FormGroup ;
  showIndexForm: string;
  showTokenForm: string = "d-none";
  tokenTimeout: Boolean = true;
  isLoading: boolean = false;
  destination: string = '';
  uuid: string  = '';
  config: CountdownConfig = { leftTime: 120, demand: true, format: `mm:ss` };
  
  constructor(private _voterService: VoterService, private route: ActivatedRoute, private _router: Router, private ngxService: NgxUiLoaderService) { }
  

  public ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
   // this.loadIndexForm();
    this.ngxService.start();
    this.fetchVoter();
    this.ngxService.stop();
    this.loadTokenForm();
  }




 
  loadTokenForm(){
    this.tokenForm = new FormGroup({
      verificationCode: new FormControl("", [Validators.maxLength(10),Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")])
    })
  }



  fetchVoter(){
    
   //this.isLoading = true;
    this.ngxService.start();
    this._voterService.fetchVoter(this.token).subscribe(result=>{
      this.phoneNumber  = result.data.phone;
      this.emailAccount = result.data.email;
      this.uuid = result.data.token;
      if(result.status == 302){

        this._router.navigate(["htau/success"])
      }else if(result.status == 417){

        this._router.navigate(["htau/error"])
      }

    }, error=>{
      console.error(error)
    }).add(()=>{
      this.ngxService.stop();
    })

  }


  loginToVote(){
    this.isLoading = true;
    let code = this.tokenForm.value.verificationCode;
    this._router.navigate([`htau/candidates/${this.token}/${code}`]);
   
  }

  // handleEvent(event){
  //   console.log("done")
  //   this.tokenTimeout = !this.tokenTimeout
  // }

}

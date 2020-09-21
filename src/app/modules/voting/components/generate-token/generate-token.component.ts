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


  async fetchVoter(){
    
    try{
      this.ngxService.start();
        let resObj = await this._voterService.fetchVoter(this.token);
        if(resObj){
          let fullNumber = resObj.data.phone
          let fullEmail = resObj.data.email
          this.phoneNumber = fullNumber.substring(0, 4) + "****" + fullNumber.substring(8);
          this.emailAccount = fullEmail.substring(0,4) + "******" + fullEmail.substring(8);
          this.uuid = resObj.data.token;
          if(resObj.status === 302){
            return this._router.navigate(["htau/success"])
          }else if(resObj.status === 417){
            console.log("error here")
            return this._router.navigate(["htau/error"])
          }
          
        }else{
          console.log("error here")
          // return this._router.navigate(["htau/error"])
        }
        
       
    }catch(error){
      console.error(error)
    }finally{
      this.ngxService.stop();
    }
   //this.isLoading = true;
   // this.ngxService.start();

  //  .subscribe(result=>{
  //     let fullNumber = result.data.phone
  //     let fullEmail = result.data.email
  //     this.phoneNumber = fullNumber.substring(0, 4) + "****" + fullNumber.substring(8);
  //     this.emailAccount = fullEmail.substring(0,4) + "******" + fullEmail.substring(8);
  //     // this.phoneNumber  = result.data.phone;
  //     // this.emailAccount = result.data.email;
  //     this.ngxService.stop();
  //     this.uuid = result.data.token;
  //     if(result.status === 302){
  //       return this._router.navigate(["htau/success"])
  //     }else if(result.status === 417){
  //       console.log("error here")
  //       return this._router.navigate(["htau/error"])
  //     }

  //   }, error=>{
  //     console.error(error)
  //   }).add(()=>{
      
  //   })

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

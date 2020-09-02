import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VoterService } from '../../voter.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {


  indexNumberForm: FormGroup ;
  phone: string ;
  email: string;
  showForm: Boolean = true;
  showSuccessMessage: Boolean =false;
  isLoading: Boolean = false;
  
  constructor(private _voterService: VoterService,  private ngxService: NgxUiLoaderService) { }
  

  public ngOnInit(): void {

    this.ngxService.start();
  
    this.ngxService.stop();
    this.loadTokenForm();
  }




 
  loadTokenForm(){
    this.indexNumberForm = new FormGroup({
      indexNumber: new FormControl("", [Validators.maxLength(10),Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")])
    })
  }



 

  loginToVote(){
    this.isLoading = true;
    let index = this.indexNumberForm.value.indexNumber;
    this._voterService.verifyIndexNumber(index).subscribe(data=>{
            if(data.status == 200){
                let fullNumber = data.data.phone
                let fullEmail = data.data.email
                this.phone = fullNumber.substring(0, 4) + "****" + fullNumber.substring(8);
                this.email = fullEmail.substring(0,4) + "******" + fullEmail.substring(8);
                this.showForm = false;
                this.showSuccessMessage = true;
            }
    }, error=>{
      console.error(error)
    }).add(()=>{
      this.isLoading = false
    })
   // this._router.navigate([`htau/candidates/${this.token}/${code}`]);
   
  }


}

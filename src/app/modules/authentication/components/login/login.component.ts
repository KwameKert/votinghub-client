import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,  FormBuilder,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;
  loginForm: FormGroup ;
  link: string ;

constructor(private _router: Router, private _fb: FormBuilder,private _authService: AuthService, private _toastr: ToastrService) { }

ngOnInit() {
  this.loginForm = this._fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
  });

}

loginUser(){
  this.isLoading  = true;
  // this._authService.loginUser(this.loginForm.value).subscribe(data=>{
  //   console.log(data)
  // }, error=>{
  //   console.error(error)
  // })
  this._authService.login(this.loginForm.value).pipe(first())
  .subscribe(
      data => {
        switch(data.role){
            case "ADMIN":
              return this._router.navigate(['/admin/user/list']);
              break;
            case "COLLECTOR":
                this.link = '/collector/dashboard';
                break;
            case "AUDITOR":
                this.link = '/auditor/dashboard';    
              break;
            case "OWNER":
                this.link = '/owner/dashboard';
              break;
          }
      },
      error => {
        console.error("Opops an error occured")
      });


}


}

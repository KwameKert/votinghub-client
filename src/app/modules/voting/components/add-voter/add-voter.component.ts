import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { VoterService } from '../../voter.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-add-voter',
  templateUrl: './add-voter.component.html',
  styleUrls: ['./add-voter.component.css']
})
export class AddVoterComponent implements OnInit {

  voterForm: FormGroup ;
  role: any = '';
  @Output() newVoter: EventEmitter<boolean> = new EventEmitter();

  constructor(private _fb: FormBuilder, private _voterService: VoterService, private _toastr: ToastrService,  private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
    
    this.voterForm = this._fb.group({
      indexNumber: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      phone: new FormControl('123456', [Validators.required, Validators.maxLength(10) ]),
      level: new FormControl('', Validators.required),
      programme: new FormControl('', Validators.required),
      isInternational:new FormControl('', Validators.required)
    })
  }


  addVoter(){


    
this.ngxService.start()
    this._voterService.createVoter( this.voterForm.value).subscribe(data=>{
     this.voterForm.reset();
      this._toastr.success(data.message, "Success  😊", {  timeOut:2000});

      this.newVoter.emit(true)
    }, error=>{

      this._toastr.error("Please authenticate", "Oops 🥺", {  timeOut:4000});
      console.error(error)
    })

    this.ngxService.stop()



  }
}

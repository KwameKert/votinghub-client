import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { CrudService } from '../../../shared/service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-election',
  templateUrl: './add-election.component.html',
  styleUrls: ['./add-election.component.css']
})
export class AddElectionComponent implements OnInit {

  electionForm: FormGroup ;
  role: any = '';
  @Output() newElection: EventEmitter<boolean> = new EventEmitter();

  constructor(private _fb: FormBuilder, private _crudService: CrudService, private _toastr: ToastrService,  private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
    
    this.electionForm = this._fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      year: new FormControl('', [Validators.required ]),
      stat: ''
    })
  }


  addElection(){


    
this.ngxService.start()
    this._crudService.addItem(this.electionForm.value, "elections").subscribe(data=>{
     this.electionForm.reset();
      this._toastr.success(data.message, "Success  😊", {  timeOut:2000});

      this.newElection.emit(true)
    }, error=>{

      console.error(error)
    })

    this.ngxService.stop()



  }

}

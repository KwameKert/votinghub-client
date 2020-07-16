import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { CrudService } from '../../../shared/service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute } from '@angular/router';

import {Election} from 'src/app/models/Election';

@Component({
  selector: 'app-edit-election',
  templateUrl: './edit-election.component.html',
  styleUrls: ['./edit-election.component.css']
})
export class EditElectionComponent implements OnInit {

  @Input() electionId : number;
  electionForm: FormGroup ;
  role: any = '';

  @Output() updatedElection: EventEmitter<boolean> = new EventEmitter();

  constructor(private _fb: FormBuilder, private _crudService: CrudService, private _toastr: ToastrService,  private ngxService: NgxUiLoaderService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    

  }

  loadForm(){
    this.electionForm = this._fb.group({
      id: this.electionId,
      name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      year: new FormControl('', [Validators.required]),
      stat: ''
    })

  }


  addElection(){

    this.ngxService.start()
    this._crudService.updateItem({data: this.electionForm.value, module:"elections"}).subscribe(data=>{
     this.electionForm.reset();
      this._toastr.success(data.message, "Success  😊", {  timeOut:2000});

      this.updatedElection.emit(true)
    }, error=>{

      this._toastr.error("Please authenticate", "Oops 🥺", {  timeOut:4000});
      console.error(error)
    })

    this.ngxService.stop()

  }




  findElection(id){

    if(id){
      this._crudService.fetchItem({id: id, module: 'elections'}).subscribe(data=>{
        let result: Election = data.data;
        this.electionForm.patchValue({
          name: result.name,
          year: result.year,
          stat: result.stat,
          id: result.id,
        })
        
  
      }, error=>{
        console.error(error)
      })
    }


  }

  ngOnChanges(changes: SimpleChanges) {
  
    this.electionId = changes.electionId.currentValue;
     this.loadForm();
    this.findElection(this.electionId);
  }
  


}

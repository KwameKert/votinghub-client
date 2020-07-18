import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { CrudService } from '../../../shared/service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {Position} from  '../../../../models/Position';
import {Election} from  '../../../../models/Election';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {

  candidateForm: FormGroup ;

  positionOptions: Position[];

  electionOptions: Election[];

  fileData: File = null;
  previewUrl:any = null;
  formData = new FormData();

  role: any = '';
  @Output() newCandidate: EventEmitter<boolean> = new EventEmitter();

  constructor(private _fb: FormBuilder, private _crudService: CrudService, private _toastr: ToastrService,  private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.fetchCategory();
    this.fetchElection();
    this.loadForm();
   
  }

  loadForm(){
    this.candidateForm = this._fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      position_id: new FormControl('',Validators.required),
      election_id: new FormControl('',Validators.required),
      description: '',
      stat: ''
    })
  }

  fetchCategory(){
    this.ngxService.start()
    this._crudService.fetchAll("category").subscribe(data=>{
        this.positionOptions = data.data;
        if(this.positionOptions.length == 0){
          this._toastr.info(data.message, "Oh snap!", {  timeOut:2000});
        }
     }, error=>{
 
       console.error(error)
     })
     this.ngxService.stop()

  }


  fetchElection(){
    this.ngxService.start()
    this._crudService.fetchAll("elections").subscribe(data=>{
        this.electionOptions = data.data;
        if(this.electionOptions.length == 0){
          this._toastr.info(data.message, "Oh snap!", {  timeOut:2000});
        }
     }, error=>{
 
       console.error(error)
     })
     this.ngxService.stop()

  }


  addCandidate(){

    for(let item of this.candidateForm.value){
      console.log(item)
    }
    
 // this.ngxService.start()
    // this._crudService.addItem(this.candidateForm.value, "candidate").subscribe(data=>{
    //  this.candidateForm.reset();
    //   this._toastr.success(data.message, "Success  😊", {  timeOut:2000});

    //   this.newCandidate.emit(true)
    // }, error=>{

    //   console.error(error)
    // })

    // this.ngxService.stop()

  }




  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.formData.append('image', this.fileData, this.fileData.name);
    this.preview();
  }


  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }

    
    }


}
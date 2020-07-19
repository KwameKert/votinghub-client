import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { CrudService } from '../../../shared/service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {Position} from  '../../../../models/Position';
import {Election} from  '../../../../models/Election';
import { Candidate } from '../../../../models/Candidate';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.css']
})
export class EditCandidateComponent implements OnInit {

  candidateForm: FormGroup ;
  positionOptions: Position[];
  electionOptions: Election[];
  fileData: File = null;
  previewUrl:any = null;
  formData = new FormData();
  role: any = '';
  candidateId: number ;
  updateUrl: string ;

  constructor(private _fb: FormBuilder, private _crudService: CrudService, private _toastr: ToastrService,  private ngxService: NgxUiLoaderService, private _router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.candidateId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.fetchCadidate();
    this.fetchPosition();
    this.fetchElection();
    this.loadForm();
   
  }

  loadForm(){
    this.candidateForm = this._fb.group({
      id: '',
      name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      position_id: new FormControl('',Validators.required),
      election_id: new FormControl('',Validators.required),
      description: '',
      stat: ''
    })
  }

  fetchPosition(){
    this.ngxService.start()
    this._crudService.fetchAll("position").subscribe(data=>{
        this.positionOptions = data.data;
        if(this.positionOptions.length == 0){
          this._toastr.info(data.message, "Oh snap!", {  timeOut:2000});
        }
     }, error=>{
 
       console.error(error)
     })
     this.ngxService.stop()

  }


  fetchCadidate(){
    this.ngxService.start()
    this._crudService.fetchItem({id: this.candidateId, module:"candidate"}).subscribe(data=>{
        let result: Candidate = data.data;
      this.candidateForm.patchValue({
        id: result.id,
        name: result.name,
        position_id: result.position_id,
        election_id: result.election_id,
        description: result.description,
        stat: result.stat
      })
      this.previewUrl = result.imageUrl;

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

  listCandidates(){
    this._router.navigate(["admin/candidate/list"])
  }

  addCandidate(){
    if(this.fileData){
      this.formData.append('file', this.fileData, this.fileData.name);
      this.updateUrl = "candidate"
    }else{
      this.updateUrl = "candidate/nofile"
    }
    this.persistData();
 
  }

  persistData(){
   //passing form values to FormData
      for(let key of Object.keys(this.candidateForm.value)){
        this.formData.append(key,this.candidateForm.value[key] )
      }

      this.ngxService.start()
      
      this._crudService.updateItem({data: this.formData,module: this.updateUrl})
                       .subscribe(data=>{
              this.loadForm();
              this._toastr.success(data.message, "Success  😊", {  timeOut:2000});
      }, error=>{
        console.error(error)
      }).add(()=>     this.ngxService.stop()
      )
  }


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    
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

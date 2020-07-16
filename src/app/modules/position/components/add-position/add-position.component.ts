import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { CrudService } from '../../../shared/service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {Category} from  '../../../../models/Category';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent implements OnInit {

  positionForm: FormGroup ;

  categoryOptions: Category[];

  role: any = '';
  @Output() newPosition: EventEmitter<boolean> = new EventEmitter();

  constructor(private _fb: FormBuilder, private _crudService: CrudService, private _toastr: ToastrService,  private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.fetchCategory();
    this.loadForm();
   
  }

  loadForm(){
    this.positionForm = this._fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      category_id: new FormControl('',Validators.required),
      description: '',
      stat: ''
    })
  }

  fetchCategory(){
    this.ngxService.start()
    this._crudService.fetchAll("category").subscribe(data=>{
        this.categoryOptions = data.data;
        if(this.categoryOptions.length == 0){
          this._toastr.info(data.message, "Oh snap!", {  timeOut:2000});
        }
     }, error=>{
 
       console.error(error)
     })
     this.ngxService.stop()

  }


  addPosition(){


    
this.ngxService.start()
    this._crudService.addItem(this.positionForm.value, "position").subscribe(data=>{
     this.positionForm.reset();
      this._toastr.success(data.message, "Success  😊", {  timeOut:2000});

      this.newPosition.emit(true)
    }, error=>{

      console.error(error)
    })

    this.ngxService.stop()



  }


}

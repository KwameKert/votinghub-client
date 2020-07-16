import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { CrudService } from '../../../shared/service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup ;
  role: any = '';
  @Output() newCategory: EventEmitter<boolean> = new EventEmitter();

  constructor(private _fb: FormBuilder, private _crudService: CrudService, private _toastr: ToastrService,  private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
    
    this.categoryForm = this._fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      description: '',
      stat: ''
    })
  }


  addCategory(){


    
this.ngxService.start()
    this._crudService.addItem(this.categoryForm.value, "category").subscribe(data=>{
     this.categoryForm.reset();
      this._toastr.success(data.message, "Success  😊", {  timeOut:2000});

      this.newCategory.emit(true)
    }, error=>{

      console.error(error)
    })

    this.ngxService.stop()



  }

}

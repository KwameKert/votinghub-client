import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { CrudService } from '../../../shared/service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../../models/Category';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  @Input() categoryId : number;
  categoryForm: FormGroup ;
  role: any = '';

  @Output() updatedCategory: EventEmitter<boolean> = new EventEmitter();

  constructor(private _fb: FormBuilder, private _crudService: CrudService, private _toastr: ToastrService,  private ngxService: NgxUiLoaderService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    

  }

  loadForm(){
    this.categoryForm = this._fb.group({
      id: this.categoryId,
      name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      description: '',
      stat: ''
    })

  }


  addCategory(){

    this.ngxService.start()
    this._crudService.updateItem({data: this.categoryForm.value, module:"category"}).subscribe(data=>{
     this.categoryForm.reset();
      this._toastr.success(data.message, "Success  😊", {  timeOut:2000});

      this.updatedCategory.emit(true)
    }, error=>{

      this._toastr.error("Please authenticate", "Oops 🥺", {  timeOut:4000});
      console.error(error)
    })

    this.ngxService.stop()

  }




  findCategory(id){

    if(id){
      this._crudService.fetchItem({id: id, module: 'category'}).subscribe(data=>{
        let result: Category = data.data;
        this.categoryForm.patchValue({
          name: result.name,
          stat: result.stat,
          id: result.id,
          description: result.description
        })
        
  
      }, error=>{
        console.error(error)
      })
    }


  }

  ngOnChanges(changes: SimpleChanges) {
  
    this.categoryId = changes.categoryId.currentValue;
     this.loadForm();
    this.findCategory(this.categoryId);
  }
  

}

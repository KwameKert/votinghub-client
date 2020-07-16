import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { CrudService } from '../../../shared/service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute } from '@angular/router';
import { Position } from '../../../../models/Position';
import { Category } from '../../../../models/Category';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.css']
})
export class EditPositionComponent implements OnInit {
  @Input() positionId : number;
  positionForm: FormGroup ;
  categoryOptions: Category[];
  role: any = '';

  @Output() updatedPosition: EventEmitter<boolean> = new EventEmitter();

  constructor(private _fb: FormBuilder, private _crudService: CrudService, private _toastr: ToastrService,  private ngxService: NgxUiLoaderService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
 

  }

  loadForm(){
    this.positionForm = this._fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      categoryId: new FormControl('',Validators.required),
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
    this._crudService.updateItem({data: this.positionForm.value, module:"position"}).subscribe(data=>{
     this.positionForm.reset();
      this._toastr.success(data.message, "Success  😊", {  timeOut:2000});

      this.updatedPosition.emit(true)
    }, error=>{

      this._toastr.error("Please authenticate", "Oops 🥺", {  timeOut:4000});
      console.error(error)
    })

    this.ngxService.stop()

  }




  findPosition(id){

    if(id){
      this._crudService.fetchItem({id: id, module: 'position'}).subscribe(data=>{
        let result: Position = data.data;
        this.positionForm.patchValue({
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
  
    this.positionId = changes.positionId.currentValue;
    this.fetchCategory();
     this.loadForm();
    this.findPosition(this.positionId);
  }
  
}

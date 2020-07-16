import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { CrudService } from '../../../shared/service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup ;
  role: any = '';
  userId: string;

  @Output() updatedUser: EventEmitter<boolean> = new EventEmitter();

  constructor(private _fb: FormBuilder, private _crudService: CrudService, private _toastr: ToastrService,  private ngxService: NgxUiLoaderService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.userId = this._route.snapshot.paramMap.get('id');
    this.loadForm();
    this.findUser(this.userId);
  }

  loadForm(){
    this.userForm = this._fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(7)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      fullName: new FormControl('', Validators.required),
      role: '',
      stat: ''
    })

  }


  addUser(){

    this.ngxService.start()
    this._crudService.updateItem({data: this.userForm.value, module:"users"}).subscribe(data=>{
     this.userForm.reset();
      this._toastr.success(data.message, "Success  😊", {  timeOut:2000});

      this.updatedUser.emit(true)
    }, error=>{

      this._toastr.error("Please authenticate", "Oops 🥺", {  timeOut:4000});
      console.error(error)
    })

    this.ngxService.stop()

  }




  findUser(id){

    this._crudService.fetchItem({id: id, module: 'users'}).subscribe(data=>{
      let result: User= data.data;
      this.userForm.patchValue({
        username: result.username,
        email: result.email,
        fullName: result.fullName,
        role: result.role,
        stat: result.stat,
        id: result.id,
      })
      

    }, error=>{
      console.error(error)
    })
  }

}

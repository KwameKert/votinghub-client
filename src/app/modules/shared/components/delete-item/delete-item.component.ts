import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CrudService} from '../../../shared/service/crud.service';
@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss']
})
export class DeleteItemComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _crudService: CrudService) { }

  ngOnInit() {
  
   // console.log(this.data);
  }

  close(){
    this.dialogRef.close();
  }


  delete(){
    this._crudService.deleteItem(this.data).subscribe(data=>{
      let response: any = data;

      let evt = {
        data: response.data,
        event: true

      }
      this.dialogRef.close(evt);
    }, error=>{
      console.warn(error);
      this.dialogRef.close({event:false});
    })

  }
}

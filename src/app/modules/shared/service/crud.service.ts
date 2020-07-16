import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment} from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';


export interface User {
  fullName: string;
  username: string;
  role: string;
  email: string;
}



@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private _baseUrl :String = environment.api_host;
  constructor(private _httpClient: HttpClient) { }





  deleteItem({id, module}){
    return this._httpClient.delete(`${this._baseUrl}/${module}/${id}`);
   }


   
  public fetchItem({id, module}): Observable<ApiResponse<any>>{
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/${module}/${id}`)
  }


  public fetchAll(module: any):  Observable<ApiResponse<any>> {
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/${module}/`)
  }




  public addItem(data, module): Observable<ApiResponse<any>>{
    return this._httpClient.post<ApiResponse<any>>(`${this._baseUrl}/${module}/`, data);
  }


  public updateItem({data, module}): Observable<ApiResponse<any>>{
    return this._httpClient.put<ApiResponse<any>>(`${this._baseUrl}/${module}/`, data);
  }






}

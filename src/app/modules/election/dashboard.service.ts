import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _baseUrl :String = environment.api_host;
  constructor(private _httpClient: HttpClient) { }


  public fetchComponents():  Observable<ApiResponse<any>> {
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/dashboard/`);
  }

  // public fetchResults(id: number):  Observable<ApiResponse<any>> {
  //   return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/voter/generateResults/${id}`);
  // }
  public fetchResults(id: number):  Observable<ApiResponse<any>> {
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/result/category/${id}`);
  }



}
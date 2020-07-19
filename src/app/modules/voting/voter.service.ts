import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  private _baseUrl :String = environment.api_host;
  constructor(private _httpClient: HttpClient) { }


  genrateToken(indexNumber: string): Observable<ApiResponse<any>>{
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/voter/generate/${indexNumber}`);
   }



}

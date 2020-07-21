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


  castVote(data: any): Observable<ApiResponse<any>>{
    return this._httpClient.post<ApiResponse<any>>(`${this._baseUrl}/voter/cast`, data);
   }

  genrateToken(indexNumber: string): Observable<ApiResponse<any>>{
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/voter/generate/${indexNumber}`);
   }

  verifyToken(token: string): Observable<ApiResponse<any>>{
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/voter/verify/${token}`);
   }
   
  fetchCandidates(): Observable<ApiResponse<any>>{
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/voter/nominees`);
   }






}

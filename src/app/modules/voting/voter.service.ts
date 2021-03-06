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


  // castVote(data: any): Observable<ApiResponse<any>>{
  //   return this._httpClient.post<ApiResponse<any>>(`${this._baseUrl}/voter/cast`, data);
  //  }
  
  castVote(data: any): Observable<ApiResponse<any>>{
    return this._httpClient.post<ApiResponse<any>>(`${this._baseUrl}/voter/election/cast`, data);
   }

  genrateVoter(indexNumber: string): Observable<ApiResponse<any>>{
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/voter/generate/${indexNumber}`);
   }


   createVoter(data: any): Observable<ApiResponse<any>>{
    return this._httpClient.post<ApiResponse<any>>(`${this._baseUrl}/voter/generate`, data);
   }

   createStudent(data: any): Observable<ApiResponse<any>>{
    return this._httpClient.post<ApiResponse<any>>(`${this._baseUrl}/voter/student`, data);
   }


   genrateToken(indexNumber: string, destination: string): Observable<ApiResponse<any>>{
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/voter/token/${indexNumber}/${destination}`);
   }


  verifyToken(token: string): Observable<ApiResponse<any>>{
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/voter/verify/${token}`);
   }

   verifyIndexNumber(indexNumber: string): Observable<ApiResponse<any>>{
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/voter/check/student/${indexNumber}`);
   }
   
  fetchCandidates(token: string, code: string): Observable<ApiResponse<any>>{
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/voter/fetchCandidates/${token}/${code}`);
   }


  fetchVoter(token: string){
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/voter/check/${token}`).toPromise();
   }

   
 



}

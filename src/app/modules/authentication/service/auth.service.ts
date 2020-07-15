import { Injectable } from '@angular/core';
import { environment} from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private _baseUrl :String = environment.api_host;
   private loggedInStatus = localStorage.getItem("status");
   private authority = localStorage.getItem("role");

   constructor(private _httpClient: HttpClient) { }

  loginUser(data: any ): Observable<any>{
    return this._httpClient.post(`${this._baseUrl}/login/`, data);
  }

  setUserDetails(authData: any){
    localStorage.setItem("propToken", authData.token);
    localStorage.setItem("username", authData.username);
    localStorage.setItem("userId", authData.userId)
    localStorage.setItem("role", authData.role);
    localStorage.setItem("status", "active" )
  }

  logUserOut(){

    try{

      localStorage.clear()
      return true;
    }catch(err){
      throw err;
    }
  }

  public get isLoggedIn(){
    return this.loggedInStatus;
  }

  public get userRole(){
    return  this.authority;
  }



}

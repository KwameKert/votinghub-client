import { Injectable } from '@angular/core';
import { environment} from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../../../models/User';
import {ApiResponse} from '../../../models/ApiResponse'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private _baseUrl :String = environment.api_host;

   private userSubject: BehaviorSubject<User>;
   public user: Observable<User>;
   private response: any;

  //  private loggedInStatus = localStorage.getItem("status");
  //  private authority = localStorage.getItem("role");

    constructor(
        private router: Router,
        private _httpClient: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
      return this.userSubject.value;
  }

  login(data: object) {
    return this._httpClient.post<ApiResponse<User>>(`${this._baseUrl}/auth/login`, data)
        .pipe(map(data => {
         
              // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(data.data));
            this.userSubject.next(data.data);
            return data.data;
        }));
}

  loginUser(data: any ): Observable<any>{
    return this._httpClient.post(`${this._baseUrl}/auth/login`, data);
  }

  setUserDetails(authData: any){
    localStorage.setItem("propToken", authData.token);
    localStorage.setItem("username", authData.username);
    localStorage.setItem("userId", authData.userId)
    localStorage.setItem("role", authData.role);
    localStorage.setItem("status", "active" )
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
}

}

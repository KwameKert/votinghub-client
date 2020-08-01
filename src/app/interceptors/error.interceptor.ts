import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { AuthService } from '../modules/authentication/service/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public _toastr: ToastrService, private _router: Router, private _authService: AuthService) {}
intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
    
        return next.handle(req).pipe(
         
            catchError((err: any) => {
                if(err instanceof HttpErrorResponse) {
                    
                    if(err.status == 403){
                        this._toastr.error("Please authenticate", "Oops 🥺", {  timeOut:4000});
                        this._router.navigate(['/login']);
                        this._authService.logout();

                    }else if(err.status == 400){
                        this._toastr.info( err.error.message, "Oops 🥺", {  timeOut:4000});
                        
                    }else{

                        const error = err.error.message || err.statusText;
                        console.log(error)
                      this._toastr.error(error, "Oops 🥺", {  timeOut:4000});
                       //return throwError(error); 
                       
                    }
                }
                next
                return of(err);
                
            }));
    
      }
      
}
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public _toastr: ToastrService, private _router: Router) {}
intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
    
        return next.handle(req).pipe(
         
            catchError((err: any) => {
                if(err instanceof HttpErrorResponse) {
                    
                    if(err.status == 403){
                        console.log(" 403")
                        // this._toastr.error("Please authenticate", "Oops 🥺", {  timeOut:4000});
                        // this._router.navigate(['/login']);
                    }else{

                        const error = err.error.message || err.statusText;
                        console.log(error)
                       // this._toastr.error(error, "Oops 🥺", {  timeOut:4000});
                      //  return throwError(error); 
                    }
                }
                return of(err);
                
            }));
    
      }
      
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../../../src/environments/environment';

@Injectable({

    providedIn: 'root'
}
)
export class DataService {


 
private _baseUrl :String = environment.api_host;    

private messageSource = new BehaviorSubject('Dashboard');
private ownerId = new BehaviorSubject(0);

private counter: number = 0;


constructor(private _httpClient: HttpClient){}


get CountDown(): number{
    return this.counter
}


getLink(): Observable<any> {
    return this.messageSource.asObservable();
}

setLink(linkName: string){
    this.messageSource.next(linkName)
}

setOwnerId(id: number){
    this.ownerId.next(id);
}

getOwnerId(): Observable<any>{
    return this.ownerId.asObservable();
}



} 
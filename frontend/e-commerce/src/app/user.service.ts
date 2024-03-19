import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
api='http://localhost:9000/api/superAdmin';

  constructor(private http:HttpClient ) {}
login(value:any):Observable<any>{
  return this.http.post('${this.api}/login',value);
}

register(value:any):Observable<any>{
  return this.http.post('${this.api}/register',value);
}
}

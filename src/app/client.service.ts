import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Client } from './model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }


  adduser(user: Client){
    return this.http.post<Client>('http://localhost:8080/api/v1/auth/register', user)
  }
  

  login(email: string, password: string) : Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/auth/authenticate', { email, password });
      
  }
}

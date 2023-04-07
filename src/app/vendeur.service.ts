import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Vendeur } from './model/vendeur';

@Injectable({
  providedIn: 'root'
})
export class VendeurService {

  constructor(private http:HttpClient) { }
  adduser(user: Vendeur){
    return this.http.post<Vendeur>('http://localhost:8080/api/v1/auth/registerVend', user)
  }
  

  login(email: string, password: string) : Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/auth/authenticateVend', { email, password });
      
  }
}

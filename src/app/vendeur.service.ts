import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Vendeur } from './model/vendeur';
import { BehaviorSubject, of } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})  
export class VendeurService {
 id:number;
 isLoggedIn = new BehaviorSubject<boolean>(false);

 private idvendeur : number;

 setIdVendeur(idvendeur : number) {
  this.idvendeur = idvendeur;
 }
getIdVendeur() {
  return this.idvendeur;
}

 private readonly baseUrl: string = 'http://localhost:8080/api/v1/auth';
  constructor(private http:HttpClient) { }
  adduser(user: Vendeur): Observable<any> {
    return this.http.post<Vendeur>('http://localhost:8080/api/v1/auth/registerVend', user)
  }
    

  login(email: string, password: string) : Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/auth/authenticateVend', { email, password });
      
  }
  getToken(): string|null {
    return localStorage.getItem('token');
  }
  checkLoginStatus(): void {
    const token = this.getToken();
    if (token) {
      this.isLoggedIn.next(true);
      console.log('connecté')
    }
  }
  getCurrentVendeur(): Observable<Vendeur|null> {
    const token = this.getToken();
    console.log(token);
    if (token) {
      const decodedToken = jwt_decode(token) as { sub: string, exp: string };
      const email = decodedToken.sub;
      return this.getVendeurByEmail(email);
    }
    return of(null);
  }
  getVendeurById(id:number):Observable<Vendeur>{
    return this.http.get<Vendeur>("http://localhost:8080/api/vendeur/"+id);
  }
  getVendeurByEmail(email:string):Observable<Vendeur>{
    return this.http.get<Vendeur>("http://localhost:8080/api/vendeur/email/"+email);
  }
  UpdateVendeur (vendeur:Vendeur):Observable<Vendeur>{
    return this.http.put<Vendeur>("http://localhost:8080/api/vendeur/update",vendeur)
  }

  logout():Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/auth/logout', {})
  }

}

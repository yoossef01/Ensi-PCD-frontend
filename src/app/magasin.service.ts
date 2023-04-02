import { Injectable } from '@angular/core';
import { Magasin } from './model/magasin';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MagasinService {

  host="http://localhost:8080/apimagasin"
  constructor( private client:HttpClient) {}
  public getMagasin(id:number):Observable<Magasin>

{
  return this.client.get<Magasin>(this.host+"/magasinById/"+id)
}
public getAllMagasins():Observable<Magasin []>
{
  return this.client.get<Magasin []>(this.host+"/all")
}
public addMagasin(mag:Magasin): Observable<Magasin>{
  
  return this.client.post<Magasin>(this.host+"/add",mag)

}
public deleteMagasin(id:number):Observable<void>{
  return this.client.delete<void>(this.host+"/del/"+id)
}
modifierMagasin(id: number, magasinModifiee: Magasin): Observable<Magasin> {
  const url = `${this.host+"/update"}/${id}`;

  return this.client.put<Magasin>(url, magasinModifiee);
}

}

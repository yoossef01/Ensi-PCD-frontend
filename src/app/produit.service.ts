import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from './model/produit';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  public added:boolean=false;
 

  host="http://localhost:8080/apiproduit"
  constructor( private client:HttpClient) {}
  public getAllProducts():Observable<Produit []>
  {
    return this.client.get<Produit []>(this.host+"/all")
  }

  public delete(id:string):Observable<void>
  {
    return this.client.delete<void>(this.host+"/del/"+id)
  }
public getProduct(id:string):Observable<Produit>

{
  return this.client.get<Produit>(this.host+"/productById/"+id)
}

public ToString(p:Produit): string   {
  return "{\"nom\":"+p.nom+",\"photo\":"+p.photo+
  ",\"prix\":"+p.prix+",\"quantite\":"+p.quantite+
  ",\"category\":{\"id\":"+p.categorie.id+" ,\"nom\":"+p.categorie.nom+"}"
}
  public addProduit(p: string, file: File): Observable<Produit> {
    const formData = new FormData();
    formData.append('file', file);
    console.log(p);
    formData.append('product', p );
    console.log(formData);

    return this.client.post<Produit>(this.host+"/add", formData);
  }
  
// public updateProduit(p: string, file: File): Observable<Produit> {
//   const formData = new FormData();
//   formData.append('file', file);
//   console.log(p);
//   formData.append('product', p );
//   console.log(formData);
updateProduct(file: File, product: Produit): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  formData.append('product', JSON.stringify(product));
  return this.client.post<Produit>(this.host+"/update", formData);
}
saveP(p:Produit):Observable<Produit>{
  return this.client.post<Produit>(this.host+"/save", p);
}
}
import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/categorie.service';
import { ClientService } from 'src/app/client.service';
import { Categorie } from 'src/app/model/categorie';
import { Client } from 'src/app/model/client';
import { Produit } from 'src/app/model/produit';

import { ProduitService } from 'src/app/produit.service';

@Component({
  selector: 'app-list-products-client',
  templateUrl: './list-products-client.component.html',
  styleUrls: ['./list-products-client.component.css']
})
export class ListProductsClientComponent implements OnInit {
  public isCollapsed = false;
  public isCollapsed2 = false;
  private catadded =false;
  produitF!:Produit[];
  client:Client;
  categories:Categorie[]=[];
constructor(private clientservice: ClientService,private CategorieService:CategorieService,private produitService:ProduitService){}
ngOnInit(): void {
    
  this.getAllProd_cat();
  this.getCurrentClient();
}


set texte(ch:string)
{
this.produitF=this.filtrer(ch);
}
filtrer(mot:string)
{
 return this.produitF.filter(x=>x.nom.indexOf(mot)!=-1)
}
getAllProd_cat(){
  this.produitService.getProductsByVendeur(252).subscribe(data=>this.produitF=data);
  this.CategorieService.getAllCategoriesByVendeur(252).subscribe(data=>this.categories=data);
  }




getCurrentClient(){
    this.clientservice.getCurrentClient().subscribe(client =>
    {if(client) this.client=client;console.log("le client "+this.client.id+" est connecté");
  
})
  }






}

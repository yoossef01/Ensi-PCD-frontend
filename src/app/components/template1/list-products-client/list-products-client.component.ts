import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service';
import { ClientService } from 'src/app/client.service';
import { Categorie } from 'src/app/model/categorie';
import { Client } from 'src/app/model/client';
import { Produit } from 'src/app/model/produit';

import { ProduitService } from 'src/app/produit.service';
import { VendeurService } from 'src/app/vendeur.service';

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
constructor(private clientservice: ClientService,private sc:CategorieService,private service:ProduitService, private vendeurservice:VendeurService, private router:Router){}
ngOnInit(): void {
    
  this.getAll();
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


getcategoriie(i : number)
  {
    this.sc.getAllCategoriesByVendeur(i).subscribe(data=>{this.categories=data; this.categories=this.categories
    console.log(data)})
  }
getproduitByVendeur(i : number)
  {
   this.service.getProductsByVendeur(i).subscribe(data=>{this.produitF=data;})
  }

   getAll()
 {
  this.getproduitByVendeur(this.vendeurservice.getIdVendeur())
  this.getcategoriie(this.vendeurservice.getIdVendeur())
 }


getCurrentClient(){
    this.clientservice.getCurrentClient().subscribe(client =>
    {if(client) this.client=client;console.log("le client "+this.client.id+" est connecté");
  
})
  }


navigation() {
    this.router.navigate(['/template/1/'+this.vendeurservice.getIdVendeur()]);
  }



}

import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.css']
})
export class Template1Component implements OnInit {
  categories!:Categorie[];
  produitF!:Produit[];
  produits: Produit[] ;
 Buttons:number;
 idProduit:string;
 produit!:Produit;
  public isCollapsed = false;

  
  constructor(private sc:CategorieService,private service:ProduitService) { }

  ngOnInit(): void {
    this.sc.getAllCategories().subscribe(data=>{this.categories=data; this.categories=this.categories})
    this.service.getAllProducts().subscribe(data=>{this.produits=data; this.produitF=this.produits})
    this.Buttons=1;
  }
HomePage():void{
  this.Buttons=1;
}
ProduitsPage():void{
  this.Buttons=2;
}
ProduitDetails(id:string):void{
this.idProduit=id;
console.log(this.idProduit);
this.Buttons=3;
this.service.getProduct(id!).subscribe(data =>this.produit=data)
}
}

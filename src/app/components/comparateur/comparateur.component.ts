import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';

@Component({
  selector: 'app-comparateur',
  templateUrl: './comparateur.component.html',
  styleUrls: ['./comparateur.component.css']
})
export class ComparateurComponent implements OnInit{
  
  comparisonResults: any[];
  productAttributes: string[] = ['Price', 'Size', 'Color'];
  produits:Produit[]=[]
  constructor(private produitService: ProduitService) {}
  ngOnInit(): void {
    console.log(this.produitService.Idproducts)
    for(let id of this.produitService.Idproducts){
      this.produitService.getProduct(id).subscribe(data=>{this.produits.push(data)})
    }
   
  }

  compare(): void {


  }
}

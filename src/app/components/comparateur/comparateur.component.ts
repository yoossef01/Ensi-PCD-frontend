import { Component, OnInit } from '@angular/core';
import { DescriptionService } from 'src/app/description.service';
import { Description } from 'src/app/model/description';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';

@Component({
  selector: 'app-comparateur',
  templateUrl: './comparateur.component.html',
  styleUrls: ['./comparateur.component.css']
})
export class ComparateurComponent implements OnInit{
  
  comparisonResults: boolean=false;
  productAttributes: string[] = ['material', 'color', 'shortDescription','longDescription'];
  produits:Produit[]=[];
  productDescriptions: Description[]=[];

  constructor(private produitService: ProduitService, private descriptionService:DescriptionService) {}
  ngOnInit(): void {
    console.log(this.produitService.Idproducts)
    for(let id of this.produitService.Idproducts){
      this.produitService.getProduct(id).subscribe(data=>{this.produits.push(data);
      this.descriptionService.getDescriptionByProduct(id).subscribe(data=>{this.productDescriptions.push(data);
        console.log(this.productDescriptions);
        console.log(data);
      })})

    }
   
  }

  compare(): void {
this.comparisonResults = true;
console.log(this.productDescriptions);
  }
}

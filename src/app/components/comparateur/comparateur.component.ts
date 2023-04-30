import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
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
  produits:Produit[]=[];
  listeDeListes: Produit[][] = [];
  productDescriptions: Description[]=[];
  selectedProducts:Produit[]=[];
  DescriptionOfSelectedProducts:Description[]=[];
  constructor(private produitService: ProduitService, private descriptionService:DescriptionService) {}
  ngOnInit(): void {
    console.log(this.produitService.Idproducts);
  
    const observables = this.produitService.Idproducts.map(id => {
      return forkJoin([
        this.produitService.getProduct(id),
        this.descriptionService.getDescriptionByProduct(id)
      ]).pipe(
        map(([product, description]) => ({product, description}))
      );
    });
  
    forkJoin(observables).subscribe(result => {
      result.forEach(({product, description}) => {
        this.produits.push(product);
        this.productDescriptions.push(description);
      });
  
      for (let i = 0; i < this.produits.length; i += 3) {
        this.listeDeListes.push(this.produits.slice(i, i + 3));
      }
  
      console.log(this.listeDeListes);
    });
  }

  compare(): void {
    
    this.comparisonResults = true;
    console.log(this.productDescriptions);
  }
  selectProduct(product: Produit): void {
    if (this.selectedProducts.length < 3) {
      const index = this.produits.findIndex(p => p.id === product.id);
      if (index !== -1) {
        if (this.selectedProducts.length == 0) {
          this.selectedProducts.push(product);
                    
          // Ajouter le premier produit sélectionné
        } else if (this.selectedProducts.length == 1) {
          this.selectedProducts.push(product);          
          // Ajouter le deuxième produit sélectionné
        } else {
          this.selectedProducts[0] = this.selectedProducts[1]; // Le premier produit prend la place du deuxième
          this.selectedProducts[1] = product; // Ajouter le troisième produit sélectionné
        }
      }
    }
    this.DescriptionOfSelectedProducts = [];

    for (let i=0; i<this.selectedProducts.length; i++) {
      const product = this.selectedProducts[i];
      this.descriptionService.getDescriptionByProduct(product.id).subscribe(data => {
        this.DescriptionOfSelectedProducts.push(data);
      });
    }
  }
  
}

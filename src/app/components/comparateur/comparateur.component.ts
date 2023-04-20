import { Component } from '@angular/core';
import { ProduitService } from 'src/app/produit.service';

@Component({
  selector: 'app-comparateur',
  templateUrl: './comparateur.component.html',
  styleUrls: ['./comparateur.component.css']
})
export class ComparateurComponent {
  products: any[] = [];
  comparisonResults: any[];
  productAttributes: string[] = ['Price', 'Size', 'Color'];

  constructor(private produitService: ProduitService) {
    this.produitService.getAllProducts().subscribe(produits => {
      this.products = produits;
    });
  }

  compare(): void {


  }
}

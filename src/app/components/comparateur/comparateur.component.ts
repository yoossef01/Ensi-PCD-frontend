import { Component } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-comparateur',
  templateUrl: './comparateur.component.html',
  styleUrls: ['./comparateur.component.css']
})
export class ComparateurComponent {
  products: any[] = [];
  comparisonResults: any[];
  productAttributes: string[] = ['Price', 'Size', 'Color'];

  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  compare(): void {


  }
}

import { Component } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-comparateur',
  templateUrl: './comparateur.component.html',
  styleUrls: ['./comparateur.component.css']
})
export class ComparateurComponent {
  products: any[];
  comparisonResults: any[];
  productAttributes: string[] = ['Price', 'Size', 'Color'];

  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  compare(): void {
    const selectedProducts = this.products.filter((product) => product.selected);
    const productIds = selectedProducts.map((product) => product.id);
    this.productService.compareProducts(productIds).subscribe((data) => {
      this.comparisonResults = data;
    });
  }
}

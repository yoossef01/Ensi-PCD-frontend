import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  constructor(private ar:ActivatedRoute, private service:ProduitService) { }
  produit!:Produit;
  ngOnInit(): void {

    let id=this.ar.snapshot.paramMap.get('id');
    console.log(id)
    this.service.getProduct(id!).subscribe(data =>this.produit=data)
  }
  
  

}
    
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AchatService } from 'src/app/commande.service';
import { CategorieService } from 'src/app/categorie.service';
import { Achat } from 'src/app/model/commande';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
quantity:number;
  
  constructor(private ar:ActivatedRoute, private service:ProduitService,private achatService:AchatService) { }
  produit!:Produit;
  achats:Achat[];
  achat: Achat = {
    id:'' ,
    montant: 0,quantite:0,
    date: new Date(),
    product: {
      id: '',
      nom: '',
      prix: 0,
      quantite: 0,
      photo: "",
      categorie: {id:1,nom:"informatique"},
      prix_achat:0,
      magasin:{id:0,nom:""}
    }
  };
  ngOnInit(): void {
   
    let id=this.ar.snapshot.paramMap.get('id');
    console.log(id)
    this.service.getProduct(id!).subscribe(data =>this.produit=data) 
     this.achatService.getAllAchats().subscribe(data=>{this.achats= data;
      for (let achat of this.achats) {
        if (achat.product.id == id) {
          this.achat = achat;
          console.log(this.achat)
          break; 
        }
      }});
  };
 

  
  addAchat() {

    
   
     // const a:string="{\"montant\":"+this.achat.montant+",\"date\":\""+this.achat.date+"\",\"product\":{"+"\"id\":"+this.achat.product.id+"}}"
   //  if(this.achat.id==''){
   //    this.achat.id=uuidv4();
   //  }
 
    this.achat.montant=this.produit.prix*this.achat.quantite;
    this.produit.quantite=this.produit.quantite-this.achat.quantite;
    this.achat.date=new Date();
    this.achat.product.id=this.produit.id;
    this.achat.id=uuidv4();
    this.service.saveP(this.produit).subscribe(data=>{this.produit=data})
      this.achatService.addAchat(this.achat)
        .subscribe(data => console.log(data));
       
         
    }
    decrementQuantity() {
      if (this.achat.quantite > 0) {
        this.achat.quantite--;
        let id=this.ar.snapshot.paramMap.get('id');
        console.log(id)
        this.service.getProduct(id!).subscribe(data =>this.produit=data)
      }
    }
    
    incrementQuantity() {
      this.achat.quantite++;
      let id=this.ar.snapshot.paramMap.get('id');
      console.log(id)
      this.service.getProduct(id!).subscribe(data =>this.produit=data)
    }
  

}
    
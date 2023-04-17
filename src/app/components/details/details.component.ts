import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import {CommandeService  } from 'src/app/commande.service';
import { CategorieService } from 'src/app/categorie.service';
import { Commande } from 'src/app/model/commande';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';
import { v4 as uuidv4 } from 'uuid';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/app/model/client';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
quantity:number;
  
  constructor(private ar:ActivatedRoute, private service:ProduitService,
    private commandeService:CommandeService,private clientservice :ClientService
    ) { }
  produit!:Produit;
  commandes:Commande[];
  commande: Commande = {
    id:'' ,
    montant: 0,quantite:0,
    date: new Date(),
    product: {
      id: '',
      nom: '',
      prix: 0,
      quantite: 0,
      photo: "",
      categorie: {id:1,nom:"informatique",vendeur: {id: 0}},
      prix_achat:0,vendeur:{id:0}
    },
    client:{id:0}
  };
  c :Client;
  ngOnInit(): void {
   
    let id=this.ar.snapshot.paramMap.get('id');
    console.log(id)
    this.service.getProduct(id!).subscribe(data =>this.produit=data) 
     this.commandeService.getAllCommandes().subscribe(data=>{this.commandes= data;
      for (let commande of this.commandes) {
        if (commande.product.id == id) {
          this.commande = commande;
          console.log(this.commande)
          break; 
        }
      }});
      this.clientservice.getCurrentClient().subscribe(client =>
        {if(client) this.c=client;console.log("le client "+this.c.nom+" est connecté")});
  };
 

  
  addCommande() {

    this.commande.montant=this.produit.prix*this.commande.quantite;
    this.produit.quantite=this.produit.quantite-this.commande.quantite;
    this.commande.date=new Date();
    this.commande.product.id=this.produit.id;
    this.commande.id=uuidv4();
    this.commande.client.id=this.c.id;
    this.service.saveP(this.produit).subscribe(data=>{this.produit=data})
      this.commandeService.addCommande(this.commande)
        .subscribe(data => console.log(data));
       
         
    }
    decrementQuantity() {
      if (this.commande.quantite > 0) {
        this.commande.quantite--;
        let id=this.ar.snapshot.paramMap.get('id');
        console.log(id)
        this.service.getProduct(id!).subscribe(data =>this.produit=data)
      }
    }
    
    incrementQuantity() {
      this.commande.quantite++;
      let id=this.ar.snapshot.paramMap.get('id');
      console.log(id)
      this.service.getProduct(id!).subscribe(data =>this.produit=data)
    }
  

}
    
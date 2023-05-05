import { HttpErrorResponse } from '@angular/common/http';
import { NonNullAssert } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { v4 as uuidv4 } from 'uuid';
import { FormGroup, NgForm } from '@angular/forms';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';
import Swal from 'sweetalert2';
import { HomeComponent } from '../home/home.component';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DetailsComponent } from '../details/details.component';
import { UpdateProductDialogComponent } from '../update-product-dialog/update-product-dialog.component';
import { CommandeService } from 'src/app/commande.service';
import { VendeurService } from 'src/app/vendeur.service';
import { Vendeur } from 'src/app/model/vendeur';
import { Commande } from 'src/app/model/commande';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/app/model/client';
import { Router } from '@angular/router';



@Component({
  selector: 'app-listeproduits',
  templateUrl: './listeproduits.component.html',
  styleUrls: ['./listeproduits.component.css']
})
export class ListeproduitsComponent implements OnInit {
  produits: Produit[] ;
  public ids:string[]=[]
  public isCollapsed = false;
  public isCollapsed2 = false;
  private catadded =false;
  produitF!:Produit[];
  nomNewCat:string;
  
  categorieProduit:Categorie=new Categorie(0,"",{id:0}); 
  produit:Produit=new Produit("","",0,0,"",this.categorieProduit,0,{id:0}) ;
  cat:Categorie ;
  idCategorie:number;
  categories:Categorie[]=[];
  photo:File;
  vendeur:Vendeur;
  client:Client;
  idTemplate : number;
 
   constructor(private service:ProduitService,private sc:CategorieService,public dialog:MatDialog,private router: Router,
    private commandeService: CommandeService
    ,private vendeurservice :VendeurService) { }

  ngOnInit(): void {

     this.getAll()
       this.getCurrentVendeur();
    //  setInterval(() => {
    //   this.added();
    // }, 1000);
    // setInterval(() => {
    //   this.Catadded();
    // }, 1000);
    ;}
    getCurrentVendeur(){
      this.vendeurservice.getCurrentVendeur().subscribe(vendeur =>
      {if(vendeur) this.vendeur=vendeur;console.log("le vendeur "+this.vendeur.id+" est connecté")})}
    getAll()
    {
      this.service.getAllProducts().subscribe(data=>{this.produitF=data; })
      this.sc.getAllCategories().subscribe(data=>{this.categories=data; this.categories=this.categories})
    }
    //les fonctions de barre de rechreche
  set texte(ch:string)
    {
   this.produitF=this.filtrer(ch);
    }
  filtrer(mot:string)
    {
     return this.produits.filter(x=>x.nom.indexOf(mot)!=-1)
    }
   //solution provisoire pour l'affichage de liste de produits chaque seconde  
  added(){
    if(this.service.added==true){
      this.getAll();
    }
    this.service.added=false;
  }
  Catadded(){
    if(this.catadded==true){
      this.getAll();
    }
    this.catadded=false;
  }
 

// ouvert de fenetre de l'ajout du produit
  openDialog(){
  let dialogRef = this.dialog.open(DialogBoxComponent, {
    width: '700px'});
  
}
 //ouvert de fenetre de l'update du produit
openDialogUpdate(id:string){
  let dialogRef = this.dialog.open(UpdateProductDialogComponent, {
    width: '700px',
    data: {id} });
}    
updateProductsCompared(id:string){
  
  this.ids.push(id);
  this.service.Idproducts=this.ids;
  console.log(this.ids)
}



getVendeurById(n : number) {
  this.vendeurservice.getVendeurById(n).subscribe(data=>{this.vendeur = data;
  this.vendeurservice.setIdVendeur(n);
  this.vendeurservice.setIdTemplate(this.vendeur.idTemplate);
  this.router.navigate(['/templateclient/'+this.vendeur.idTemplate+'/'+n])})
}

navigation(i : number) {
  this.getVendeurById(i);
}
}

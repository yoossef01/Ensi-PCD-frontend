
import { HttpErrorResponse } from '@angular/common/http';
import { NonNullAssert } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

import { FormGroup, NgForm } from '@angular/forms';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {


  produits: Produit[] ;
  public isCollapsed = false;
  public isCollapsed2 = false;
  private catadded =false;
  produitF!:Produit[];
  nomNewCat:string;
  newCategory: Categorie;
  
   categorie: Categorie = new Categorie();
  cat:Categorie = new Categorie();
id:number;
  p: Produit = {
    id: '',
    nom: '',
    prix: 0,
    quantite: 0,
    photo: "",
    categorie: {id:1,nom:"informatique"},
    prix_achat:0,vendeur:{id:0}
  };
  prod: Produit = {
    id: '38df45e4-e155-426e-ba81-2ea4128c15da',
    nom: 'aziz',
    prix: 0,
    quantite: 0,
    photo: "",
    categorie: {id:1,nom:"informatique"},
    prix_achat:0,vendeur:{id:0}
  };
  categories!:Categorie[];
photo:File;

  set texte(ch:string)
  {
 this.produitF=this.filtrer(ch);
  }
  filtrer(mot:string)
  {
   return this.produits.filter(x=>x.nom.indexOf(mot)!=-1)
  }
   constructor(private ar:ActivatedRoute,private service:ProduitService,private sc:CategorieService,public dialog:MatDialog) { }
 getAll()
 {
   this.service.getAllProducts().subscribe(data=>{this.produits=data; this.produitF=this.produits})
   this.sc.getAllCategories().subscribe(data=>{this.categories=data; this.categories=this.categories})
 }
   ngOnInit(): void {
    
    let idStr = this.ar.snapshot.paramMap.get('id');
    if (idStr) {
      let id = parseInt(idStr);
      console.log(id);
      this.service.getProductsByVendeur(id).subscribe(data=>this.produitF=data);

      
    } else {
      console.log('id is null');
    }
     this.sc.getCategory(1).subscribe(data=>{this.categorie=data;  this.categorie=this.categorie;});
    //  setInterval(() => {
    //   this.added();
    // }, 1000);
    // setInterval(() => {
    //   this.Catadded();
    // }, 1000);
    ;
    this.sc.getAllCategories().subscribe(data=>{this.categories=data; this.categories=this.categories})

   }
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
 delete(p:Produit)
 {
   const swalWithBootstrapButtons = Swal.mixin({
     customClass: {
       confirmButton: 'btn btn-success',
       cancelButton: 'btn btn-danger'
     },
     buttonsStyling: false
   })
   
   swalWithBootstrapButtons.fire({
     title: 'Are you sure?',
     text: "You won't be able to revert this!",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Yes, delete it!',
     cancelButtonText: 'No, cancel!',
     reverseButtons: true
   }).then((result) => {
     if (result.isConfirmed) {
       this.service.delete(p.id).subscribe(()=>
       {this.produitF.splice(this.produitF.indexOf(p),1);
 
       swalWithBootstrapButtons.fire(
         'Deleted!',
         'Your file has been deleted.',
         'success'
       );})
     } else if (
       /* Read more about handling dismissals below */
       result.dismiss === Swal.DismissReason.cancel
     ) {
       swalWithBootstrapButtons.fire(
         'Cancelled',
         'Your imaginary file is safe :)',
         'error'
       )
     }
   })
   

  
}
deletecat(cat:Categorie)
 {
   const swalWithBootstrapButtons = Swal.mixin({
     customClass: {
       confirmButton: 'btn btn-success',
       cancelButton: 'btn btn-danger'
     },
     buttonsStyling: false
   })
   
   swalWithBootstrapButtons.fire({
     title: 'Are you sure?',
     text: "You won't be able to revert this!",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Yes, delete it!',
     cancelButtonText: 'No, cancel!',
     reverseButtons: true
   }).then((result) => {
     if (result.isConfirmed) {
       this.sc.deletecat(cat.id).subscribe(()=>
       {this.categories.splice(this.categories.indexOf(cat),1);
 
       swalWithBootstrapButtons.fire(
         'Deleted!',
         'Your file has been deleted.',
         'success'
       );})
     } else if (
       /* Read more about handling dismissals below */
       result.dismiss === Swal.DismissReason.cancel
     ) {
       swalWithBootstrapButtons.fire(
         'Cancelled',
         'Your imaginary file is safe :)',
         'error'
       )
     }
   })
   

  
}
getCategoryById(id:number){
  this.sc.getCategory(id).subscribe(data=>{this.categorie=data; this.p.categorie.id=this.categorie.id;
    this.p.categorie.nom=this.categorie.nom;});
 
}

 
 onPhotoSelected(event: any) {
  this.photo = event.target.files[0];
}
updateProduit(): void {
   this.getCategoryById(this.id);
   
   
  
    
 this.service.updateProduct(this.photo,this.prod).subscribe(
    response => {
      console.log(response);
      //console.log(JSON.stringify(this.newProduit));
      console.log(this.prod);
      
      // Vider le formulaire et recharger la liste des produits
      this.prod = {
        id: '',
        nom: '',
        prix: 0,
        quantite: 0,
        photo: "",
    categorie: {id:0,nom:""},
    prix_achat:0,vendeur:{id:0}
      };
     this.photo=new File([], '');


      // Charger la liste des produits
      // this.listeProduits = this.serviceProduit.getListeProduits();
    },
   
  );
}

 selectCat(event:any){

   this.id=(parseInt(event.target.value));
   this.getCategoryById(this.id);
  

}
selectCategorie(event:any){
this.id=parseInt(event.target.value);
this.sc.getCategory(this.id).subscribe(data=>{this.categorie=data;  this.cat.id=this.categorie.id;  this.cat.nom=this.categorie.nom;
  this.produitF=this.produits.filter(x=>x.categorie.nom.indexOf(this.cat.nom)!=-1)
});

 

  }

createNewCategory() {
  if (this.nomNewCat=='') {
      alert("Name cannot be empty.");

      return;
  }
  this.newCategory = new Categorie();
  this.newCategory.nom = this.nomNewCat;
 
 console.log(this.newCategory);

  this.sc.addCategorie(this.newCategory).subscribe(() => {
       this.catadded=true;
          this.nomNewCat = "";},);

}



showDescription(): void {
  const description = document.getElementById("description");
  if (description !== null) {
    if (description.style.display === "none") {
      description.style.display = "block";
    } else {
      description.style.display = "none";
    }
  }
}



}

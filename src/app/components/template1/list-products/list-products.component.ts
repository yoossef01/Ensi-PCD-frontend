import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { Vendeur } from 'src/app/model/vendeur';
import { ProduitService } from 'src/app/produit.service';
import { VendeurService } from 'src/app/vendeur.service';
import Swal from 'sweetalert2';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { UpdateProductDialogComponent } from '../../update-product-dialog/update-product-dialog.component';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  produits: Produit[]=[] ;
  public isCollapsed = false;
  public isCollapsed2 = false;
  private catadded =false;
  produitF!:Produit[];
  nomNewCat:string;
  newCategory: Categorie;
  categorieProduit:Categorie=new Categorie(0,"",{id:0}); 
  produit:Produit=new Produit("","",0,0,"",this.categorieProduit,0,{id:0}) ;
  produitModifie:Produit=new Produit("","",0,0,"",this.categorieProduit,0,{id:0}) ;
  idCategorie:number;
  categories:Categorie[]=[];
  categorie: Categorie;
  photo:File;
  vendeur:Vendeur=new Vendeur(0,0,"","","","","","","");
  selectedValue = 'Vendeur';
  isEditMode = false;
  Client = 'Client';
 
Vendeur='Vendeur';
  
  set texte(ch:string)
  {
 this.produitF=this.filtrer(ch);
  }
  filtrer(mot:string)
  {
   return this.produitF.filter(x=>x.nom.indexOf(mot)!=-1)
  }
   
  constructor(private service:ProduitService,private sc:CategorieService,
    public dialog:MatDialog,private vendeurservice:VendeurService ) { }
     getCurrentVendeur(){
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur =>
    {if(vendeur) this.vendeur=vendeur;console.log("le vendeur "+this.vendeur.id+" est connecté")
    //affichage de liste de produit de currentVendeur
    this.service.getProductsByVendeur(this.vendeur.id).subscribe(data=>{this.produitF=data;} )});}
  
  ngOnInit(): void {
    
    this.getAll();
    this.getCurrentVendeur();
  }

  
  getAll()
  {
    this.sc.getAllCategories().subscribe(data=>{this.categories=data; this.categories=this.categories})
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
  this.sc.getCategory(id).subscribe(data=>{this.categorieProduit=data; 
   });
}
selectCategorie(event:any){
  this.idCategorie=parseInt(event.target.value);
  this.sc.getCategory(this.idCategorie).subscribe(data=>{this.categorieProduit=data; 
  this.produitF=this.produits.filter(x=>x.categorie.nom.indexOf(this.categorieProduit.nom)!=-1)});
   }

createNewCategory() {
  if (this.nomNewCat=='') {
      alert("Name cannot be empty.");

      return;
  }
  this.newCategory.nom = this.nomNewCat;
  this.newCategory.vendeur.id=this.vendeur.id;
  console.log(this.newCategory);
 
  this.sc.addCategorie(this.newCategory).subscribe(() => {
       this.catadded=true;
          this.nomNewCat = "";},);

}
modifierCategorie(id:number ,nom:string): void {
  const cat :Categorie={id:id ,nom:nom,vendeur: {id:this.vendeur.id}}
  this.sc.modifierCategorie(id, cat)
    .subscribe(cat => this.categorie = cat);
}

enableEditMode(id: number): void {
  this.isEditMode = true;
}

cancelEditMode(): void {
  this.isEditMode = false;
}
openDialog(){
  let dialogRef = this.dialog.open(DialogBoxComponent, {
    width: '700px'
  });
  
  }
  openDialogUpdate(id:string){
  let dialogRef = this.dialog.open(UpdateProductDialogComponent, {
    width: '700px',
    data: {id}
    
  });
  }
}

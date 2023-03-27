import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';
import Swal from 'sweetalert2';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { UpdateProductDialogComponent } from '../update-product-dialog/update-product-dialog.component';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.css']
})
export class Template1Component implements OnInit {
  categories!:Categorie[];
  produitF!:Produit[];
  produits: Produit[] ;
 Buttons:number;
 selectedValue = 'Client';
 Client = 'Client';
 
Vendeur='Vendeur';
 id:number;
 idProduit:string;
 produit!:Produit;
  public isCollapsed = false;
public isCollapsed2 = false;
   private catadded =false;
   newCategory: Categorie;
   nomNewCat:string;
   categorie: Categorie = new Categorie();
  cat:Categorie = new Categorie();
  p: Produit = {
    id: '',
    nom: '',
    prix: 0,
    quantite: 0,
    photo: "",
    categorie: {id:0,nom:""},
    prix_achat:0
  };
  photo:File;

  set texte(ch:string)
  {
 this.produitF=this.filtrer(ch);
  }
  filtrer(mot:string)
  {
   return this.produits.filter(x=>x.nom.indexOf(mot)!=-1)
  }
  constructor(private sc:CategorieService,private service:ProduitService,public dialog:MatDialog) { }
 getAll()
 {
   this.service.getAllProducts().subscribe(data=>{this.produits=data; this.produitF=this.produits})
   this.sc.getAllCategories().subscribe(data=>{this.categories=data; this.categories=this.categories})
 }
  ngOnInit(): void {
   this.getAll();
    this.Buttons=1;
   
  this.sc.getCategory(1).subscribe(data=>{this.categorie=data;  this.categorie=this.categorie;});
    //  setInterval(() => {
    //   this.added();
    // }, 1000);
    // setInterval(() => {
    //   this.Catadded();
    // }, 1000);
    ;
   }
HomePage():void{
  this.Buttons=1;
}
ProduitsPage():void{
  this.Buttons=2;
}
onChange(event:any) {
  this.selectedValue = event.target.checked ? 'Client' : 'Vendeur';
}
ProduitDetails(id:string):void{
this.idProduit=id;
console.log(this.idProduit);
this.Buttons=3;
this.service.getProduct(id!).subscribe(data =>{
  this.produit = data;
  console.log(this.produit);


});

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
 
}



selectCategorie(event:any){
this.id=parseInt(event.target.value);
this.sc.getCategory(this.id).subscribe(data=>{this.categorie=data;  this.cat.id=this.categorie.id;  this.cat.nom=this.categorie.nom;
this.produitF=this.produits.filter(x=>x.categorie.nom.indexOf(this.cat.nom)!=-1)
});



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
}}

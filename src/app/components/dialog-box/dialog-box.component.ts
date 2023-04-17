import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';
import { ViewChild } from '@angular/core';
import { VendeurService } from 'src/app/vendeur.service';
import { Vendeur } from 'src/app/model/vendeur';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  @ViewChild('myInput')
myInputVariable: ElementRef;
img:string;
isNomEmpty: boolean;

  p: Produit = {
    id: '',
    nom: '',
    prix: 0,
    quantite: 0,
    photo: "",
    categorie: {id:0,nom:"",vendeur: {id: 0}},
    prix_achat:0,vendeur:{id:0}
  };id:number;
  categories!:Categorie[];
  v:Vendeur;
  categorie: Categorie = new Categorie();
  
  photo:File;
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private service:ProduitService,private sc:CategorieService,private vendeurservice :VendeurService) { }

  ngOnInit(): void {
    this.sc.getAllCategories().subscribe(data=>{this.categories=data; this.categories=this.categories})
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur => {if(vendeur) this.v=vendeur;console.log("le vendeur"+this.v.nom+"est connecté")});


  this.img="./assets/150x150.png";
  }
  getCategoryById(id:number){
    this.sc.getCategory(id).subscribe(data=>{this.categorie=data; this.p.categorie=this.categorie});
   
  }
  
  
  onPhotoSelected(event: any): void {
     
    this.photo =event.target.files[0];
     if (this.photo) {
       const reader = new FileReader();
       reader.readAsDataURL(this.photo);
       reader.onload = () => {
         this.img = reader.result as string;
       };
     }
   }
  reset() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
}
  selectCat(event:any){
    console.log(''+this.id)
    this.id=(parseInt(event.target.value));
    
    this.getCategoryById(this.id);
   
 
 }
 
  addProduit(): void {
    this.getCategoryById(this.p.categorie.id);
    this.p.vendeur.id=this.v.id;
    this.p.id=uuidv4();
 
     
  this.service.addProduit(this.p,this.photo).subscribe(()=>
      {this.service.added=true;
       
       //console.log(JSON.stringify(this.newProduit));
       
       
       // Vider le formulaire et recharger la liste des produits
       this.p = {
         id: '',
         nom: '',
         prix: 0,
         quantite: 0,
         photo: "",
     categorie: {id:0,nom:"",vendeur: {id: 0}},
     prix_achat:0,vendeur:{id:0}
       };
       this.reset();
      this.photo=new File([], '');
 
 
       // Charger la liste des produits
       // this.listeProduits = this.serviceProduit.getListeProduits();
     },
    
   );
   this.isNomEmpty = this.p.nom.trim() === '';

 }

  onCancel(): void {
    this.dialogRef.close();
  }
}

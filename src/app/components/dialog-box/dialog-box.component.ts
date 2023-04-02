import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';
import { ViewChild } from '@angular/core';
import { Magasin } from 'src/app/model/magasin';
import { MagasinService } from 'src/app/magasin.service';

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
    categorie: {id:0,nom:""},
    prix_achat:0,
    magasin:{id:0,nom:""}
  };id:number;
  categories!:Categorie[];
  magasins!:Magasin[];
  categorie: Categorie = new Categorie();
  magasin:Magasin=new Magasin();
  photo:File;
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private service:ProduitService,private sc:CategorieService,private ms:MagasinService) { }

  ngOnInit(): void {
    this.sc.getAllCategories().subscribe(data=>{this.categories=data; this.categories=this.categories})
    this.ms.getAllMagasins().subscribe(data=>{this.magasins=data; this.magasins=this.magasins})

  this.img="./assets/150x150.png";
  }
  getCategoryById(id:number){
    this.sc.getCategory(id).subscribe(data=>{this.categorie=data; this.p.categorie=this.categorie});
   
  }
  getMagasinById(id:number){
    this.ms.getMagasin(id).subscribe(data=>{this.magasin=data; this.p.magasin=this.categorie;
      });
   
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
 selectMag(event:any){

  this.id=(parseInt(event.target.value));
  this.getMagasinById(this.id);
 

}
  addProduit(): void {
    this.getCategoryById(this.id);
    this.getMagasinById(this.id);
    
   const pp:string="{\"nom\":\""+this.p.nom+
     "\",\"prix\":"+this.p.prix+",\"quantite\":"+this.p.quantite+",\"prix_achat\":"+this.p.prix_achat+
     ",\"categorie\":{\"id\":"+this.p.categorie.id+" ,\"nom\":\""+this.p.categorie.nom+"\"}" +
     ",\"magasin\":{\"id\":"+this.p.magasin.id+" ,\"nom\":\""+this.p.magasin.nom+"\"}}";
     
  this.service.addProduit(pp,this.photo).subscribe(()=>
      {this.service.added=true;
       
       //console.log(JSON.stringify(this.newProduit));
       
       
       // Vider le formulaire et recharger la liste des produits
       this.p = {
         id: '',
         nom: '',
         prix: 0,
         quantite: 0,
         photo: "",
     categorie: {id:0,nom:""},
     prix_achat:0,
     magasin:{id:0,nom:""}
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

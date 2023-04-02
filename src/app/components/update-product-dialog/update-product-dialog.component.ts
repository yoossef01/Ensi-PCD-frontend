import { Component, ElementRef, OnInit,Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service';
import { MagasinService } from 'src/app/magasin.service';
import { Categorie } from 'src/app/model/categorie';
import { Magasin } from 'src/app/model/magasin';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.css']
})
export class UpdateProductDialogComponent implements OnInit {
  prod!:Produit;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
   id:number;
   img:string;
    categories!:Categorie[];
    magasins!: Magasin[];
    categorie: Categorie = new Categorie();
    magasin:Magasin=new Magasin();
    photo:File;
  constructor(public dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private service:ProduitService,
    private sc:CategorieService,private ar:ActivatedRoute,private ms:MagasinService) { }

  ngOnInit(): void { this.sc.getAllCategories().subscribe(data=>{this.categories=data; this.categories=this.categories})
  this.service.getProduct(this.data.id).subscribe(data =>this.prod=data);
  this.ms.getAllMagasins().subscribe(data=>{this.magasins=data; this.magasins=this.magasins});
  
  console.log(this.prod);
  }
  getCategoryById(id:number){
    this.sc.getCategory(id).subscribe(data=>{this.categorie=data; this.prod.categorie=this.categorie;
      });
   
  }
  getMagasinById(id:number){
    this.ms.getMagasin(id).subscribe(data=>{this.magasin=data; this.prod.magasin=this.categorie;
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

    this.id=(parseInt(event.target.value));
    this.getCategoryById(this.id);
   
 
 }
 selectMag(event:any){

  this.id=(parseInt(event.target.value));
  this.getMagasinById(this.id);
 

}
 updateProduit(): void {
  this.getCategoryById(this.id);
  this.getMagasinById(this.id);

  
 // const pp:string="{\"nom\":\""+this.p.nom+
 //   "\",\"prix\":"+this.p.prix+",\"quantite\":"+this.p.quantite+",\"prix_achat\":"+this.p.prix_achat+
 //   ",\"categorie\":{\"id\":"+this.p.categorie.id+" ,\"nom\":\""+this.p.categorie.nom+"\"}}";
   
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
   prix_achat:0,
   magasin:{id:0,nom:""}
     };this.reset();
    this.photo=new File([], '');


     // Charger la liste des produits
     // this.listeProduits = this.serviceProduit.getListeProduits();
   },
  
 );
}

  onCancel(): void {
    this.dialogRef.close();
  }
}




import { Component, ElementRef, OnInit,Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/model/categorie';
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
    categorie: Categorie = new Categorie();
    photo:File;
  constructor(public dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private service:ProduitService,
    private sc:CategorieService,private ar:ActivatedRoute) { }

  ngOnInit(): void { this.sc.getAllCategories().subscribe(data=>{this.categories=data; this.categories=this.categories})
  this.service.getProduct(this.data.id).subscribe(data =>this.prod=data);
 
  
  console.log(this.prod);
  }
  getCategoryById(id:number){
    this.sc.getCategory(id).subscribe(data=>{this.categorie=data; this.prod.categorie.id=this.categorie.id;
      this.prod.categorie.nom=this.categorie.nom;});
   
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
 updateProduit(): void {
  this.getCategoryById(this.id);
  
  
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
   prix_achat:0
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




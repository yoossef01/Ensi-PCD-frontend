import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  // constructor(private ar:ActivatedRoute, private service:ProduitService) { }
  // produit!:Produit;
  // ngOnInit(): void {

  //   let id=this.ar.snapshot.paramMap.get('id');
  //   console.log(id)
  //   this.service.getProduct(id!).subscribe(data =>this.produit=data)
  // }
  prod!:Produit;
  // prod: Produit = {
  //   id: '38df45e4-e155-426e-ba81-2ea4128c15da',
  //   nom: 'aziz',
  //   prix: 0,
  //   quantite: 0,
  //   photo: "",
  //   categorie: {id:1,nom:"informatique"},
  //   prix_achat:0
  // };
  @ViewChild('myInput')
  myInputVariable: ElementRef;
   id:number;
   
    categories!:Categorie[];
    categorie: Categorie = new Categorie();
    photo:File;
    constructor(
      public dialogRef: MatDialogRef<DetailsComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any,private service:ProduitService,private sc:CategorieService,private ar:ActivatedRoute) { }
  
    ngOnInit(): void {console.log(this.data.id); 
      
      this.sc.getAllCategories().subscribe(data=>{this.categories=data; this.categories=this.categories})
  //   let id=this.ar.snapshot.paramMap.get('id');
  //  console.log(id);
    this.service.getProduct(this.data.id).subscribe(data =>this.prod=data);
    console.log(this.prod);
    }
    getCategoryById(id:number){
      this.sc.getCategory(id).subscribe(data=>{this.categorie=data; this.prod.categorie.id=this.categorie.id;
        this.prod.categorie.nom=this.categorie.nom;});
     
    }
    onPhotoSelected(event: any) {
      this.photo = event.target.files[0];
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
  


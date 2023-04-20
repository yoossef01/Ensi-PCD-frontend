import { Component, OnInit } from '@angular/core';
import { AchatService } from 'src/app/achat.service';
import { CommandeService } from 'src/app/commande.service';
import { Achat } from 'src/app/model/achat';
import { Commande } from 'src/app/model/commande';
import { Produit } from 'src/app/model/produit';
import { Vendeur } from 'src/app/model/vendeur';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit{
  commandes:Commande[];
  achats : Achat[];
  vendeur! : Vendeur;

  achat: Achat = {
    id:'' ,
    date: new Date(),
    montant: 0,
    nom : "fir",
    quantite:0,
    product: {
      id: '',
      nom: '',
      prix: 0,
      quantite: 0,
      photo: "",
      categorie: {id:1,nom:"informatique"},
      prix_achat:0,vendeur:{id:0}
    },
    vendeur: {id:1}
  };


somme:number=0;
produit!:Produit;
  constructor(private cs:CommandeService, private achatservice: AchatService){}
  ngOnInit(): void {
    this.getCommandes();
  }
  getCommandes(){      this.cs.getAllCommandes().subscribe(data=>{this.commandes= data;
    for (let a of data){
      console.log(a.product.vendeur)
    }  });
}
  getSomme(): number {
    let somme = 0;
    for (let commande of this.commandes) {
      somme += commande.montant;
    }
    return somme;
  }
  UpdateMontantTotal(c:Commande):void{
    
      c.montant=c.product.prix*c.quantite;
this.cs.updateCommande(c).subscribe(data =>{c=data;console.log(c);} );
  }

  decrementQuantity(c: Commande) {
    if (c.quantite > 0) {
      c.quantite--;
      this.UpdateMontantTotal(c);
    }
  }
  
  incrementQuantity(c: Commande) {
    c.quantite++;
    this.UpdateMontantTotal(c);
  }
  DeleteCommande(id: string) {
   
     
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
        this.cs.deleteCommande(id).subscribe(
          data => {
            console.log(data);
            this.getCommandes();
  
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


  addAchat(): void {


    this.achat.date=new Date();
    this.achat.product.id=this.produit.id;
    this.achat.vendeur.id=this.vendeur.id;
    this.achat.id=uuidv4();

      this.achatservice.saveAchat(this.achat)
        .subscribe(data => console.log(data));

    }


}

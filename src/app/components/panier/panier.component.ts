import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/commande.service';
import { Commande } from 'src/app/model/commande';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit{
  commandes:Commande[];
somme:number=0;

  constructor(private cs:CommandeService){}
  ngOnInit(): void {
    this.getCommandes();
  }
  getCommandes(){      this.cs.getAllCommandes().subscribe(data=>{this.commandes= data;});
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

}

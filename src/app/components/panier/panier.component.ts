import { Component, OnInit } from '@angular/core';
import { AchatService } from 'src/app/commande.service';
import { Achat } from 'src/app/model/commande';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit{
  achats:Achat[];
somme:number=0;

  constructor(private as:AchatService){}
  ngOnInit(): void {
    this.getAchats();
  }
  getAchats(){      this.as.getAllAchats().subscribe(data=>{this.achats= data;});
}
  getSomme(): number {
    let somme = 0;
    for (let achat of this.achats) {
      somme += achat.montant;
    }
    return somme;
  }
  UpdateMontantTotal(a:Achat):void{
    
      a.montant=a.product.prix*a.quantite;
this.as.updateAchat(a).subscribe(data =>{a=data;console.log(a);} );
  }

  decrementQuantity(a: Achat) {
    if (a.quantite > 0) {
      a.quantite--;
      this.UpdateMontantTotal(a);
    }
  }
  
  incrementQuantity(a: Achat) {
    a.quantite++;
    this.UpdateMontantTotal(a);
  }
  DeleteAchat(id: string) {
   
     
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
        this.as.deleteAchat(id).subscribe(
          data => {
            console.log(data);
            this.getAchats();
  
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

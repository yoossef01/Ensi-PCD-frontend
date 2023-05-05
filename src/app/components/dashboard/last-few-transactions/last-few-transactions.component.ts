import { Component , OnInit} from '@angular/core';
import { forkJoin } from 'rxjs';
import { AchatService } from 'src/app/achat.service';
import { ClientService } from 'src/app/client.service';
import { Achat } from 'src/app/model/achat';
import { Client } from 'src/app/model/client';
import { Produit } from 'src/app/model/produit';
import { Vendeur } from 'src/app/model/vendeur';
import { ProduitService } from 'src/app/produit.service';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-last-few-transactions',
  templateUrl: './last-few-transactions.component.html',
  styleUrls: ['./last-few-transactions.component.scss']
})
export class LastFewTransactionsComponent implements OnInit {

  achat : Achat[];
  vendeur : Vendeur;
  produitF : Produit[];
  produit : Produit;
  data: any[] = [];
  client: Client;


  constructor(private achatService: AchatService, private vendeurservice : VendeurService, private service: ProduitService, private clientService: ClientService, private produitService : ProduitService) { }

  ngOnInit(): void {
    this.getCurrentVendeur();
  }


  getCurrentVendeur(){
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur =>
    {if(vendeur) this.vendeur=vendeur;
    this.service.getProductsByVendeur(this.vendeur.id).subscribe(data=>{this.produitF=data; this.getNombreAchat(this.vendeur.id)}    )});}


    getNombreAchat(i: number): void {
      let nombre = 0;
      let totalerevenu: number = 0;
      this.achatService.getAchatByVendeur(i).subscribe(achats => {
        this.achat = achats;
        const observables = [];
    
        for (let a of achats) {
          observables.push(
            this.clientService.getClientById(a.client.id),
            this.produitService.getProduct(a.product.id)
          );
        }
    
        forkJoin(observables).subscribe(results => {
          for (let i = 0; i < results.length; i += 2) {
            const client = results[i];
            const produit = results[i + 1];
            const achat = achats[i / 2];
            this.data.push({
              id: achat.id,
              title: achat.nom,
              price: achat.montant,
              shop: this.client.nom,
              location: this.client.tel,
              status: "vendu",
              imgSrc: produit.id
            });
          }

        });
      });
    }


  transactions = this.data;

}

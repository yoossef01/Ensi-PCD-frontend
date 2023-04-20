import { Component, OnInit } from '@angular/core';
import { AchatService } from 'src/app/achat.service';
import { Achat } from 'src/app/model/achat';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.scss']
})
export class TopWidgetsComponent implements OnInit {

  nombreachat : any;
  totalerevenu : number;
  constructor(private achatService: AchatService) {}

  ngOnInit(): void {
    this.getNombreAchat();
  }

  getNombreAchat(): void {
    let nombre = 0;
    let totalerevenu: number = 0;
    this.achatService.getAllAchat().subscribe(achats => {
      for (let a of achats) {
        nombre = nombre + 1;
        totalerevenu = totalerevenu + a.montant;
        console.log(totalerevenu);
      }
      this.nombreachat = nombre;
      this.totalerevenu = totalerevenu;
      console.log('somme', this.nombreachat);

    })
  }



}

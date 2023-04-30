import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Vendeur } from 'src/app/model/vendeur';
import { VendeurService } from 'src/app/vendeur.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

vendeurs:Vendeur[]=[];

constructor(private vendeurService:VendeurService) { }
  
  

  ngOnInit(): void {
    this.vendeurService.getAllVendeurs().subscribe(data=>{this.vendeurs=data;console.log(this.vendeurs)})
  }


}

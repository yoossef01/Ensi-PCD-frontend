import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/app/model/client';
import { Vendeur } from 'src/app/model/vendeur';
import { TemplateserviceService } from 'src/app/templateservice.service';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-choosetemplate',
  templateUrl: './choosetemplate.component.html',
  styleUrls: ['./choosetemplate.component.css']
})
export class ChoosetemplateComponent implements OnInit {
  
  currentVendeurId: number;
  currentSeller: Vendeur;
  v:Vendeur;


  constructor(private route:Router,public numtemplate:TemplateserviceService,public vendeurservice:VendeurService) { }

  ngOnInit(): void {
   
    this.getCurrentVendeur();
  }

  getCurrentVendeur(){
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur => {if(vendeur) 
      {this.v=vendeur;console.log("le vendeur: "+this.v.id+" est connecté")}
      else console.log("nest pas connecté")}
    );
  }
  
firstchoice(){
  
  
  this.route.navigateByUrl('/template1/'+this.vendeurservice.id);
}
secondchoice(){
  
    this.v.idTemplate=2;
   this.vendeurservice.UpdateVendeur(this.v).subscribe(data=>{this.v=data;console.log(this.v)})
  this.route.navigateByUrl('/template2/'+this.vendeurservice.id);
}
thirdchoice(){
  
 this.route.navigateByUrl('/template3/'+this.vendeurservice.id);
}
}

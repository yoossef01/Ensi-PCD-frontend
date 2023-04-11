import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Vendeur } from 'src/app/model/vendeur';
import { TemplateserviceService } from 'src/app/templateservice.service';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-choosetemplate',
  templateUrl: './choosetemplate.component.html',
  styleUrls: ['./choosetemplate.component.css']
})
export class ChoosetemplateComponent implements OnInit {
  public NumTemplate:number
  currentVendeurId: number;
  currentSeller: Vendeur;

  v:Vendeur=new Vendeur();
  constructor(private route:Router,public numtemplate:TemplateserviceService,public vendeurservice:VendeurService) { }

  ngOnInit(): void {
    this.vendeurservice.checkLoginStatus();
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur => {if(vendeur) this.v=vendeur});
  }


  getNumtemplate(){
    this.NumTemplate=this.numtemplate.NumTemplate;
  }
firstchoice(){
  
  this.numtemplate.NumTemplate=1;
  this.route.navigateByUrl('/template1/'+this.vendeurservice.id);
}
secondchoice(){
  this.numtemplate.NumTemplate=2;
  this.vendeurservice.getVendeurById(this.v.id).subscribe(data=>{this.v=data;
    this.v.idTemplate=2;
    this.vendeurservice.UpdateVendeur(this.v).subscribe(data=>{this.v=data;console.log(this.v)})})
  this.route.navigateByUrl('/template2/'+this.vendeurservice.id);
}
thirdchoice(){
  this.numtemplate.NumTemplate=3;
  this.route.navigateByUrl('/template3/'+this.vendeurservice.id);
}
}

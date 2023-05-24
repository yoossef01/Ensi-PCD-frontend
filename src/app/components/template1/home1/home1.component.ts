import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateContent } from 'src/app/model/template-content';
import { Vendeur } from 'src/app/model/vendeur';
import { TemplateContentService } from 'src/app/template-content.service';
import { VendeurService } from 'src/app/vendeur.service';
import Swal from 'sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';

interface MySweetAlertOptions extends SweetAlertOptions {
  didOpen?: () => void;
  willClose?: () => void;
}


@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit {
  templateContent:TemplateContent=new TemplateContent(0,"","","","",{id:0});

  constructor (private router: Router, private servicevendeur:VendeurService,private serviceTemplate:TemplateContentService) {}

  ngOnInit(): void {
this.serviceTemplate.getTemplateByVendeur(this.servicevendeur.getIdVendeur()).subscribe(data=>{this.templateContent=data;})
    
  }

  navigation() {
    this.router.navigate(['/listeproduitclient1/'+this.servicevendeur.getIdVendeur()]);
  }




  // selectedValue = 'Vendeur';
  // isEditMode = false;
  // Client = 'Client';
  // Vendeur='Vendeur';
  // onChange(event:any) {
  //   this.selectedValue = event.target.checked ? 'Client' : 'Vendeur';
  // }
  // enableEditMode(id: number): void {
  //   this.isEditMode = true;
  // }
  
  // cancelEditMode(): void {
  //   this.isEditMode = false;
  // }









}

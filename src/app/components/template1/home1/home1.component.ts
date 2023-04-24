import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vendeur } from 'src/app/model/vendeur';
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

  constructor (private router: Router, private servicevendeur:VendeurService) {}

  ngOnInit(): void {

    
  }

  navigation() {
    this.router.navigate(['/listeproduitclient/'+this.servicevendeur.getIdVendeur()]);
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

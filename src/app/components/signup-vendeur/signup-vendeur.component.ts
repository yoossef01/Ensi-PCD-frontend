import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-signup-vendeur',
  templateUrl: './signup-vendeur.component.html',
  styleUrls: ['./signup-vendeur.component.css']
})
export class SignupVendeurComponent implements OnInit{
  constructor(private service: VendeurService, private router: Router) { }
  ngOnInit(): void {}

  data: any

  formVendeur = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    adresse : new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  submit(){
    this.data = this.formVendeur.value
    console.log(this.data)

    this.service.adduser(this.data).subscribe(data => {
      console.log(data)
    })

    
    
    this.router.navigate(['/loginVendeur']);
  }

}







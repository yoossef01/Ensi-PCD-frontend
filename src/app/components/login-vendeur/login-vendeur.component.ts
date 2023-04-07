import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-login-vendeur',
  templateUrl: './login-vendeur.component.html',
  styleUrls: ['./login-vendeur.component.css']
})
export class LoginVendeurComponent {model: any = {};
  
  
 

constructor(
  private router: Router, private vendeurservice:VendeurService
 
) {}






loginUser() {

  var vendeur = this.model.email;
  var password = this.model.password;
  

   
  this.vendeurservice.login(vendeur, password)
    .subscribe((res : any) => {
      
      console.log('res',res)
      localStorage.setItem('token',res.token)
      
      this.router.navigate(['/home'])
    },
    (error: HttpErrorResponse) => {
      alert("invalid user");
      console.log(error);
    }
    )
    }

}

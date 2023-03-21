import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Loginuser } from 'src/app/model/loginuser';
import { Registration } from 'src/app/model/registration';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
public registre:Registration;
public loginuser:Loginuser;
signupusers:any[]=[];
  constructor(private route: Router) { 
    this.registre=new Registration();
    this.loginuser=new Loginuser();
  }

  ngOnInit(): void {
  }
  onSignup()
  {this.signupusers.push(this.registre);
    localStorage.setItem('signUpUsers',JSON.stringify(this.signupusers));
    console.log(this.registre)
  }
onLogin(){
  console.log(this.loginuser)
  this.route.navigateByUrl('/choose');
}
}

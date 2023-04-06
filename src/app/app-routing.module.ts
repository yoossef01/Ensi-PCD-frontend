import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChoosetemplateComponent } from './components/choosetemplate/choosetemplate.component';
import { HomeComponent } from './components/home/home.component';



import { SignupComponent } from './components/signup/signup.component';
import { TemplateComponent } from './components/template/template.component';
import { ListeproduitsComponent } from './components/listeproduits/listeproduits.component';
import { DetailsComponent } from './components/details/details.component';
import { Template1Component } from './components/template1/template1.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { LoginComponent } from './components/login/login.component';
import { Home2Component } from './components/template2/home2/home2.component';
import { AjoutProduitComponent } from './components/template2/ajout-produit/ajout-produit.component';
import { AjoutCategorieComponent } from './components/template2/ajout-categorie/ajout-categorie.component';
import { SignupVendeurComponent } from './components/signup-vendeur/signup-vendeur.component';
import { LoginVendeurComponent } from './components/login-vendeur/login-vendeur.component';



const routes: Routes = [
  {path:'home',component: HomeComponent}
  ,{path:'signup',component:SignupComponent},
  {path:"products/:id",component: DetailsComponent},
  {path:"deta",component:DetailsComponent},
  {path:'choose',component:ChoosetemplateComponent},
  {path:'template',component:TemplateComponent},{
  path:'liste',component:ListeproduitsComponent
  },{path:'template1',component:Template1Component},{
   path:'insc',component:InscriptionComponent
  },{path:'login', component:LoginComponent},
  {path:'template2home', component:Home2Component},
  {path:'signupVendeur',component:SignupVendeurComponent},
  {path:'loginVendeur',component:LoginVendeurComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

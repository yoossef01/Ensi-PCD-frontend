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
import { PanierComponent } from './components/panier/panier.component';
import { SignupVendeurComponent } from './components/signup-vendeur/signup-vendeur.component';
import { LoginVendeurComponent } from './components/login-vendeur/login-vendeur.component';
import { HomeclientComponent } from './components/template2/homeclient/homeclient.component';
import { AchatComponent } from './components/template2/achat/achat.component';

import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';



const routes: Routes = [
  {path:'home',component: HomeComponent},
  {path:'signup',component:SignupComponent},
  {path:"products/:id",component: DetailsComponent},
  {path:'choose',component:ChoosetemplateComponent},
  {path:'template',component:TemplateComponent},{
  path:'liste',component:ListeproduitsComponent},
  {path:'template1',component:Template1Component},{
   path:'insc',component:InscriptionComponent
  },{
    path:'login', component:LoginComponent},
    {path:'Panier',component:PanierComponent}
  ,
  {path:'template2/:id',component:Home2Component},
  {path:'signupVendeur',component:SignupVendeurComponent},
  {path:'loginVendeur',component:LoginVendeurComponent},
  {path:'template2ajoutproduit',component:AjoutProduitComponent},
  {path:'template2ajoutcategorie',component:AjoutCategorieComponent},
  {path: 'homeclient/:id', component:HomeclientComponent},
  {path:'achat', component:AchatComponent},

{path:'dashboard', component: DashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

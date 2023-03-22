import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChoosetemplateComponent } from './components/choosetemplate/choosetemplate.component';
import { HomeComponent } from './components/home/home.component';



import { SignupComponent } from './components/signup/signup.component';
import { TemplateComponent } from './components/template/template.component';
import { ListeproduitsComponent } from './components/listeproduits/listeproduits.component';
import { DetailsComponent } from './components/details/details.component';
import { Template1Component } from './components/template1/template1.component';

const routes: Routes = [
  {path:'home',component: HomeComponent}
  ,{path:'signup',component:SignupComponent},
  {path:"products/:id",component: DetailsComponent},
  {path:"deta",component:DetailsComponent},
  {path:'choose',component:ChoosetemplateComponent},
  {path:'template',component:TemplateComponent},{
  path:'liste',component:ListeproduitsComponent
  },{path:'template1',component:Template1Component}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

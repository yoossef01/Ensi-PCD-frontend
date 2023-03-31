import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';

import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChoosetemplateComponent } from './components/choosetemplate/choosetemplate.component';
import { TemplateComponent } from './components/template/template.component';
import { ListeproduitsComponent } from './components/listeproduits/listeproduits.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './components/details/details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonToggleModule}from '@angular/material/button-toggle'; 
  
   import   {MatButtonModule,MatInputModule,MatRadioModule,MatDialogModule,MatCommonModule,MatSliderModule, MatAutocompleteModule,MatIconModule,
  MatCheckboxModule,MatSelectModule,MatFormFieldModule,MatSlideToggleModule,MatBadgeModule,} from '@angular/material'; 
 import  {CommonModule}  from '@angular/common'; 
  // import {} from '@angular/material/radio'; 
  // import {}  from '@angular/material/dialog'; 
  // import {} from '@angular/material/core'; 
  // import {}   from '@angular/material/slider'; 
  //    import{}from'@angular/material/autocomplete';
  //   import{} from '@angular/material/icon';
  //   import{} from '@angular/material/checkbox';
  //   import{ } from '@angular/material/select';
  //   import{} from '@angular/material/form-field';
   import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { Template1Component } from './components/template1/template1.component';
import { UpdateProductDialogComponent } from './components/update-product-dialog/update-product-dialog.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { LoginComponent } from './components/login/login.component';
import { Home2Component } from './components/template2/home2/home2.component';
import { AjoutProduitComponent } from './components/template2/ajout-produit/ajout-produit.component';
import { AjoutCategorieComponent } from './components/template2/ajout-categorie/ajout-categorie.component';
   // import{} from '@angular/material/slide-toggle';
//import {  } from '@angular/material/badge';

const materiel=[
  MatAutocompleteModule, MatIconModule, MatButtonModule,
   MatFormFieldModule, MatInputModule, MatCommonModule,MatSlideToggleModule,
    MatRadioModule, MatBadgeModule,MatSliderModule,MatCheckboxModule,
   MatSelectModule ,MatDialogModule ,MatBadgeModule,MatButtonToggleModule]
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    ChoosetemplateComponent,
    TemplateComponent,
    ListeproduitsComponent,
        DetailsComponent,
      DialogBoxComponent,
      Template1Component,
      UpdateProductDialogComponent,
      
      InscriptionComponent,
      LoginComponent,
      Home2Component,
      AjoutProduitComponent,
      AjoutCategorieComponent,
    
  ],
   schemas:[CUSTOM_ELEMENTS_SCHEMA]
,
   entryComponents:[DialogBoxComponent],
  imports: [BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,materiel,CommonModule,ReactiveFormsModule
  
    
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

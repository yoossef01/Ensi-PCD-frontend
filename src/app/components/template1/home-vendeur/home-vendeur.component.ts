import { Component, OnInit } from '@angular/core';
import { TemplateContent } from 'src/app/model/template-content';
import { TemplateContentService } from 'src/app/template-content.service';
@Component({
  selector: 'app-home-vendeur',
  templateUrl: './home-vendeur.component.html',
  styleUrls: ['./home-vendeur.component.css']
})
export class HomeVendeurComponent implements OnInit{
  templateContent:TemplateContent=new TemplateContent(0,"","","","",{id:0});
  isEditMode1 = false;
  isEditMode2 = false;
  isEditMode3 = false;
  photo:File;
  img:string;
  constructor(private templateService:TemplateContentService){}
  ngOnInit(){

    this.getTemplateByVendeur();
    
  }
  getTemplateByVendeur(){
    this.templateService.getTemplateByVendeur(252).subscribe(data=>{this.templateContent=data;console.log(this.templateContent)});
    
  }
  onPhotoSelected(event: any): void {
     
    this.photo =event.target.files[0];
     if (this.photo) {
       const reader = new FileReader();
       reader.readAsDataURL(this.photo);
       reader.onload = () => {
         this.img = reader.result as string;
       };
     }
   }
  
  enableEditMode1(): void {
    this.isEditMode1 = true;
  }
  
  cancelEditMode1(): void {
    this.isEditMode1 = false;
  }
  enableEditMode2(): void {
    this.isEditMode2 = true;
  }
  
  cancelEditMode2(): void {
    this.isEditMode2 = false;
  }
  enableEditMode3(): void {
    this.isEditMode3 = true;
  }
  
  cancelEditMode3(): void {
    this.isEditMode3 = false;
  }

  modifiertext1(newText: string) {
    
    this.templateContent.text1 = newText;
    this.templateService.updateTemplateContent(this.templateContent,this.photo).subscribe(()=>
      this.isEditMode1 = false
    );
  }
  modifiertext2(newText: string) {
    
    this.templateContent.text2 = newText;
    this.templateService.updateTemplateContent(this.templateContent,this.photo).subscribe(()=>
    this.isEditMode2 = false
  );
  }
  modifierDescription(newText: string) {
    
    this.templateContent.description = newText;
    this.templateService.updateTemplateContent(this.templateContent,this.photo).subscribe(()=>
    this.isEditMode3 = false
  );
  }
}

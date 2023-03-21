import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { TemplateserviceService } from 'src/app/templateservice.service';

@Component({
  selector: 'app-choosetemplate',
  templateUrl: './choosetemplate.component.html',
  styleUrls: ['./choosetemplate.component.css']
})
export class ChoosetemplateComponent implements OnInit {
  public NumTemplate:number
  constructor(private route:Router,public numtemplate:TemplateserviceService) { }

  ngOnInit(): void {
  }
  getNumtemplate(){
    this.NumTemplate=this.numtemplate.NumTemplate;
  }
firstchoice(){
  this.numtemplate.NumTemplate=1;
  this.route.navigateByUrl('/template');
}
secondchoice(){
  this.numtemplate.NumTemplate=2;
  this.route.navigateByUrl('/template');
}
thirdchoice(){
  this.numtemplate.NumTemplate=3;
  this.route.navigateByUrl('/template');
}
}

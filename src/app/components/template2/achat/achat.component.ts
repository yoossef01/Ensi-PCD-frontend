import { Component, OnInit } from '@angular/core';
import { AchatService } from 'src/app/achat.service';
import { Achat } from 'src/app/model/achat';

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.css']
})
export class AchatComponent implements OnInit {

  achat!: Achat[];
constructor(private achatservice: AchatService) {}
  ngOnInit(): void {
    this.getAllAchat();
  }

  getAllAchat () {
    this.achatservice.getAllAchat().subscribe(data => {this.achat = data;})
  }

}

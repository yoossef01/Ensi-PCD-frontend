import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {
 @ViewChild('canvas')
private canvasRef:ElementRef;
//Cube Properties
@Input() public rotationSpeedX:number=0.05;
@Input() public rotation:number=0.01;
@Input() public size: number=200;
@Input() public texture: string ="/assets/fatales.jpg";
// Stage Proprities
@Input() public cameraZ:number=400;
@Input() public filedOfView:number=2;
@Input('nearClipping') public nearClippingPlane:number=1;
@Input('farClipping') public farClippingPlane:number=1000;
//? Helper Properties(Private Properties);
// private camera!: THREE.PerspectiveCamera;
// private get canvas():HTMLCanvasElement{return this.canvasRef.nativeElement;}
//   private loader=new THREE.TextureLoader();
//   private geometry=new THREE.BoxGeometry(1,1,1);
//   private material=new THREE.MeshBasicMaterial({map:this.loader.load(this.texture)});
//   private cube:THREE.Mesh=new THREE.Mesh(this.geometry,this.material);
//   private renderer!:THREE.WebGLRenderer;
//   private scene!:THREE.Scene;
constructor() { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }
/**
 * @private
 * @memberof HomeComponent
 */
private createScene(){
  //Scene
  //this.scene = new THREE.Scene();
}
}

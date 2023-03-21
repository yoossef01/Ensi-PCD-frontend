import {Categorie} from "./categorie"
export class Produit {
   
    id: string;
    nom:string;
    prix:number;
    quantite:number;
    photo:string;
    categorie: Categorie;
    prix_achat:number;
}

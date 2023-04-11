import {Categorie} from "./categorie"
import { Vendeur } from "./vendeur";
export class Produit {
   
    id: string;
    nom:string;
    prix:number;
    quantite:number;
    photo:string;
    categorie: Categorie;
    prix_achat:number;
    vendeur: {id: number};
    

    
}


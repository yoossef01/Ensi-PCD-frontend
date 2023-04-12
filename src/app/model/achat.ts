import { Produit } from "./produit";
import { Vendeur } from "./vendeur";

export class Achat {
    id:string;
    date:Date;
    montant:number;
    nom:string;
    quantite:number;
    product:Produit;
    vendeur:{id: number};
}

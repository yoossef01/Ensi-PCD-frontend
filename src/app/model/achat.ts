import { Produit } from "./produit";

export class Achat {
    id:string;
    montant:number;
    date:Date;
    quantite:number;
    product:Produit;
}

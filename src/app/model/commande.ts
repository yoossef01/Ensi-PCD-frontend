import { Produit } from "./produit";


export class Commande {
    id:string;
    montant:number;
    date:Date;
    quantite:number;
    product:Produit;
    client:{id:number};
}

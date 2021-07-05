

export class Pays{
     code: string;
     nom: string;
     rang: number;
     statut: number;
}

export class TotalForm{

    count: number;
    forms: []
}

export class FIRESTORE_COLLECTIONS{
    public static PAYS = 'pays';
    public static FORMULAIRE = 'forme_covid';
    public static CONFIG = 'configs'
}
export class Config{
    count: number;
    current_index: number;
    date: string;
}

export class Adress{
    numero: string;
    rue: string; 
    ville: string; 
    codePostal: string;
}

export class User{
   id: number;
   firstName: string;
   lastName: string; 
   numero: string;
   login: string;
   email:string;
   password: string;
   image: string;
   createdDate: string;
   adress: Adress;
   accounts: Array<Compte>;
}

export class Compte{
    id: number;
    numero: string;
    montant: number;
    owner: User;
    operations:Array<Operation>;
}

export class Operation{
    id: number;
    montant: number;
    type: string;
    operationDate: string;
    compte: Compte
}

export class Paiement{
    id: number;
    montant: number;
    datepaiment: string;
    quantity: number;
}

export class Authentication{
    username: string;
    password: string;
}

export class Livre{
    id: string;
    isbn: string;
    dataPub: string;
    categorie: string;
    idAuteurs: string;
    prix: string;
    stock: string;
}

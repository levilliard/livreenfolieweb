
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

//import { Observable } from 'rxjs/Rx';

import { Config, FIRESTORE_COLLECTIONS, Pays } from '../models/models';

@Injectable()
export class FirebaseService {

  constructor(private _afs: AngularFirestore) {
    console.log('Hello ePerson Provider');
  }


  //get persons | criteria: .where("personLastname", "==", true) fro example
  getAllObj(collection: string, criteria: any) {
    if (criteria == null) {
      return this._afs.collection(collection).ref.get();
    } else {
      return this._afs.collection(collection).ref
        .where(criteria.name, criteria.operator, criteria.value).get()
    }
  }

  getAllPays(collection: string) {
    return this._afs.collection(collection).ref.orderBy('nom').get();
  }

  //get by id
  getObj(id: string, collection: string) {
    return this._afs.collection(collection).doc(id).ref.get();
  }

  getDateTime() {
    return firebase.firestore.Timestamp.now().toDate().toISOString()
  }

  fromDate(date: Date) {
    return firebase.firestore.Timestamp.fromDate(date).toDate().toISOString();
  }

  countDateRdv(date: string) {
    return this._afs.collection(FIRESTORE_COLLECTIONS.FORMULAIRE).ref
      .where('createdDate', '>', date).where('createdDate', '<', date + 'T23:59:59').get();
  }

  deleteObj(id: string, collection: string) {
    return this._afs.collection(collection).doc(id).delete();
  }


  addPays(obj: Pays, collection: string) {
    return this._afs.collection(collection).doc(obj.code).set({
      code: obj.code,
      nom: obj.nom,
      rang: obj.rang,
      statut: obj.statut
    }, { merge: true });
  }

  addConfig(obj: Config, collection: string) {
    return this._afs.collection(collection).doc(obj.date).set({
      count: obj.count,
      current_index: obj.current_index,
      date: obj.date
    }, { merge: true });
  }

}
import { UserGame } from '../../Models/UserGame';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'; // for typings
// import { FirebaseApp } from 'angularfire2'; // for methods

@Injectable()
export class FirebaseService {

  constructor(
    // private db: FirebaseApp
  ) { }

  getAllDataUser(user: UserGame) {
    // this.db.database().ref('/Game').child(user.id);
  }

  setUser(user: UserGame) {
    return firebase.database().ref(`/Game`).child(`${user.id}`).set(user);
  }

  uploadImage(file: FileReader, fileName: string) {
    const storageRef = firebase.storage().ref();

    const imageRef = storageRef.child(`${fileName}.jpg`);
    return imageRef.putString(file.result, 'data_url');
  }
}

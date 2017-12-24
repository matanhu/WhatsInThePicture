import { UserGame } from '../../Models/UserGame';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'; // for typings
import { GroupGame } from 'app/Models/GroupGame';
// import { FirebaseApp } from 'angularfire2'; // for methods

@Injectable()
export class FirebaseService {

  public user: UserGame = new UserGame();
  constructor(
    // private db: FirebaseApp
  ) {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.user.id = user.uid;
          console.log(user);
        } else {
          this.user.id = '';
        }
      });
  }

  getUserId(): string {
    return this.user.id;
  }

  createUserWithEmailAndPassword(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signOutWithEmailAndPassword() {
    return firebase.auth().signOut();
  }

  getAllDataUser(user: UserGame) {
    // this.db.database().ref('/Game').child(user.id);
  }

  setUser(user: UserGame) {
    return firebase.database().ref(`/Game`).child(`${user.id}`).set(user);
  }

  uploadImage(userID: string, groupName: string, file: FileReader, fileName: string) {
    const storageRef = firebase.storage().ref();

    const imageRef = storageRef.child(`${groupName}/${fileName}`);
    return imageRef.putString(file.result, 'data_url');
  }

  getGroup(userID: string, key: string) {
    return firebase.database().ref(`${userID}/${key}`).once('value');
  }

  setGroup(userID: string, group: GroupGame) {
    return firebase.database().ref(`${userID}`).push(group);
  }

  updateGroup(userID: string, group: GroupGame) {
    return firebase.database().ref(`${userID}/${group.key}`).set(group);
  }

  getGroups(userID: string) {
    return firebase.database().ref(`${userID}`).once('value');
  }

  snapshotToArray(snapshot) {
    const returnArr = [];

    snapshot.forEach(function (childSnapshot) {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
    });

    return returnArr;
  }
}

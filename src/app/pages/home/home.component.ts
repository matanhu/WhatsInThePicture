import { FirebaseService } from '../../services/firebase/firebase.service';
import { UserGame } from '../../Models/UserGame';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userGameList = new UserGame();

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getGroups(this.firebaseService.getUserId()).then(
      (snapshot) => {
        this.userGameList.groupGameList = this.firebaseService.snapshotToArray(snapshot);
      });
  }

}

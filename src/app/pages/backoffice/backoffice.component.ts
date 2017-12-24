import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase/firebase.service';
import { UserGame } from 'app/Models/UserGame';
import { GroupGame } from 'app/Models/GroupGame';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})
export class BackofficeComponent implements OnInit {

  public userGameList = new UserGame();

  constructor(private firebaseService: FirebaseService) {
    // const user = new UserGame();
    // user.email = 'sd@ds.com';
    // user.id = '222';
    // user.password = 'sdsd';
    // this.firebaseService.setUser(user).then(
    //   (res) => {
    //     console.log(res);
    //   }, (err) => {
    //     console.error(err);
    //   });
   }

  ngOnInit() {
  }

  addGroup() {
    const groupGame = new GroupGame();
    this.userGameList.groupGameList.push(groupGame);
  }
}

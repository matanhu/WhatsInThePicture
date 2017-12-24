import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FirebaseService } from 'app/services/firebase/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {

  }

  signOut() {
    this.firebaseService.signOutWithEmailAndPassword().then(
      (res) => {
        this.router.navigate(['/']);
      });
  }
}

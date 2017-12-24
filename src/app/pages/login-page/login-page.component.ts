import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase/firebase.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public user: any = {
    email: '',
    password: '',
  };

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  signup() {
    console.log(this.user);
    this.firebaseService.createUserWithEmailAndPassword(this.user.email, this.user.password).then(
      (res) => {
        this.router.navigate(['/home']);
      }, (error) => {
        console.error(error);
      });
  }

  signin() {
    console.log(this.user);
    this.firebaseService.signInWithEmailAndPassword(this.user.email, this.user.password).then(
      (res) => {
        this.router.navigate(['/home']);
      }, (error) => {
        console.error(error);
      });
  }
}

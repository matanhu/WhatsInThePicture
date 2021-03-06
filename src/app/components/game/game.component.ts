import { FirebaseService } from '../../services/firebase/firebase.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { GroupGame } from 'app/Models/GroupGame';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input()
  private groupKey: string;
  @Input()
  private gameMinutes: string;

  public image: any = 0;
  public endGame: boolean = false;
  private countDownDate: Date;
  private timer: Subscription;
  public groupGame: GroupGame;
  public count = 0;

  public endGameImage = 'http://cdn.collider.com/wp-content/uploads/Endgame-logo.jpg';


  constructor(
    private elm: ElementRef,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getGroup(this.firebaseService.getUserId(), this.groupKey).then(
      (snapshot) => {
        this.groupGame = snapshot.val();
        this.gameMinutes = this.gameMinutes !== 'undefined' ? this.gameMinutes : '2';
        this.countDownDate = new Date();
        this.countDownDate.setMinutes(this.countDownDate.getMinutes() + Number(this.gameMinutes));
        this.initTimer();
      });

  }

  next() {
    this.image++;
    this.count++;
  }

  prev() {
    this.image--;
    this.count--;
  }

  stopTimer() {
    this.timer.unsubscribe();
    document.getElementById('timer').innerHTML = 'הזמן נגמר';
    this.image = 'theEnd';
    this.endGame = true;
  }

  initTimer() {
    this.timer = Observable.interval(1000).subscribe(() => {

      // Get todays date and time
      const now = new Date().getTime();

      // Find the distance between now an the count down date
      const distance = this.countDownDate.getTime() - now;
      console.log(distance);

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      document.getElementById('timer').innerHTML =  minutes + ' דקות ' + seconds + ' שניות ' ;
      if ( distance < 30000) {
        document.getElementById('timer').style.color = 'red';
      }
      // If the count down is finished, write some text
      if (distance < 0) {
        this.stopTimer();
      // clearInterval(x);
      }
    });
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

}

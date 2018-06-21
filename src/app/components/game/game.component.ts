import { FirebaseService } from '../../services/firebase/firebase.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component, ElementRef, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { GroupGame } from 'app/Models/GroupGame';

import * as io from 'socket.io-client';
import { ImageGame } from '../../Models/ImageGame';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  private groupKey: string;
  @Input()
  private gameMinutes: string;

  public image: any = 0;
  public endGame = false;
  private countDownDate: Date;
  private timer: Subscription;
  public groupGame: GroupGame;
  public count = 0;

  private ioUrl = '/';
  private socket;

  public endGameImage = 'http://cdn.collider.com/wp-content/uploads/Endgame-logo.jpg';


  constructor(
    private elm: ElementRef,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.socket = io.connect(this.ioUrl);
    this.firebaseService.getGroup(this.firebaseService.getUserId(), this.groupKey).then(
      (snapshot) => {
        this.groupGame = snapshot.val();
        this.gameMinutes = this.gameMinutes !== 'undefined' ? this.gameMinutes : '2';
        this.countDownDate = new Date();
        this.countDownDate.setMinutes(this.countDownDate.getMinutes() + Number(this.gameMinutes));
        const gameOver = new ImageGame(this.endGameImage, 'Game Over');
        this.groupGame.imageGameList.push(gameOver);
        this.socket.emit('newImage', this.groupGame.imageGameList[0]);
      });

  }

  ngAfterViewInit() {
    this.initTimer();
  }

  next() {
    this.image++;
    this.count++;
    this.socket.emit('newImage', this.groupGame.imageGameList[this.image]);
  }

  prev() {
    this.image--;
    this.count--;
    this.socket.emit('newImage', this.groupGame.imageGameList[this.image]);
  }

  stopTimer() {
    this.timer.unsubscribe();
    document.getElementById('timer').innerHTML = 'הזמן נגמר';
    // this.image = 'theEnd';
    this.image = this.groupGame.imageGameList.length - 1;
    this.socket.emit('newImage', this.groupGame.imageGameList[this.image]);
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

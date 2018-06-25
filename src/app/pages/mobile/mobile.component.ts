import { Component, OnInit } from '@angular/core';

import * as io from 'socket.io-client';
import { ImageGame } from '../../Models/ImageGame';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

public imageGame = new ImageGame();

private ioUrl = '/';
private socket;

  constructor() { }

  ngOnInit() {
    this.socket = io.connect(this.ioUrl);
    this.socket.on('newImage', (newImage) => {
      console.log('newImage: ', newImage);
      this.imageGame.imageUrl = newImage.imageUrl;
      this.imageGame.name = newImage.name;
    });
  }

}

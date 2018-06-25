import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  public groupKey: string;
  public gameMinutes: number;
  constructor(public router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.groupKey = params['groupKey'];
      this.gameMinutes = params['gameMinutes'];
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { NgxPubSubService } from '@ngx-pub-sub/ngx-pub-sub';

@Component({
  selector: 'ngx-pub-sub-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {

  normalEvent = 'randomNormal';
  historicalEvent = 'randomHistory';
  latestEvent = 'randomLast';
  random: number;
  list: any[] = [];
  colors = ['primary', 'accent', 'warn'];
  colorCounter = 0;

  constructor(private pubsub: NgxPubSubService) {}

  generateRandom() {
    this.random = Math.floor(Math.random() * 100);
    this.publish();
  }

  publish() {
    this.colorCounter++;
    this.list.unshift({
      myColor: this.colors[this.colorCounter % this.colors.length],
      myNumber: this.random
    });
    this.pubsub.publishEvent(this.normalEvent, this.random);
    this.pubsub.publishWithHistory(this.historicalEvent, this.random);
    this.pubsub.publishWithLast(this.latestEvent, this.random);
  }

  ngOnInit() {
  }

}

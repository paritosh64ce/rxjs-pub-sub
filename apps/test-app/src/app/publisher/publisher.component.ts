import { Component } from '@angular/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-pub-sub-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent {

  normalEvent = 'randomNormal';
  historicalEvent = 'randomHistory';
  latestEvent = 'randomLast';
  random: number | undefined;
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

}

import { Component } from '@angular/core';
import { rxjsPubSub } from '@pscoped/rxjs-pub-sub';

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
    rxjsPubSub.publishEvent(this.normalEvent, this.random);
    rxjsPubSub.publishWithHistory(this.historicalEvent, this.random);
    rxjsPubSub.publishWithLast(this.latestEvent, this.random);
  }

}

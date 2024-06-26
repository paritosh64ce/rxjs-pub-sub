import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { rxjsPubSub } from '@pscoped/rxjs-pub-sub';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-pub-sub-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent {

  @Input() eventName!: string;

  subscription: Subscription | undefined;
  isSubscribed = false;
  list: any[] = [];

  colors = ['primary', 'accent', 'warn'];
  colorCounter = 0;

  subscribeEvent() {

    console.log('subscribed');
    this.subscription = rxjsPubSub.subscribe(this.eventName,
      data => {
        this.colorCounter++;
        // append at the top
        this.list.unshift({
          myColor: this.colors[this.colorCounter % this.colors.length],
          myNumber: data
        })
        console.log(data);
      });
    this.isSubscribed = true;
  }

  unsubscribeEvent() {
    console.log('unsubscribed');
    this.subscription?.unsubscribe();
    this.list = [];
    this.isSubscribed = false;
  }
}

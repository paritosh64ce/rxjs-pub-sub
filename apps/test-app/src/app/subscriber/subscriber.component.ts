import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxPubSubService } from '@ngx-pub-sub/ngx-pub-sub';

@Component({
  selector: 'ngx-pub-sub-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent {

  subscription: Subscription;
  myNumber: number;
  myColor: string;
  isSubscribed = false;

  colors = ['primary', 'accent', 'warn'];
  colorCounter = 0;

  constructor(private pubSub: NgxPubSubService) { }

  subscribeEvent() {

    console.log('subscribed');
    this.subscription = this.pubSub.getEventObservable('randomNumber')
      .subscribe(data => {
        this.colorCounter++;
        this.myColor = this.colors[this.colorCounter % this.colors.length];
        this.myNumber = data;
      });
    this.isSubscribed = true;
  }

  unsubscribeEvent() {
    console.log('unsubscribed');
    this.subscription.unsubscribe();
    this.isSubscribed = false;
  }
}
